<?php

namespace Api\Controller;

use Api\Http\Request;
use Api\Http\Response;
use Api\Repository\UserRepository;
use Auth\JWT\JWT;
use Services\Turnstile\Turnstile;

final class UserController extends Controller
{
    public function __construct()
    {
        $this->repository = new UserRepository();
    }

    private function getCookieOptions(bool $httpOnly, ?int $expires = null): array
    {
        return [
            'expires' => $expires ?? time() + 86400,
            'path' => '/',
            'secure' => true,
            'httponly' => $httpOnly,
            'samesite' => $_ENV['APP_ENV'] === 'PROD' ? 'Strict' : 'None',
        ];
    }

    private function validateUserData(Response $response, array $data)
    {
        foreach (['name', 'user_name', 'email', 'ph_number'] as $field) {
            if (empty($data[$field])) {
                $response->error(400, "$field is required.");
            }
        }
    }

    private function validateStudentData(Response $response, array $data)
    {
        foreach (['college', 'subject', 'batch_id', 'course_id'] as $field) {
            if (empty($data[$field])) {
                $response->error(400, "$field is required.");
            }
        }
    }

    private function isPasswordSet(Response $response, array $data)
    {
        if (empty($data['password'])) {
            $response->error(400, "password is required.");
        }
    }

    private function validatePassword(Response $response, string $password)
    {
        // if (strlen($password) < 8) {
        //     $response->error(400, 'Password must be at least 8 characters long.');
        // }
        // if (!preg_match('/[A-Z]/', $password)) {
        //     $response->error(400, 'Password must contain at least one uppercase letter.');
        // }
        // if (!preg_match('/[a-z]/', $password)) {
        //     $response->error(400, 'Password must contain at least one lowercase letter.');
        // }
        // if (!preg_match('/[0-9]/', $password)) {
        //     $response->error(400, 'Password must contain at least one number.');
        // }
    }

    public function index(Request $request, Response $response)
    {
        $this->Authorized($request, $response);
        $users = $this->repository->getAllUsers();
        $response->send(['users' => $users]);
    }

    public function fetch(Request $request, Response $response)
    {
        $this->Authorized($request, $response);
        $id = $request->getParams()['id'];
        $this->validateId($response, $id);

        $user = $this->repository->getUserById($id);
        $user ? $response->send(['user' => $user]) : $response->error(404, 'User not found');
    }

    public function create(Request $request, Response $response)
    {
        $this->Authorized($request, $response);
        $data = $request->getBody();

        $this->validateUserData($response, $data);
        $this->validateStudentData($response, $data);
        $this->isPasswordSet($response, $data);
        $this->validatePassword($response, $data['password']);

        $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);

        try {
            $this->repository->startTransaction();

            if ($this->repository->getUserByEmail($data['email'])) {
                throw new \Exception('Email already exists');
            }

            $id = $this->repository->createUser([
                'name' => $data['name'],
                'user_name' => $data['user_name'],
                'email' => $data['email'],
                'ph_number' => $data['ph_number'],
                'password' => $hashedPassword,
            ]);

            $studentId = $this->repository->createStudent([
                'user_id' => $id,
                'college' => $data['college'],
                'date_of_admission' => date('Y-m-d H:i:s'),
                'subject' => $data['subject'],
            ]);

            if (!$this->repository->addToBatch($studentId, (int) $data['batch_id'])) {
                throw new \Exception('Failed to create student');
            }

            $this->repository->commitTransaction();

            $response->setStatusCode(201)->send([
                'student_id' => (int) $studentId,
                'course_id' => $data['course_id'],
                'batch_id' => $data['batch_id'],
            ]);
        } catch (\Throwable $e) {
            $this->repository->rollbackTransaction();
            $response->error(500, 'Failed to create user: ' . $e->getMessage());
        }
    }

    public function update(Request $request, Response $response)
    {
        $this->Authorized($request, $response);
        $id = $request->getParams()['id'] ?? null;
        $this->validateId($response, $id);

        $data = $request->getBody();
        $this->validateUserData($response, $data);

        $user = $this->repository->updateUser($id, [
            'name' => $data['name'],
            'user_name' => $data['user_name'],
            'email' => $data['email'],
            'ph_number' => $data['ph_number']
        ]);

        $user ? $response->send($user) : $response->error(500, 'Failed to update user');
    }

    private function updatePassword(Request $request, Response $response)
    {
        $payload = $request->getJwtPayload();
        $id = $this->isAdmin($payload) ? $request->getParams()['id'] ?? null : ($payload['id'] ?? null);
        $this->validateId($response, $id);

        $data = $request->getBody();
        $this->isPasswordSet($response, $data);
        $this->validatePassword($response, $data['password']);

        $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);
        $user = $this->repository->updateUser($id, ['password' => $hashedPassword]);

        $user ? $response->send($user) : $response->error(500, 'Failed to update user password');
    }

    public function delete(Request $request, Response $response)
    {
        $this->Authorized($request, $response);
        $id = $request->getParams()['id'] ?? null;
        $this->validateId($response, $id);

        $this->repository->deleteUser($id);
        $response->send(['message' => "User with ID $id deleted"]);
    }

    public function login(Request $request, Response $response)
    {
        $data = $request->getBody();

        // Accept token under 'token' or 'turnstileToken'
        $token = $data['token'] ?? $data['turnstileToken'] ?? null;
        $result = Turnstile::verify($token);

        if(isset($result['error'])){
            $response->error($result['code'], $result['error']);
        }
        if (empty($data['email']) || empty($data['password'])) {
            return $response->error(400, 'Email and password are required');
        }

        $user = $this->repository->getUserByEmail($data['email']);
        if (!$user || !password_verify($data['password'], $user['password'])) {
            return $response->error(401, 'Invalid credentials');
        }

        $payload = [
            'id' => $user['id'],
            'name' => $user['name'],
            'user_name' => $user['user_name'],
            'email' => $user['email'],
            'role' => $user['role'] ?? 'user',
        ];

        $token = JWT::encode($payload);
        $payloadString = json_encode($payload, JSON_UNESCAPED_SLASHES);

        setcookie('jwt_token', $token, $this->getCookieOptions(true));
        setcookie('genesis_user', $payloadString, $this->getCookieOptions(false));

        return $response->send($payload);
    }

    public function logout(Request $request, Response $response)
    {
        $expiredTime = time() - 3600;
        setcookie('jwt_token', '', $this->getCookieOptions(true, $expiredTime));
        setcookie('genesis_user', '', $this->getCookieOptions(false, $expiredTime));

        return $response->send(['message' => 'Logged out successfully']);
    }

    public function getAdmins(Request $request, Response $response)
    {
        $this->Authorized($request, $response);
        $response->send($this->repository->getAdmins());
    }

    public function me(Request $request, Response $response)
    {
        $id = $request->getJwtPayload()['id'] ?? null;
        $user = $this->repository->getUserById($id);

        $user ? $response->send(['user' => $user]) : $response->error(404, 'User not found');
    }

    public function meAdmin(Request $request, Response $response)
    {
        $payload = $request->getJwtPayload();
        if (!$this->isAdmin($payload)) {
            return $response->error(403, 'Forbidden: You do not have permission to access this resource');
        }

        $id = $payload['id'] ?? null;
        $user = $this->repository->getUserById($id);

        $user ? $response->send($user) : $response->error(404, 'User not found');
    }
}
