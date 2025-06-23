<?php

namespace Api\Controller;

use Api\Http\Request;
use Api\Http\Response;
use Api\Repository\UserRepository;
use Auth\JWT\JWT;

class UserController extends Controller
{
    private $userRepository;

    public function __construct()
    {
        $this->userRepository = new UserRepository();
    }
    private function validateUserData(Response $response, array $data)
    {
        foreach (['name', 'user_name', 'email', 'ph_number'] as $field) {
            if (empty($data[$field])) {
                $response->setStatusCode(400)->send(['error' => "$field is required."]);
            }
        }
    }
    private function isPasswordSet(Response $response, array $data)
    {
        if (empty($data['password'])) {
            $response->setStatusCode(400)->send(['error' => "password is required."]);
        }
    }
    private function validatePassword(Response $response, string $password)
    {
        // if (strlen($password) < 8) {
        //     $response->setStatusCode(400)->send(['error' => 'Password must be at least 8 characters long.']);
        // }
        // if (!preg_match('/[A-Z]/', $password)) {
        //     $response->setStatusCode(400)->send(['error' => 'Password must contain at least one uppercase letter.']);
        // }
        // if (!preg_match('/[a-z]/', $password)) {
        //     $response->setStatusCode(400)->send(['error' => 'Password must contain at least one lowercase letter.']);
        // }
        // if (!preg_match('/[0-9]/', $password)) {
        //     $response->setStatusCode(400)->send(['error' => 'Password must contain at least one number.']);
        // }
    }

    public function index(Request $request, Response $response)
    {
        $this->Authorized($request, $response);

        $users = $this->userRepository->getAllUsers();
        $response->send(['users' => $users]);
    }

    public function show(Request $request, Response $response)
    {
        $this->Authorized($request, $response);

        $id = $request->getParams()['id'];
        if (!$id) {
            $response->setStatusCode(400)->send(['message' => 'Missing ID parameter']);
            return;
        }

        $user = $this->userRepository->getUserById($id);

        if ($user) {
            $response->send(['user' => $user]);
        } else {
            $response->setStatusCode(404)->send(['message' => 'User not found']);
        }
    }

    public function create(Request $request, Response $response)
    {
        $this->Authorized($request, $response);

        $data = $request->getBody(); // Get JSON data from the request body

        $this->validateUserData($response, $data);
        $this->isPasswordSet($response, $data);
        $this->validatePassword($response, $data['password']);

        // Hash the password
        $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);

        // Insert user
        $user = $this->userRepository->createUser([
            'name' => $data['name'],
            'user_name' => $data['user_name'],
            'email' => $data['email'],
            'ph_number' => $data['ph_number'],
            'password' => $hashedPassword,
        ]);

        if (!$user) {
            $response->setStatusCode(500)->send(['message' => 'Failed to create user']);
            return;
        }

        $response->send(['message' => 'User created', 'user' => $user]);
    }

    public function update(Request $request, Response $response)
    {
        $this->Authorized($request, $response);

        $id = $request->getParams()['id'] ?? null; // Fetch `id` from request parameters
        $this->validateId($response, $id);

        $data = $request->getBody(); // Get JSON data from the request body

        $this->validateUserData($response, $data);

        // Insert user
        $user = $this->userRepository->updateUser($id, [
            'name' => $data['name'],
            'user_name' => $data['user_name'],
            'email' => $data['email'],
            'ph_number' => $data['ph_number']
        ]);

        if (!$user) {
            $response->setStatusCode(500)->send(['message' => 'Failed to update user']);
            return;
        }

        $response->send(['message' => 'User updated', 'user' => $user]);
    }

    private function updatePassword(Request $request, Response $response)
    {
        $payload = $request->getJwtPayload();

        if ($this->isAdmin($payload)) {
            $id = $request->getParams()['id'] ?? null; // Fetch `id` from request parameters
        } else {
            $id = $payload['id'] ?? null; // Fetch user ID from JWT payload
        }

        $this->validateId($response, $id);

        $data = $request->getBody(); // Get JSON data from the request body
        $this->isPasswordSet($response, $data);
        $this->validatePassword($response, $data['password']);

        // Hash the password
        $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);

        $user = $this->userRepository->updateUser($id, [
            'password' => $hashedPassword,
        ]);

        if (!$user) {
            $response->setStatusCode(500)->send(['message' => 'Failed to update user password']);
            return;
        }

        $response->send(['message' => 'User password updated', 'user' => $user]);
    }

    public function delete(Request $request, Response $response)
    {
        $this->Authorized($request, $response);

        $id = $request->getParams()['id'] ?? null; // Fetch `id` from request parameters

        if (!$id) {
            $response->setStatusCode(400)->send(['message' => 'Missing ID parameter']);
            return;
        }

        $this->userRepository->deleteUser($id);
        $response->send(['message' => "User with ID $id deleted"]);
    }

    public function login(Request $request, Response $response)
    {
        $data = $request->getBody();
        if (empty($data['email']) || empty($data['password'])) {
            return $response->setStatusCode(400)->send(['message' => 'Email and password are required']);
        }

        $user = $this->userRepository->getUserByEmail($data['email']);
        if (!$user || !password_verify($data['password'], $user['password'])) {
            return $response->setStatusCode(401)->send(['message' => 'Invalid credentials']);
        }

        $payload = [
            'id' => $user['id'],
            'name' => $user['name'],
            'email' => $user['email'],
            'role' => $user['role'] ?? 'user',
        ];

        $token = JWT::encode($payload);
        $payloadString = json_encode($payload, JSON_UNESCAPED_SLASHES);

        setcookie('jwt_token', $token, [
            'expires' => time() + 86400,
            'path' => '/',
            'secure' => true,
            'httponly' => true,
            'samesite' => 'None',
            // 'samesite' => 'Strict', // Uncomment for stricter cookie policy in production
        ]);

        setcookie('genesis_user', $payloadString, [
            'expires' => time() + 86400,
            'path' => '/',
            'secure' => true,
            'httponly' => false,
            'samesite' => 'None',
            // 'samesite' => 'Strict', // Uncomment for stricter cookie policy in production
        ]);

        $payload = [
            'message' => 'Login successful',
            'user' => $payload,
        ];

        return $response->send($payload);
    }

    public function logout($request, $response)
    {
        setcookie('jwt_token', '', [
            'expires' => time() - 3600,
        ]);

        setcookie('genesis_user', '', [
            'expires' => time() - 3600,
        ]);

        return $response->send(['message' => 'Logged out successfully']);
    }

    public function getAdmins(Request $request, Response $response)
    {
        $this->Authorized($request, $response);

        $admins = $this->userRepository->getAdmins();
        $response->send(['admins' => $admins]);
    }

    // user profile
    public function me(Request $request, Response $response)
    {
        $id = $request->getJwtPayload()['id'] ?? null; // Fetch user ID from JWT payload

        $user = $this->userRepository->getUserById($id);
        if ($user) {
            $response->send(['user' => $user]);
        } else {
            $response->setStatusCode(404)->send(['message' => 'User not found']);
        }
    }

    public function meAdmin(Request $request, Response $response)
    {
        $payload = $request->getJwtPayload();
        if (!$this->isAdmin($payload)) {
            $response->setStatusCode(403)->send(['message' => 'Forbidden: You do not have permission to access this resource']);
            return;
        }

        $id = $payload['id'] ?? null; // Fetch user ID from JWT payload

        $user = $this->userRepository->getUserById($id);
        if ($user) {
            $response->send(['user' => $user]);
        } else {
            $response->setStatusCode(404)->send(['message' => 'User not found']);
        }
    }
}
