<?php

namespace Api\Repository;

use PDO;

final class NoticeRepository extends Repository
{
    public function getAllNotices()
    {
        $stmt = $this->pdo->query("SELECT * FROM notices ORDER BY id DESC");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    public function getNotices()
    {
        $currentDate = date('Y-m-d H:i:s');
        $stmt = $this->pdo->prepare("SELECT * FROM notices WHERE target_timestamp <= :currentDate AND expiry_date >= :currentDate ORDER BY id DESC");
        $stmt->execute(['currentDate' => $currentDate]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getNoticeById($id)
    {
        $stmt = $this->pdo->prepare("SELECT * FROM notices WHERE id = :id");
        $stmt->execute(['id' => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function createNotice(array $data)
    {
        $stmt = $this->pdo->prepare(
            "INSERT INTO notices (title, description, document_url, target_timestamp, expiry_date, type, is_urgent, tag) 
            VALUES (:title, :description, :document_url, :target_timestamp, :expiry_date, :type, :is_urgent, :tag)"
        );

        $stmt->execute([
            ':title' => $data['title'],
            ':description' => $data['description'],
            ':document_url' => $data['document_url'] ?? null,
            ':target_timestamp' => $data['target_timestamp'],
            ':expiry_date' => $data['expiry_date'],
            ':type' => $data['type'],
            ':is_urgent' => $data['is_urgent'] ?? 0,
            ':tag' => $data['tag'] ?? null,
        ]);
        $id = $this->pdo->lastInsertId();
        return $this->getNoticeById($id);
    }

    public function updateNotice($id, array $data)
    {
        $fields = [];
        $params = [':id' => $id];
        foreach ($data as $key => $value) {
            $fields[] = "$key = :$key";
            $params[":$key"] = $value;
        }
        $sql = "UPDATE notices SET " . implode(', ', $fields) . " WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        return $this->getNoticeById($id);
    }

    public function deleteNotice($id)
    {
        $stmt = $this->pdo->prepare("DELETE FROM notices WHERE id = :id");
        return $stmt->execute(['id' => $id]);
    }
}