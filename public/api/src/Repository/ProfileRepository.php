<?php

namespace Api\Repository;

use PDO;

final class ProfileRepository extends Repository
{
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
        'isUpdated',
        'date_of_passout'
    ];

    public function fetch(string $user_name, ?bool $full = false): ?array
    {
        if (!$user_name)
            return null;

        $fields = $this->implode('s', $this->studentDetailFields);
        $sql1 = $full
            ? "SELECT $fields,
                u.name, u.email, u.user_name, u.ph_number
                FROM students s
                JOIN users u ON u.id = s.user_id
                WHERE u.user_name = :user_name"
            : "SELECT s.id, s.college, s.subject, s.photo, s.facebook_profile,
                    s.date_of_admission, s.isAlumni, s.date_of_passout,
                    u.name, u.email, u.user_name, u.ph_number
                FROM students s
                JOIN users u ON u.id = s.user_id
                WHERE u.user_name = :user_name";

        $stmt1 = $this->pdo->prepare($sql1);
        $stmt1->execute(['user_name' => $user_name]);
        $student = $stmt1->fetch(PDO::FETCH_ASSOC);

        if (!$student) {
            return null;
        }

        $sql2 = "SELECT sb.batch_id, b.course_id, b.name AS batch_name, sb.status
                FROM student_batches sb
                JOIN batches b ON b.id = sb.batch_id
                WHERE sb.student_id = :id";

        $stmt2 = $this->pdo->prepare($sql2);
        $stmt2->execute(['id' => $student['id']]);
        $student['batches'] = $stmt2->fetchAll(PDO::FETCH_ASSOC);

        return $student;
    }

    public function getStudentStatus(int $userId): ?array
    {
        $sql = "SELECT s.photo, s.isUpdated, u.user_name
            FROM students s 
            join users u on u.id = s.user_id
            WHERE s.user_id = :user_id LIMIT 1";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['user_id' => $userId]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        return $result;
    }

    public function updateProfile(int $userId, array $data): ?array
    {
        $allowedFields = [
            'photo',
            'address',
            'date_of_birth',
            'facebook_profile',
            'guardian_name',
            'guardian_number'
        ];

        $fields = [];
        $params = [':user_id' => $userId];

        foreach ($data as $key => $value) {
            if (in_array($key, $allowedFields)) {
                $fields[] = "$key = :$key";
                $params[":$key"] = $value;
            }
        }

        if (empty($fields)) {
            return null;
        }

        $sql = "UPDATE students SET isUpdated = true, " . implode(', ', $fields) . " WHERE user_id = :user_id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);

        return $this->fetch($data['user_name'], true);
    }
}