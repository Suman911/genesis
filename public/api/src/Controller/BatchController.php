<?php

namespace Api\Controller;

use Api\Http\Request;
use Api\Http\Response;
use Api\Repository\BatchRepository;

final class BatchController extends Controller
{
    private $batchRepository;

    public function __construct()
    {
        $this->batchRepository = new BatchRepository();
    }

    public function counts(Request $request, Response $response)
    {
        $counts = $this->batchRepository->getCounts();
        $response->send($counts);
    }

    private function getStudentCount(array $batch): array
    {
        $total = 0;

        foreach ($batch['sub_batches'] as &$subBatch) {
            $subBatch['student_count'] = $this->batchRepository->getStudentCountForSubBatch($subBatch['id']);
            $total += $subBatch['student_count'];
        }

        $batch['student_count'] = $total;
        return $batch;
    }

    public function index(Request $request, Response $response)
    {
        // $this->Authorized($request, $response);
        $batches = $this->batchRepository->getAllBatchesWithSubBatches();

        foreach ($batches as &$batch) {
            $batch = $this->getStudentCount($batch);
        }

        $response->send($batches);
    }

    public function fetch(Request $request, Response $response)
    {
        $this->Authorized($request, $response);
        $id = $request->getParams()['id'] ?? null;
        $this->validateId($response, $id);
        $batch = $this->batchRepository->getBatchById($id);

        if (!$batch) {
            $response->error(404, 'Batch not found');
        }

        $batch = $this->getStudentCount($batch);
        $response->send($batch);
    }

    public function create(Request $request, Response $response)
    {
        $this->Authorized($request, $response);
        $data = $request->getBody();
        if (empty($data['name'])) {
            $response->error(400, 'Batch name is required');
        }
        $batch = $this->batchRepository->createBatch($data);
        $response->setStatusCode(201)->send($batch);
    }

    public function update(Request $request, Response $response)
    {
        $this->Authorized($request, $response);
        $id = $request->getParams()['id'] ?? null;
        $this->validateId($response, $id);

        $data = $request->getBody();

        try {
            $this->batchRepository->startTransaction();

            // Update batch main fields
            $batchData = [
                'name' => $data['name'] ?? null,
                'active' => $data['active'] ?? 1,
            ];
            $batch = $this->batchRepository->updateBatch($id, $batchData);

            if (!$batch) {
                throw new \RuntimeException('Failed to save Batch.');
            }
            // Handle sub_batches
            if (!empty($data['sub_batches']) && is_array($data['sub_batches'])) {
                foreach ($data['sub_batches'] as $subBatch) {
                    $subBatchId = (int) ($subBatch['id'] ?? 0);

                    $subBatchData = [
                        'batch_id' => $id,
                        'name' => $subBatch['name'] ?? '',
                        'active' => $subBatch['active'] ?? 1,
                        'seq' => $subBatch['seq'] ?? null,
                    ];

                    $success = $subBatchId > 0
                        ? $this->batchRepository->updateSubBatch($subBatchId, $subBatchData)
                        : $this->batchRepository->createSubBatch($subBatchData);

                    if (!$success) {
                        throw new \RuntimeException('Failed to save sub-batch.');
                    }
                }

            }

            $this->batchRepository->commitTransaction();

            // Return updated batch with sub-batches
            $updatedBatch = $this->batchRepository->getBatchById($id);
            $updatedBatch = $this->getStudentCount($updatedBatch);
            $response->send($updatedBatch);
        } catch (\Throwable $e) {
            $this->batchRepository->rollbackTransaction();
            $response->error(500, 'Batch update failed: ' . $e->getMessage());
        }
    }
}