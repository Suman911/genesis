<?php

namespace Api\Controller;

use Api\Http\Request;
use Api\Http\Response;
use Api\Repository\UserRepository;
use Auth\JWT\JWT;

final class StudentController extends Controller
{
    public function __construct()
    {
        $this->repository = new UserRepository();
    }

    private function validateStudentData(Response $response, array $data)
    {
        foreach (['college', 'subject', 'sub_batch_id', 'sub_batch_id'] as $field) {
            if (empty($data[$field])) {
                $response->error(400, "$field is required.");
            }
        }
    }

    public function getNew(Request $request)
    {
        // return new Response('New student created successfully', 201);
    }
}
