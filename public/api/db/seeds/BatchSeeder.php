<?php

declare(strict_types=1);

use Db\Seeds\Base_Seed;

final class BatchSeeder extends Base_Seed
{
    public function getDependencies(): array
    {
        return [
            'UserSeeder'
        ];
    }
    public function run(): void
    {
        if (!$this->isEmpty('batches')) {
            return;
        }
        $now = date('Y-m-d H:i:s');
        $batches = [
            ['id' => 1, 'name' => 'Bachelor of Science', 'active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 2, 'name' => 'Master of Science', 'active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 3, 'name' => 'Higher Secondary', 'active' => true, 'created_at' => $now, 'updated_at' => $now],
        ];
        $this->table('batches')->insert($batches)->saveData();


        if (!$this->isEmpty('sub_batches')) {
            return;
        }
        $subBatches = [
            ['batch_id' => 1, 'name' => 'BSc. 1st year', 'active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['batch_id' => 1, 'name' => 'BSc. 2nd year', 'active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['batch_id' => 1, 'name' => 'BSc. 3rd year', 'active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['batch_id' => 1, 'name' => 'BSc. 4th year', 'active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['batch_id' => 2, 'name' => 'MSc. 1st year', 'active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['batch_id' => 2, 'name' => 'MSc. 2nd year', 'active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['batch_id' => 3, 'name' => 'HS 11th', 'active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['batch_id' => 3, 'name' => 'HS 12th', 'active' => true, 'created_at' => $now, 'updated_at' => $now],
        ];
        $this->table('sub_batches')->insert($subBatches)->saveData();
    }
}