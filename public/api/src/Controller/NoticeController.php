<?php

namespace Api\Controller;

use Api\Http\Request;
use Api\Http\Response;
use Api\Repository\NoticeRepository;

final class NoticeController extends Controller
{
    public function __construct()
    {
        $this->repository = new NoticeRepository();
    }
    private function validateNoticeData(Response $response, array $data)
    {
        foreach (['title', 'description', 'posted_date', 'target_timestamp', 'expiry_date', 'type'] as $field) {
            if (empty($data[$field])) {
                $response->error(400, "$field is required.");
            }
        }
    }

    public function index(Request $request, Response $response)
    {
        // $this->Authorized($request, $response);

        $notices = $this->repository->getAllNotices();
        $response->send(data: $notices);
    }

    public function fetch(Request $request, Response $response)
    {
        $this->Authorized($request, $response);

        $id = $request->getParams()['id'] ?? null;
        $this->validateId($response, $id);

        $notice = $this->repository->getNoticeById($id);

        if ($notice) {
            $response->send($notice);
        } else {
            $response->error(404, 'Notice not found');
        }
    }

    public function create(Request $request, Response $response)
    {
        $this->Authorized($request, $response);

        $data = $request->getBody();
        $this->validateNoticeData($response, $data);

        $notice = $this->repository->createNotice($data);

        if (!$notice) {
            $response->error(500, 'Failed to create notice');
            return;
        }

        $response->setStatusCode(201)->send($notice);
    }

    public function update(Request $request, Response $response)
    {
        $this->Authorized($request, $response);

        $id = $request->getParams()['id'] ?? null;
        $this->validateId($response, $id);

        $data = $request->getBody();
        $this->validateNoticeData($response, $data);

        $notice = $this->repository->updateNotice($id, $data);

        if (!$notice) {
            $response->error(500, 'Failed to update notice');
            return;
        }

        $response->send($notice);
    }

    public function delete(Request $request, Response $response)
    {
        $this->Authorized($request, $response);

        $id = $request->getParams()['id'] ?? null;
        $this->validateId($response, $id);

        $deleted = $this->repository->deleteNotice($id);

        if (!$deleted) {
            $response->error(500, 'Failed to delete notice');
            return;
        }

        $response->send(['message' => "Notice with ID $id deleted"]);
    }
}