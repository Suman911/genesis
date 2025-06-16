<?php

namespace Api\Controller;

use Api\Http\Request;
use Api\Http\Response;
use Api\Repository\NoticeRepository;

class NoticeController extends Controller
{
    private $noticeRepository;

    public function __construct()
    {
        $this->noticeRepository = new NoticeRepository();
    }
    private function validateNoticeData(Response $response, array $data)
    {
        foreach (['title', 'description', 'posted_date', 'target_timestamp', 'expiry_date', 'type'] as $field) {
            if (empty($data[$field])) {
                $response->setStatusCode(400)->send(['error' => "$field is required."]);
            }
        }
    }

    public function index(Request $request, Response $response)
    {
        // $this->Authorized($request, $response);
        
        $notices = $this->noticeRepository->getAllNotices();
        $response->send(['notices' => $notices]);
    }

    public function show(Request $request, Response $response)
    {
        $this->Authorized($request, $response);

        $id = $request->getParams()['id'] ?? null;
        $this->validateId($response, $id);

        $notice = $this->noticeRepository->getNoticeById($id);

        if ($notice) {
            $response->send(['notice' => $notice]);
        } else {
            $response->setStatusCode(404)->send(['message' => 'Notice not found']);
        }
    }

    public function create(Request $request, Response $response)
    {
        $this->Authorized($request, $response);

        $data = $request->getBody();
        $this->validateNoticeData($response, $data);

        $notice = $this->noticeRepository->createNotice($data);

        if (!$notice) {
            $response->setStatusCode(500)->send(['message' => 'Failed to create notice']);
            return;
        }

        $response->send(['message' => 'Notice created', 'notice' => $notice]);
    }

    public function update(Request $request, Response $response)
    {
        $this->Authorized($request, $response);

        $id = $request->getParams()['id'] ?? null;
        $this->validateId($response, $id);

        $data = $request->getBody();
        $this->validateNoticeData($response, $data);

        $notice = $this->noticeRepository->updateNotice($id, $data);

        if (!$notice) {
            $response->setStatusCode(500)->send(['message' => 'Failed to update notice']);
            return;
        }

        $response->send(['message' => 'Notice updated', 'notice' => $notice]);
    }

    public function delete(Request $request, Response $response)
    {
        $this->Authorized($request, $response);

        $id = $request->getParams()['id'] ?? null;
        $this->validateId($response, $id);

        $deleted = $this->noticeRepository->deleteNotice($id);

        if (!$deleted) {
            $response->setStatusCode(500)->send(['message' => 'Failed to delete notice']);
            return;
        }

        $response->send(['message' => "Notice with ID $id deleted"]);
    }
}