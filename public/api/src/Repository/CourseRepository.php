<?php

namespace Api\Repository;

use PDO;

final class CourseRepository extends Repository
{
    private string $courseFields = "id, name, active";
    private string $batchFields = "id, course_id, seq, name, active";

    // Get total course and batch counts
    public function getCounts()
    {
        $courseCount = $this->pdo->query("SELECT COUNT(*) FROM courses WHERE active = 1")->fetchColumn();
        $batchCount = $this->pdo->query("SELECT COUNT(*) FROM batches WHERE active = 1")->fetchColumn();
        return [
            'course' => (int) $courseCount,
            'batch' => (int) $batchCount,
        ];
    }

    // Get all courses and batches
    public function getAllCoursesWithBatches()
    {
        $sql = "SELECT $this->courseFields FROM courses ORDER BY id ASC";
        $stmt = $this->pdo->query($sql);
        $courses = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($courses as &$course) {
            $subStmt = $this->pdo->prepare("SELECT $this->batchFields FROM batches WHERE course_id = :course_id ORDER BY seq DESC");
            $subStmt->execute(['course_id' => $course['id']]);
            $course['batches'] = $subStmt->fetchAll(PDO::FETCH_ASSOC);
        }
        return $courses;
    }

    public function getCourseBatch(bool $active)
    {
        $activeCourse = $active ? 'WHERE active = 1' : '';
        $activeBatch = $active ? 'AND active = 1' : '';

        $sql = "SELECT $this->courseFields FROM courses $activeCourse ORDER BY id ASC";
        $stmt = $this->pdo->query($sql);
        $courses = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($courses as &$course) {
            $subStmt = $this->pdo->prepare("SELECT $this->batchFields FROM batches WHERE course_id = :course_id $activeBatch ORDER BY seq DESC");
            $subStmt->execute(['course_id' => $course['id']]);
            $course['batches'] = $subStmt->fetchAll(PDO::FETCH_ASSOC);
        }

        $courses = array_filter($courses, fn($c) => !empty($c['batches']));
        return $courses;
    }

    // Get student count for a batch
    public function getStudentCountForBatch($batchId)
    {
        $stmt = $this->pdo->prepare("SELECT COUNT(*) FROM student_batches WHERE batch_id = :batch_id AND status = 1");
        $stmt->execute(['batch_id' => $batchId]);
        return (int) $stmt->fetchColumn();
    }

    // Get course by id with batches
    public function getCourseById($id)
    {
        $stmt = $this->pdo->prepare("SELECT $this->courseFields FROM courses WHERE id = :id");
        $stmt->execute(['id' => $id]);
        $course = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($course) {
            $course['batches'] = $this->getBatchesByCourseId($id);
        }
        return $course;
    }

    // Create course
    public function createCourse(array $data)
    {
        $stmt = $this->pdo->prepare(
            "INSERT INTO courses (name, active) VALUES (:name, :active)"
        );
        $stmt->execute([
            ':name' => $data['name'],
            ':active' => $data['active'] ?? 1,
        ]);
        $id = $this->pdo->lastInsertId();
        return $this->getCourseById($id);
    }

    // Update course
    public function updateCourse($id, array $data)
    {
        $fields = [];
        $params = [':id' => $id];
        foreach ($data as $key => $value) {
            $fields[] = "$key = :$key";
            $params[":$key"] = $value;
        }
        $sql = "UPDATE courses SET " . implode(', ', $fields) . ", updated_at = NOW() WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        return $this->getCourseById($id);
    }

    // Batch methods
    public function getBatchesByCourseId($courseId)
    {
        $stmt = $this->pdo->prepare("SELECT $this->batchFields FROM batches WHERE course_id = :course_id ORDER BY seq DESC");
        $stmt->execute(['course_id' => $courseId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function createBatch(array $data): bool
    {
        $stmt = $this->pdo->prepare(
            "INSERT INTO batches (course_id, seq, name, active) 
            VALUES (:course_id, :seq, :name, :active)"
        );
        return $stmt->execute([
            ':course_id' => $data['course_id'],
            ':seq' => $data['seq'],
            ':name' => $data['name'],
            ':active' => $data['active'] ?? 1,
        ]);
    }

    public function updateBatch(int $id, array $data): bool
    {
        if ($id <= 0) {
            throw new \InvalidArgumentException('Batch ID is required for update');
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

        $sql = "UPDATE batches SET " . implode(', ', $fields) . ", updated_at = NOW() WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute($params);
    }

    public function deleteCourse(int $id): bool
    {
        if ($id <= 0) {
            throw new \InvalidArgumentException('Course ID is required for deletion');
        }

        $stmt = $this->pdo->prepare("DELETE FROM courses WHERE id = :id");
        return $stmt->execute([':id' => $id]);
    }

    public function deleteBatch(int $id): bool
    {
        if ($id <= 0) {
            throw new \InvalidArgumentException('Batch ID is required for deletion');
        }

        $stmt = $this->pdo->prepare("DELETE FROM batches WHERE id = :id");
        return $stmt->execute([':id' => $id]);
    }
}
