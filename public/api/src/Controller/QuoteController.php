<?php

namespace Api\Controller;

use Api\Http\Request;
use Api\Http\Response;
use Api\Repository\QuoteRepository;

final class QuoteController extends Controller
{
    public function __construct()
    {
        $this->repository = new QuoteRepository();
    }

    private function validateCreateUpdate(Response $response, array $data)
    {
        foreach (['author', 'quote'] as $field) {
            if (empty($data[$field])) {
                $response->error(400, "$field is required.");
            }
        }
    }

    public function index(Request $request, Response $response): void
    {
        $params = $request->getQueryParams();
        // only search by author (frontend will pass author param)
        $result = $this->repository->list($params);

        $response->send([
            'quotes' => $result['quotes'],
            'total' => $result['total']
        ]);
    }

    public function create(Request $request, Response $response): void
    {
        $this->Authorized($request, $response);

        $data = $request->getBody();
        $this->validateCreateUpdate($response, $data);

        try {
            $id = $this->repository->create($data);
            $response->send(['message' => 'Quote created', 'id' => $id]);
        } catch (\Exception $e) {
            $response->error(500, 'Failed to create quote: ' . $e->getMessage());
        }
    }

    public function update(Request $request, Response $response): void
    {
        $this->Authorized($request, $response);

        $id = (int) $request->getParams()['id'];
        $this->validateId($response, $id);

        $data = $request->getBody();
        $this->validateCreateUpdate($response, $data);

        $ok = $this->repository->update($id, $data);
        if (!$ok) {
            $response->error(400, 'Failed to update');
            return;
        }
        $response->send(['message' => 'Quote updated successfully']);
    }

    public function delete(Request $request, Response $response): void
    {
        $this->Authorized($request, $response);

        $id = (int) $request->getParams()['id'];
        $this->validateId($response, $id);

        $ok = $this->repository->delete($id);
        if (!$ok) {
            $response->error(400, 'Failed to delete');
            return;
        }
        $response->setStatusCode(204)->send(['message' => 'Deleted']);
    }
}