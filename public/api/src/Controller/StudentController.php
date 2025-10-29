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

    private function validateBatchData(Response $response, array $data)
    {
        foreach (['sid', 'bid', 'status'] as $field) {
            if (empty($data[$field])) {
                $response->error(400, "$field is required.");
            }
        }
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
        $id = $request->getParams()['id'];
        $this->validateId($response, $id);
        $student = $this->repository->find($id);
        if (!$student) {
            $response->error(404, 'Student not found');
            return;
        }
        $response->send($student);
    }

    public function profile(Request $request, Response $response): void
    {
        $payload = $request->getJwtPayload();
        $user_name = $request->getQueryParams()['user_name'] ?? $payload['user_name'] ?? null;
        $full = $user_name === $payload['user_name'] || $this->isAdmin($payload);

        $student = $this->repository->fetch($user_name, $full);

        if (!$student) {
            $response->error(404, 'User not found');
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
        $batchIds = $body['batch_ids'] ?? null;

        $this->validateId($response, $studentId);

        if (!is_array($batchIds) || empty($batchIds)) {
            $response->error(400, 'Batch IDs are required');
            return;
        }

        try {
            $result = $this->repository->addToBatches($studentId, $batchIds);
            if (!$result) {
                $response->error(400, 'Failed to assign student to batches');
                return;
            }

            $response->send(['message' => 'Student assigned successfully', 'assigned' => $batchIds]);
        } catch (\Exception $e) {
            $response->error(500, 'Error: ' . $e->getMessage());
        }
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

    public function updateStatus(Request $request, Response $response)
    {
        $this->Authorized($request, $response);
        $data = $request->getBody();
        $this->validateBatchData($response, $data);

        $ok = $this->repository->statusUpdate($data);

        if (!$ok) {
            $response->error(400, 'Failed to Change');
            return;
        }

        $response->send(['message' => 'Status updated successfully']);
    }
}
