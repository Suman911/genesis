<?php

declare(strict_types=1);

use Db\Seeds\Base_Seed;

final class BatchSeeder extends Base_Seed
{
    public function run(): void
    {
        if (!$this->isEmpty('courses')) {
            return;
        }
        $now = date('Y-m-d H:i:s');
        $courses = [
            ['id' => 1, 'name' => 'Bachelor of Science', 'active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 2, 'name' => 'Master of Science', 'active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 3, 'name' => 'Higher Secondary', 'active' => true, 'created_at' => $now, 'updated_at' => $now],
        ];
        $this->table('courses')->insert($courses)->saveData();

        if (!$this->isEmpty('batches')) {
            return;
        }
        $batches = [
            ['id' => 1,'course_id' => 1, 'name' => 'BSc. 2023', 'seq'=> 1, 'active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 2,'course_id' => 1, 'name' => 'BSc. 2024', 'seq'=> 2, 'active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 3,'course_id' => 2, 'name' => 'MSc. 2023', 'seq'=> 1, 'active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 4,'course_id' => 2, 'name' => 'MSc. 2024', 'seq'=> 2, 'active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 5,'course_id' => 3, 'name' => 'HS 2023', 'seq'=> 1, 'active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 6,'course_id' => 3, 'name' => 'HS 2024', 'seq'=> 2, 'active' => true, 'created_at' => $now, 'updated_at' => $now],
        ];
        $this->table('batches')->insert($batches)->saveData();
    }
}