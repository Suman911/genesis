<?php

namespace Api\Controller;

use Api\Http\Request;
use Api\Http\Response;

class Controller
{
    protected function isAdmin(array $payload): bool
    {
        $role = $payload['role'];
        if ($role !== 'admin') {
            return false;
        }
        return true;
    }
    protected function Authorized(Request $request, Response $response)
    {
        $payload = $request->getJwtPayload();
        if (!$this->isAdmin($payload)) {
            $response->error(403, 'Forbidden: You do not have permission to access this resource');
        }
    }
    protected function validateId(Response $response, $id)
    {
        if (!$id) {
            $response->error(400, 'Missing ID parameter');
            return;
        }
    }

    public function index(Request $request, Response $response)
    {
        $clientInfo = [
            'ip' => $_SERVER['REMOTE_ADDR'] ?? null,
            'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? null,
        ];

        $serverInfo = [
            'server_name' => $_SERVER['SERVER_NAME'] ?? null,
            'server_software' => $_SERVER['SERVER_SOFTWARE'] ?? null,
            'php_version' => phpversion(),
            'request_method' => $_SERVER['REQUEST_METHOD'] ?? null,
            'protocol' => $_SERVER['SERVER_PROTOCOL'] ?? null,
        ];

        $response->send([
            'message' => 'API is working.',
            'client' => $clientInfo,
            'server' => $serverInfo,
        ]);
    }
}