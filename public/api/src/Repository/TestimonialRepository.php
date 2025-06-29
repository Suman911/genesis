<?php

namespace Api\Repository;

use PDO;

final class TestimonialRepository extends Repository
{

    public function getAllTestimonials()
    {
        $stmt = $this->pdo->query("SELECT * FROM testimonials WHERE is_active = 1 ORDER BY created_at DESC");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getTestimonialById($id)
    {
        $stmt = $this->pdo->prepare("SELECT * FROM testimonials WHERE id = :id");
        $stmt->execute(['id' => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function createTestimonial(array $data)
    {
        $stmt = $this->pdo->prepare(
            "INSERT INTO testimonials (user_id, message, image, name, is_active, created_at, updated_at)
            VALUES (:user_id, :message, :image, :name, :is_active, :created_at, :updated_at)"
        );
        $stmt->execute([
            ':user_id' => $data['user_id'] ?? null,
            ':message' => $data['message'],
            ':image' => $data['image'],
            ':name' => $data['name'],
            ':is_active' => $data['is_active'] ?? true,
            ':created_at' => $data['created_at'] ?? date('Y-m-d H:i:s'),
            ':updated_at' => $data['updated_at'] ?? date('Y-m-d H:i:s'),
        ]);
        $id = $this->pdo->lastInsertId();
        return $this->getTestimonialById($id);
    }

    public function updateTestimonial($id, array $data)
    {
        $fields = [];
        $params = [':id' => $id];
        foreach ($data as $key => $value) {
            $fields[] = "$key = :$key";
            $params[":$key"] = $value;
        }
        $sql = "UPDATE testimonials SET " . implode(', ', $fields) . " WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        return $this->getTestimonialById($id);
    }

    public function deleteTestimonial($id)
    {
        $stmt = $this->pdo->prepare("DELETE FROM testimonials WHERE id = :id");
        return $stmt->execute(['id' => $id]);
    }
}