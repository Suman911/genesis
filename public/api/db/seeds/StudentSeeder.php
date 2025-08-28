<?php

declare(strict_types=1);

use Db\Seeds\Base_Seed;

final class StudentSeeder extends Base_Seed
{
    public function getDependencies(): array
    {
        return ['BatchSeeder'];
    }

    public function run(): void
    {
        if (!$this->isEmpty('users')) {
            return;
        }

        $students = $this->loadData(__DIR__ . '/students.json') ?? [
            [
                'name' => 'Riya Sen',
                'user_name' => 'riya_sen',
                'email' => 'riya.sen@example.com',
                'ph_number' => '9876543210',
                'password' => 'StrongP@ssw0rd!',
                'college' => 'ABC College of Science',
                'date_of_admission' => '2024-01-15',
                'subject' => 'Physics',
                'batch_id' => 2,
            ],
        ];

        $now = date('Y-m-d H:i:s');

        foreach ($students as $student) {
            $this->table('users')->insert([
                'name' => $student['name'],
                'user_name' => $student['user_name'],
                'email' => $student['email'],
                'ph_number' => $student['ph_number'],
                'password' => password_hash($student['password'], PASSWORD_DEFAULT),
                'created_at' => $now,
                'updated_at' => $now
            ])->saveData();
            $userId = $this->getAdapter()->getConnection()->lastInsertId();

            $this->table('students')->insert([
                'user_id' => $userId,
                'college' => $student['college'],
                'date_of_admission' => $student['date_of_admission'],
                'subject' => $student['subject'],
                'created_at' => $now,
                'updated_at' => $now
            ])->saveData();
            $studentId = $this->getAdapter()->getConnection()->lastInsertId();

            $this->table('student_batches')->insert([
                'student_id' => $studentId,
                'batch_id' => $student['batch_id'],
                'created_at' => $now,
                'updated_at' => $now
            ])->saveData();
        }

    }
}