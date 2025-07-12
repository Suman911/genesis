<?php

namespace Api\Controller;

use Api\Http\Request;
use Api\Http\Response;
use Api\Repository\BatchRepository;

final class BatchController extends Controller
{
    public function __construct()
    {
        $this->repository = new BatchRepository();
    }

    public function counts(Request $request, Response $response)
    {
        $counts = $this->repository->getCounts();
        $response->send($counts);
    }

    private function getStudentCount(array $batch): array
    {
        $total = 0;

        foreach ($batch['sub_batches'] as &$subBatch) {
            $subBatch['student_count'] = $this->repository->getStudentCountForSubBatch($subBatch['id']);
            $total += $subBatch['student_count'];
        }

        $batch['student_count'] = $total;
        return $batch;
    }

    public function index(Request $request, Response $response)
    {
        // $this->Authorized($request, $response);
        $batches = $this->repository->getAllBatchesWithSubBatches();

        foreach ($batches as &$batch) {
            $batch = $this->getStudentCount($batch);
        }

        $response->send($batches);
    }

    public function names(Request $request, Response $response)
    {
        // $this->Authorized($request, $response);
        $batches = $this->repository->getActiveBatchSubBatch();

        $response->send($batches);
    }

    public function update(Request $request, Response $response)
    {
        $this->Authorized($request, $response);
        $id = (int) ($request->getParams()['id'] ?? 0);

        $data = $request->getBody();

        try {
            $this->repository->startTransaction();

            $isNew = $id === 0;

            $batchData = [
                'name' => $data['name'] ?? null,
                'active' => $data['active'] ?? 1,
            ];

            // Create or update the batch
            $batch = $isNew
                ? $this->repository->createBatch($batchData)
                : $this->repository->updateBatch($id, $batchData);

            if (!$batch || !isset($batch['id'])) {
                throw new \RuntimeException('Failed to save batch.');
            }

            $batchId = (int) $batch['id'];

            // Process sub-batches
            if (!empty($data['sub_batches']) && is_array($data['sub_batches'])) {
                foreach ($data['sub_batches'] as $subBatch) {
                    $subBatchId = (int) ($subBatch['id'] ?? 0);

                    $subBatchData = [
                        'batch_id' => $batchId,
                        'name' => $subBatch['name'] ?? '',
                        'active' => $subBatch['active'] ?? 1,
                        'seq' => $subBatch['seq'] ?? null,
                    ];

                    $success = $subBatchId > 0
                        ? $this->repository->updateSubBatch($subBatchId, $subBatchData)
                        : $this->repository->createSubBatch($subBatchData);

                    if (!$success) {
                        throw new \RuntimeException('Failed to save sub-batch.');
                    }
                }
            }

            $this->repository->commitTransaction();

            // Return updated or created batch with sub-batches
            $updatedBatch = $this->repository->getBatchById($batchId);
            $updatedBatch = $this->getStudentCount($updatedBatch);
            $response->send($updatedBatch);

        } catch (\Throwable $e) {
            $this->repository->rollbackTransaction();
            $response->error(500, 'Batch save failed: ' . $e->getMessage());
        }
    }

    public function delete(Request $request, Response $response)
    {
        $this->Authorized($request, $response);
        $id = $request->getParams()['id'];

        $this->validateId($response, $id);

        try {
            // Check if the batch has sub-batches
            $subBatches = $this->repository->getSubBatchesByBatchId($id);
            if (!empty($subBatches)) {
                $response->error(400, 'Cannot delete batch with sub-batches.');
                return;
            }

            // Soft delete the batch
            $this->repository->deleteBatch($id);
            $response->send(['message' => 'Batch deleted successfully.']);

        } catch (\Throwable $e) {
            $response->error(500, 'Batch deletion failed: ' . $e->getMessage());
        }
    }

    public function deleteSubBatch(Request $request, Response $response)
    {
        $this->Authorized($request, $response);
        $id = $request->getParams()['id'];

        $this->validateId($response, $id);

        try {
            // Check if the sub-batch has students
            $studentCount = $this->repository->getStudentCountForSubBatch($id);
            if ($studentCount > 0) {
                $response->error(400, 'Cannot delete sub-batch with students.');
                return;
            }

            // Delete the sub-batch
            $this->repository->deleteSubBatch($id);
            $response->send(['message' => 'Sub-batch deleted successfully.']);

        } catch (\Throwable $e) {
            $response->error(500, 'Sub-batch deletion failed: ' . $e->getMessage());
        }
    }
}