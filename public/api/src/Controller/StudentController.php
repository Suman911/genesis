<?php

namespace Api\Controller;

use Api\Http\Request;
use Api\Http\Response;
use Api\Repository\StudentRepository;

final class StudentController extends Controller
{
    public function __construct()
    {
        $this->repository = new StudentRepository();
    }

    private function validateStudentUpdateData(Response $response, array $data)
    {
        foreach (['college', 'email', 'name', 'ph_number', 'subject', 'user_name'] as $field) {
            if (empty($data[$field])) {
                $response->error(400, "$field is required.");
            }
        }
    }

    public function index(Request $request, Response $response): void
    {
        $params = $request->getQueryParams();
        $result = $this->repository->list($params);

        $response->send([
            'students' => $result['students'],
            'total' => $result['total']
        ]);
    }

    public function show(Request $request, Response $response): void
    {
        $id = (int) $request->getParams()['id'];
        $this->validateId($response, $id);
        $student = $this->repository->find($id);
        if (!$student) {
            $response->error(404, 'Student not found');
            return;
        }
        $response->send($student);
    }

    public function unassigned(Request $request, Response $response): void
    {
        $data = $this->repository->listUnassigned();
        $response->send($data);
    }

    public function assignToBatch(Request $request, Response $response): void
    {
        $this->Authorized($request, $response);

        $params = $request->getParams();
        $body = $request->getBody();

        $studentId = isset($params['id']) ? (int) $params['id'] : null;
        $batchId   = isset($body['batch_id']) ? (int) $body['batch_id'] : null;

        $this->validateId($response, $studentId);
        if (!$batchId) {
            $response->error(400, 'Batch ID is required');
            return;
        }

        $ok = $this->repository->addToBatch($studentId, $batchId);
        if (!$ok) {
            $response->error(400, 'Failed to assign student to batch');
            return;
        }

        $response->send(['message' => 'Student assigned successfully']);
    }

    public function unassignStudent(Request $request, Response $response): void
    {
        $this->Authorized($request, $response);

        $params = $request->getParams();
        $sid = isset($params['sid']) ? (int) $params['sid'] : null;
        $bid = isset($params['bid']) ? (int) $params['bid'] : null;

        if (!$sid || !$bid) {
            $response->error(400, 'Student ID and Batch ID are required');
            return;
        }

        $ok = $this->repository->unassign($sid, $bid);
        if (!$ok) {
            $response->error(400, 'Failed to unassign student');
            return;
        }

        $response->send(['message' => 'Student unassigned successfully']);
    }

    public function update(Request $request, Response $response): void
    {
        $this->Authorized($request, $response);
        $id = (int) $request->getParams()['id'];
        $this->validateId($response, $id);
        $data = $request->getBody();
        $this->validateStudentUpdateData($response, $data);
        $ok = $this->repository->updateStudent($id, $data);

        if (!$ok) {
            $response->error(400, 'Failed to update');
            return;
        }

        $response->send(['message' => 'Student updated successfully']);
    }

    public function delete(Request $request, Response $response): void
    {
        $this->Authorized($request, $response);
        $id = (int) $request->getParams()['id'];
        $this->validateId($response, $id);
        $ok = $this->repository->deleteStudent($id);

        if (!$ok) {
            $response->error(400, 'Failed to delete');
            return;
        }

        $response->setStatusCode(204)->send(['message' => 'Student deleted successfully']);
    }
}
