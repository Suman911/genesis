<?php

declare(strict_types=1);

use Db\Seeds\Base_Seed;

final class StudentSeeder extends Base_Seed
{
    public function getDependencies(): array
    {
        return ['StudentSeeder'];
    }

    public function run(): void
    {
        $students = $this->loadData(__DIR__ . '/studentBatch.json') ?? [
            [
                'student_id' => 1,
                'sub_batch_id' => 2,
            ],
        ];

        $now = date('Y-m-d H:i:s');

        foreach ($students as $student) {
            $this->table('student_batches')->insert([
                'student_id' => $student['student_id'],
                'sub_batch_id' => $student['sub_batch_id'],
                'created_at' => $now,
                'updated_at' => $now
            ])->saveData();
        }

    }
}