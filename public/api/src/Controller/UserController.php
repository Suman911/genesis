<?php

namespace Api\Controller;

use Repository\UserRepository;

class UserController {
    private $userRepository;

    public function __construct(UserRepository $userRepository) {
        $this->userRepository = $userRepository;
    }

    public function index() {
        $users = $this->userRepository->getAllUsers();
        echo json_encode(['users' => $users]);
    }

    public function show($id) {
        $user = $this->userRepository->getUserById($id);
        if ($user) {
            echo json_encode(['user' => $user]);
        } else {
            http_response_code(404);
            echo json_encode(['message' => 'User not found']);
        }
    }

    public function store() {
        // Assume $data is retrieved from the request
        $data = []; // Placeholder for user data
        $this->userRepository->createUser($data);
        echo json_encode(['message' => 'User created']);
    }

    public function update($id) {
        // Assume $data is retrieved from the request
        $data = []; // Placeholder for user data
        $this->userRepository->updateUser($id, $data);
        echo json_encode(['message' => "User with ID $id updated"]);
    }

    public function destroy($id) {
        $this->userRepository->deleteUser($id);
        echo json_encode(['message' => "User with ID $id deleted"]);
    }
}
