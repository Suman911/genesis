<?php

namespace Api\Repository;

use PDO;

final class StudentRepository extends Repository
{
    private array $studentListFields = ['id', 'college', 'subject'];
    private array $studentDetailFields = [
        'id',
        'college',
        'subject',
        'photo',
        'address',
        'date_of_birth',
        'facebook_profile',
        'guardian_name',
        'guardian_number',
        'date_of_admission',
        'isAlumni',
        'date_of_passout'
    ];

    private function orderMap(array $filterOrder): array
    {
        $map = [
            'admission' => 's.date_of_admission',
            'passout' => 's.date_of_passout',
            'name' => 'u.name',
            'college' => 's.college',
            'subject' => 's.subject',
            'active' => 'has_active'
        ];

        return array_map(function ($f) use ($map) {
            if (is_array($f)) {
                $field = $map[$f[0]];
                $dir = $f[1] ? 'ASC' : 'DESC';
                return "$field $dir";
            }
            return $f;
        }, $filterOrder);
    }

    public function listQuery(array $filters = [])
    {
        $params = [];
        $fields = $this->implode('s', $this->studentListFields);
        $conds = [];

        $base_sql = "FROM students s
                    JOIN users u ON u.id = s.user_id
                    JOIN student_batches sb ON sb.student_id = s.id
                    JOIN batches b ON b.id = sb.batch_id";

        if (isset($filters['course_id'])) {
            $conds[] = "b.course_id = :course_id";
            $params[':course_id'] = (int) $filters['course_id'];
        }
        if (isset($filters['batch_id'])) {
            $conds[] = "b.id = :batch_id";
            $params[':batch_id'] = (int) $filters['batch_id'];
        }
        if (isset($filters['status'])) {
            $conds[] = "sb.status = :status";
            $params[':status'] = $filters['status'];

            if ($filters['status'] === 'completed') {
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
            $conds[] = "(u.name LIKE :search OR u.email LIKE :search)";
            $params[':search'] = "%" . $filters['search'] . "%";
        }
        if (isset($filters['college'])) {
            $conds[] = "s.college LIKE :college";
            $params[':college'] = "%" . $filters['college'] . "%";
        }
        if (isset($filters['subject'])) {
            $conds[] = "s.subject LIKE :subject";
            $params[':subject'] = "%" . $filters['subject'] . "%";
        }

        if ($conds) {
            $base_sql .= ' WHERE ' . implode(' AND ', $conds);
        }

        $sql_student = "SELECT $fields, u.name,
                        GROUP_CONCAT(DISTINCT 
                            CONCAT(b.name, IF(sb.status = 'active', ' (active)', ''))
                            ORDER BY b.seq ASC, b.course_id ASC SEPARATOR ', ') AS batches,
                        MAX(sb.status = 'active') AS has_active
                    $base_sql
                    GROUP BY s.id";

        if (!empty($filters['order_by'])) {
            $order = implode(', ', $this->orderMap($filters['order_by']));
            $sql_student .= " ORDER BY $order, s.id DESC";
        } else {
            $sql_student .= " ORDER BY s.id DESC";
        }

        if (isset($filters['limit'])) {
            $limit = (int) $filters['limit'];
            $page = max((int) ($filters['page'] ?? 1), 1);
            $offset = ($page - 1) * $limit;
            $sql_student .= " LIMIT $limit OFFSET $offset";
        }

        $sql_count = "SELECT COUNT(DISTINCT s.id) $base_sql";
        return [$sql_student, $sql_count, $params];
    }

    public function list(array $filters = []): array
    {
        [$sql_student, $sql_count, $params] = $this->listQuery($filters);

        $stmt = $this->pdo->prepare($sql_student);
        $stmt->execute($params);
        $students = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $stmt = $this->pdo->prepare($sql_count);
        $stmt->execute($params);
        $totalCount = (int) $stmt->fetchColumn();

        return [
            'students' => $students,
            'total' => $totalCount
        ];
    }

    public function listUnassigned(): array
    {
        $fields = $this->implode('s', $this->studentListFields);
        $sql = "SELECT $fields, u.name
                FROM students s
                JOIN users u ON u.id = s.user_id
                LEFT JOIN student_batches sb ON sb.student_id = s.id
                WHERE sb.id IS NULL";
        return $this->pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);
    }

    public function find(string $id): ?array
    {
        $fields = $this->implode('s', $this->studentDetailFields);
        $sql = "SELECT $fields,
                u.name, u.email, u.user_name, u.ph_number
            FROM students s
            JOIN users u ON u.id = s.user_id
            WHERE s.id = :id;

            SELECT 
                sb.batch_id, b.course_id, b.name AS batch_name, sb.status
            FROM student_batches sb
            JOIN batches b ON b.id = sb.batch_id
            WHERE sb.student_id = :id;
        ";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['id' => $id]);
        $student = $stmt->fetch(PDO::FETCH_ASSOC);

        $stmt->nextRowset();
        $student['batches'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $student ?: null;
    }

    public function addToBatches(int $studentId, array $batchIds): bool
    {
        if (empty($batchIds)) {
            return false;
        }

        $placeholders = [];
        $params = [':sid' => $studentId];

        foreach ($batchIds as $i => $batchId) {
            $ph = ":bid{$i}";
            $placeholders[] = "(:sid, $ph)";
            $params[$ph] = (int) $batchId;
        }

        $sql = "INSERT INTO student_batches (student_id, batch_id) VALUES " . implode(',', $placeholders);
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute($params);
    }

    public function unassign(int $studentId, int $batchId)
    {
        $stmt = $this->pdo->prepare(
            "DELETE FROM student_batches WHERE student_id = :sid AND batch_id = :bid"
        );
        return $stmt->execute([':sid' => $studentId, ':bid' => $batchId]);
    }

    public function updateStudent(int $id, array $data): bool
    {
        $S_fields = [];
        $params = [':id' => $id];
        foreach (['college', 'subject'] as $k) {
            $S_fields[] = "$k = :$k";
            $params[":$k"] = $data[$k];
        }
        $U_fields = [];
        foreach (['email', 'name', 'user_name', 'ph_number'] as $k) {
            $U_fields[] = "$k = :$k";
            $params[":$k"] = $data[$k];
        }
        $sql = "UPDATE students SET " . implode(', ', $S_fields) . " WHERE id = :id;
                UPDATE users SET " . implode(', ', $U_fields) . " WHERE id = (SELECT user_id FROM students WHERE id = :id)";
        return $this->pdo->prepare($sql)->execute($params);
    }

    public function deleteStudent(int $id): bool
    {
        return $this->pdo
            ->prepare("DELETE FROM students WHERE id = :id")
            ->execute([':id' => $id]);
    }

    public function statusUpdate(array $data): bool
    {
        $sql = "UPDATE student_batches 
            SET status = :status 
            WHERE student_id = :sid AND batch_id = :bid";

        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute([
            ':status' => $data['status'],
            ':sid' => $data['sid'],
            ':bid' => $data['bid']
        ]);
    }
}