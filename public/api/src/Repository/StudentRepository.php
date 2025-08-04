<?php

namespace Api\Repository;

use PDO;

final class StudentRepository extends Repository
{
    private array $studentListFields = ['id', 'college', 'subject'];
    private function orderMap(array $filterOrder): array
    {
        $map = [
            'admission' => 's.date_of_admission',
            'passout' => 's.date_of_passout',
            'name' => 'u.name',
            'college' => 's.college',
            'subject' => 's.subject',
            'has_active' => 'has_active'
        ];

        return array_map(function ($f) use ($map) {
            if (is_array($f)) {
                $field = $map[$f[0]] ?? $f[0];
                $dir = $f[1] === 0 ? 'DESC' : 'ASC';
                return "$field $dir";
            }
            return $f;
        }, $filterOrder);
    }
    public function list(array $filters = []): array
    {
        $fields = $this->implode('s', $this->studentListFields);
        $conds = [];
        $params = [];

        $sql = "SELECT $fields, u.name,
                        GROUP_CONCAT(DISTINCT 
                            CONCAT(sub.name, IF(sb.status = 'active', ' (active)', ''))
                            ORDER BY sub.seq ASC, sub.batch_id ASC SEPARATOR ', ') AS batches,
                        MAX(sb.status = 'active') AS has_active
                FROM students s
                JOIN users u ON u.id = s.user_id
                JOIN student_batches sb ON sb.student_id = s.id
                JOIN sub_batches sub ON sub.id = sb.sub_batch_id";

        if (isset($filters['batch_id'])) {
            $conds[] = "sub.batch_id = :batch_id";
            $params[':batch_id'] = (int) $filters['batch_id'];
        }
        if (isset($filters['sub_batch_id'])) {
            $conds[] = "sub.id = :sub_batch_id";
            $params[':sub_batch_id'] = (int) $filters['sub_batch_id'];
        }
        if (isset($filters['status'])) {
            $conds[] = "sb.status = :status";
            $params[':status'] = $filters['status'];

            if ($filters['status'] == 'completed') {
                if (isset($filters['passout']['from'])) {
                    $conds[] = "s.date_of_passout >= :from";
                    $params[':from'] = $filters['passout']['from'];
                }
                if (isset($filters['passout']['to'])) {
                    $conds[] = "s.date_of_passout <= :to";
                    $params[':to'] = $filters['passout']['to'];
                }
            }
        }
        if (isset($filters['search'])) {
            $search = $filters['search'];
            $conds[] = "(u.name LIKE :search OR u.email LIKE :search)";
            $params[':search'] = "%$search%";
        }
        if (isset($filters['college'])) {
            $college = $filters['college'];
            $conds[] = "s.college LIKE :college";
            $params[':college'] = "%$college%";
        }
        if (isset($filters['subject'])) {
            $subject = $filters['subject'];
            $conds[] = "s.subject LIKE :subject";
            $params[':subject'] = "%$subject%";
        }

        if ($conds) {
            $sql .= ' WHERE ' . implode(' AND ', $conds);
        }

        $sql .= ' GROUP BY s.id';

        if (!empty($filters['order_by'])) {
            $order = implode(', ', $this->orderMap($filters['order_by']));
            $sql .= " ORDER BY $order, s.id DESC";
        } else {
            $sql .= " ORDER BY s.id DESC";
        }

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function listUnassigned(): array
    {
        $fields = $this->implode('s', $this->studentListFields);
        $sql = "SELECT $fields, u.name, u.email
                FROM students s
                JOIN users u ON u.id = s.user_id
                LEFT JOIN student_batches sb ON sb.student_id = s.id
                WHERE sb.id IS NULL";
        return $this->pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);
    }

    public function find(int $id): ?array
    {
        $fields = $this->implode('s', $this->studentListFields);
        $stmt = $this->pdo->prepare(
            "SELECT $fields, u.name, u.email
            FROM students s
            JOIN users u ON u.id = s.user_id
            WHERE s.id = :id"
        );
        $stmt->execute([':id' => $id]);
        $r = $stmt->fetch(PDO::FETCH_ASSOC);
        return $r ?: null;
    }

    public function addToBatch(int $studentId, int $subBatchId): int
    {
        $stmt = $this->pdo->prepare(
            "INSERT INTO student_batches (student_id,sub_batch_id) VALUES (:sid,:sbid)"
        );
        $stmt->execute([':sid' => $studentId, ':sbid' => $subBatchId]);
        return (int) $this->pdo->lastInsertId();
    }

    public function unassign(int $studentId, int $subBatchId)
    {
        $stmt = $this->pdo->prepare(
            "DELETE FROM student_batches WHERE student_id = :sid AND sub_batch_id = :sbid"
        );
        return $stmt->execute([':sid' => $studentId, ':sbid' => $subBatchId]);
    }

    public function updateStudent(int $id, array $d): bool
    {
        $fields = [];
        $params = [':id' => $id];
        foreach (['college', 'subject', 'isAlumni'] as $k) {
            if (array_key_exists($k, $d)) {
                $fields[] = "$k = :$k";
                $params[":$k"] = $d[$k];
            }
        }
        if (!$fields) {
            return false;
        }
        $sql = "UPDATE students SET " . implode(', ', $fields) . " WHERE id = :id";
        return $this->pdo->prepare($sql)->execute($params);
    }

    public function deleteStudent(int $id): bool
    {
        return $this->pdo
            ->prepare("DELETE FROM students WHERE id = :id")
            ->execute([':id' => $id]);
    }
}