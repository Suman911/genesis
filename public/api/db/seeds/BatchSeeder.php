<?php

declare(strict_types=1);

use Db\Seeds\Base_Seed;

final class BatchSeeder extends Base_Seed
{
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
            ['id' => 1,'batch_id' => 1, 'name' => 'BSc. 2023', 'seq'=> 1, 'active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 2,'batch_id' => 1, 'name' => 'BSc. 2024', 'seq'=> 2, 'active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 3,'batch_id' => 2, 'name' => 'MSc. 2023', 'seq'=> 1, 'active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 4,'batch_id' => 2, 'name' => 'MSc. 2024', 'seq'=> 2, 'active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 5,'batch_id' => 3, 'name' => 'HS 2023', 'seq'=> 1, 'active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 6,'batch_id' => 3, 'name' => 'HS 2024', 'seq'=> 2, 'active' => true, 'created_at' => $now, 'updated_at' => $now],
        ];
        $this->table('sub_batches')->insert($subBatches)->saveData();
    }
}