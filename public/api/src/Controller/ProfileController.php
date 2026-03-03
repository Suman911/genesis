<?php

namespace Api\Controller;

use Api\Http\Request;
use Api\Http\Response;
use Api\Repository\ProfileRepository;
use Api\Utils\Dumper;
use Api\Utils\FileHandler;

final class ProfileController extends Controller
{
    public function __construct()
    {
        $this->repository = new ProfileRepository();
    }

    public function index(Request $request, Response $response): void
    {
        $payload = $request->getJwtPayload();
        $user_name = $request->getQueryParams()['user_name'] ?? $payload['user_name'] ?? null;
        $full = $user_name === $payload['user_name'] || $this->isAdmin($payload);

        $student = $this->repository->fetch($user_name, $full);

        if (!$student) {
            $response->error(404, 'User not found');
        }
        $response->send($student);
    }
    public function update(Request $request, Response $response): void
    {
        $id = $request->getJwtPayload()['id'] ?? null;
        $data = $request->getBody();

        $this->validateId($response, $id);
        $user = $this->repository->getStudentStatus($id);

        if (!isset($user)) {
            $response->error(404, 'User not found');
        }

        if (isset($user['isUpdated']) && $user['isUpdated']) {
            $response->error(403, 'Profile has already been updated before');
        }

        if (!isset($data['user_name']) || $data['user_name'] !== $user['user_name']) {
            $response->error(403, 'Forbideen operation');
        }

        // Handle photo upload
        $photo_url = FileHandler::upload(
            $request,
            $response,
            'photo',
            '/uploads/students/',
            ['title' => $user['user_name'], 'suffix' => date('YmdHis')],
            $user['photo'] ?? null
        );

        if ($photo_url) {
            $data['photo'] = $photo_url;
        }

        // Format date if provided
        if (!empty($data['date_of_birth'])) {
            $data['date_of_birth'] = date('Y-m-d', strtotime($data['date_of_birth']));
        }

        $student = $this->repository->updateProfile($id, $data);

        if (!$student) {
            $response->error(500, 'Failed to update profile');
            return;
        }

        $response->send($student);
    }
}