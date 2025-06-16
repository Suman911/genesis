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
    protected function isAuthorized(Request $request, Response $response)
    {
        $payload = $request->getJwtPayload();
        if ($this->isAdmin($payload)) {
            $response->setStatusCode(403)->send(['message' => 'Forbidden: You do not have permission to access this resource']);
        }
    }

    public function index(Request $request, Response $response)
    {
        $response->send(['message' => 'API is working.']);
    }
}