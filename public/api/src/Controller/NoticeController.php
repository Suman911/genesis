<?php

namespace Api\Controller;

use Api\Http\Request;
use Api\Http\Response;
use Api\Repository\NoticeRepository;
use Api\Utils\FileHandler;

final class NoticeController extends Controller
{
    public function __construct()
    {
        $this->repository = new NoticeRepository();
    }
    private function validateNoticeData(Response $response, array $data)
    {
        foreach (['title', 'description', 'target_timestamp', 'expiry_date', 'type', 'is_urgent'] as $field) {
            if (!isset($data[$field])) {
                $response->error(400, "$field is required.");
            }
        }
    }

    public function index(Request $request, Response $response)
    {
        $all = $request->getQueryParams()['all'] ?? false;
        $notices = $all ? $this->repository->getAllNotices() : $this->repository->getNotices();

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

        $document_url = FileHandler::upload(
            $request,
            $response,
            'document',
            '/uploads/notices/',
            ['title' => $data['title'], 'suffix' => $data['target_timestamp']]
        );

        if ($document_url) {
            $data['document_url'] = $document_url;
        }
        $data['is_urgent'] = filter_var($data['is_urgent'], FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE) ? 1 : 0;

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
        $data['is_urgent'] = filter_var($data['is_urgent'], FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE) ? 1 : 0;
        $data['updated_at'] = date('Y-m-d H:i:s');

        $oldNotice = $this->repository->getNoticeById($id);
        if (!$oldNotice) {
            $response->error(404, 'Notice not found');
            return;
        }
        $oldFile = $oldNotice['document_url'] ?? null;

        $remove = filter_var($data['remove'], FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);

        if ($remove) {
            $data['document_url'] = '';
            FileHandler::remove($oldFile);
        } else {
            $document_url = FileHandler::upload(
                $request,
                $response,
                'document',
                '/uploads/notices/',
                ['title' => $data['title'], 'suffix' => $data['target_timestamp']],
                $oldFile
            );
            $data['document_url'] = $document_url;
        }
        unset($data['remove']);

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

        $oldNotice = $this->repository->getNoticeById($id);
        if (!$oldNotice) {
            $response->error(404, 'Notice not found');
            return;
        }

        $deleted = $this->repository->deleteNotice($id);

        if (!$deleted) {
            $response->error(500, 'Failed to delete notice');
            return;
        }
        $oldFile = $oldNotice['document_url'] ?? null;
        FileHandler::remove($oldFile);

        $response->send(['message' => "Notice with ID $id deleted"]);
    }
}