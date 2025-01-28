<?php

namespace Api\Controller;

use Api\Http\Request;
use Api\Http\Response;
use Api\Repository\UserRepository;

class UserController
{
    private $userRepository;

    public function __construct()
    {
        $this->userRepository = new UserRepository();
    }

    public function index(Request $request, Response $response)
    {
        $users = $this->userRepository->getAllUsers();
        $response->send(['users' => $users]);
    }

    public function show(Request $request, Response $response)
    {
        $id = $request->getParams()['id'] ?? null; // Fetch `id` from request parameters

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

    public function store(Request $request, Response $response)
    {
        $data = $request->getBody(); // Get JSON data from the request body

        if ($this->validateUserData($data)) {
            $this->userRepository->createUser($data);
            $response->setStatusCode(201)->send(['message' => 'User created']);
        } else {
            $response->setStatusCode(400)->send(['message' => 'Invalid user data']);
        }
    }

    public function update(Request $request, Response $response)
    {
        $id = $request->getParams()['id'] ?? null; // Fetch `id` from request parameters
        $data = $request->getBody(); // Get JSON data from the request body

        if (!$id) {
            $response->setStatusCode(400)->send(['message' => 'Missing ID parameter']);
            return;
        }

        if ($this->validateUserData($data)) {
            $this->userRepository->updateUser($id, $data);
            $response->send(['message' => "User with ID $id updated"]);
        } else {
            $response->setStatusCode(400)->send(['message' => 'Invalid user data']);
        }
    }

    public function destroy(Request $request, Response $response)
    {
        $id = $request->getParams()['id'] ?? null; // Fetch `id` from request parameters

        if (!$id) {
            $response->setStatusCode(400)->send(['message' => 'Missing ID parameter']);
            return;
        }

        $this->userRepository->deleteUser($id);
        $response->send(['message' => "User with ID $id deleted"]);
    }

    private function validateUserData(array $data): bool
    {
        // Example: Basic validation logic
        return isset($data['name']) && isset($data['email']);
    }

    public function params(Request $request, Response $response)
    {        
        $params = $request->getParams();
        $response->send(['params' => $params]);
    }
}
