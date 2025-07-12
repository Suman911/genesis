<?php

namespace Api\Repository;

use PDO;

final class BatchRepository extends Repository
{
    private string $batchFields = "id, name, active";
    private string $subBatchFields = "id, batch_id, seq, name, active";

    // Get total batch and sub-batch counts
    public function getCounts()
    {
        $batchCount = $this->pdo->query("SELECT COUNT(*) FROM batches WHERE active = 1")->fetchColumn();
        $subBatchCount = $this->pdo->query("SELECT COUNT(*) FROM sub_batches WHERE active = 1")->fetchColumn();
        return [
            'batch_count' => (int) $batchCount,
            'sub_batch_count' => (int) $subBatchCount,
        ];
    }

    // Get all batches and sub-batches (no logic, just data)
    public function getAllBatchesWithSubBatches()
    {
        $sql = "SELECT $this->batchFields FROM batches ORDER BY id ASC";
        $stmt = $this->pdo->query($sql);
        $batches = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($batches as &$batch) {
            $subStmt = $this->pdo->prepare("SELECT $this->subBatchFields FROM sub_batches WHERE batch_id = :batch_id ORDER BY seq DESC");
            $subStmt->execute(['batch_id' => $batch['id']]);
            $batch['sub_batches'] = $subStmt->fetchAll(PDO::FETCH_ASSOC);
        }
        return $batches;
    }
    
    public function getActiveBatchSubBatch()
    {
        $sql = "SELECT $this->batchFields FROM batches WHERE active = 1 ORDER BY id ASC";
        $stmt = $this->pdo->query($sql);
        $batches = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($batches as &$batch) {
            $subStmt = $this->pdo->prepare("SELECT $this->subBatchFields FROM sub_batches WHERE batch_id = :batch_id AND active = 1 ORDER BY seq DESC");
            $subStmt->execute(['batch_id' => $batch['id']]);
            $batch['sub_batches'] = $subStmt->fetchAll(PDO::FETCH_ASSOC);
        }
        return $batches;
    }

    // Get student count for a sub-batch
    public function getStudentCountForSubBatch($subBatchId)
    {
        $stmt = $this->pdo->prepare("SELECT COUNT(*) FROM student_batches WHERE sub_batch_id = :sub_batch_id AND status = 1");
        $stmt->execute(['sub_batch_id' => $subBatchId]);
        return (int) $stmt->fetchColumn();
    }

    // Get batch by id with sub-batches
    public function getBatchById($id)
    {
        $stmt = $this->pdo->prepare("SELECT $this->batchFields FROM batches WHERE id = :id");
        $stmt->execute(['id' => $id]);
        $batch = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($batch) {
            $batch['sub_batches'] = $this->getSubBatchesByBatchId($id);
        }
        return $batch;
    }

    // Create batch
    public function createBatch(array $data)
    {
        $stmt = $this->pdo->prepare(
            "INSERT INTO batches (name, active) VALUES (:name, :active)"
        );
        $stmt->execute([
            ':name' => $data['name'],
            ':active' => $data['active'] ?? 1,
        ]);
        $id = $this->pdo->lastInsertId();
        return $this->getBatchById($id);
    }

    // Update batch
    public function updateBatch($id, array $data)
    {
        $fields = [];
        $params = [':id' => $id];
        foreach ($data as $key => $value) {
            $fields[] = "$key = :$key";
            $params[":$key"] = $value;
        }
        $sql = "UPDATE batches SET " . implode(', ', $fields) . ", updated_at = NOW() WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        return $this->getBatchById($id);
    }

    // Sub-batch methods
    public function getSubBatchesByBatchId($batchId)
    {
        $stmt = $this->pdo->prepare("SELECT $this->subBatchFields FROM sub_batches WHERE batch_id = :batch_id ORDER BY seq ASC");
        $stmt->execute(['batch_id' => $batchId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function createSubBatch(array $data): bool
    {
        $stmt = $this->pdo->prepare(
            "INSERT INTO sub_batches (batch_id, seq, name, active) 
            VALUES (:batch_id, :seq, :name, :active)"
        );
        return $stmt->execute([
            ':batch_id' => $data['batch_id'],
            ':seq' => $data['seq'],
            ':name' => $data['name'],
            ':active' => $data['active'] ?? 1,
        ]);
    }

    public function updateSubBatch(int $id, array $data): bool
    {
        if ($id <= 0) {
            throw new \InvalidArgumentException('Sub-batch ID is required for update');
        }

        $fields = [];
        $params = [':id' => $id];

        foreach ($data as $key => $value) {
            if ($key === 'id')
                continue;
            $fields[] = "`$key` = :$key";
            $params[":$key"] = $value;
        }

        if (empty($fields)) {
            return false;
        }

        $sql = "UPDATE sub_batches SET " . implode(', ', $fields) . ", updated_at = NOW() WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute($params);
    }

    public function deleteBatch(int $id): bool
    {
        if ($id <= 0) {
            throw new \InvalidArgumentException('Batch ID is required for deletion');
        }

        $stmt = $this->pdo->prepare("DELETE FROM batches WHERE id = :id");
        return $stmt->execute([':id' => $id]);
    }

    public function deleteSubBatch(int $id): bool
    {
        if ($id <= 0) {
            throw new \InvalidArgumentException('Sub-batch ID is required for deletion');
        }

        $stmt = $this->pdo->prepare("DELETE FROM sub_batches WHERE id = :id");
        return $stmt->execute([':id' => $id]);
    }
}