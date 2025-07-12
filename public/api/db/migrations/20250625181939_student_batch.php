<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class StudentBatch extends AbstractMigration
{
    /**
     * Change Method.
     *
     * Write your reversible migrations using this method.
     *
     * More information on writing migrations is available here:
     * https://book.cakephp.org/phinx/0/en/migrations.html#the-change-method
     *
     * Remember to call "create()" or "update()" and NOT "save()" when working
     * with the Table class.
     */
    public function change(): void
    {
        $table = $this->table('student_batches');
        $table
            ->addColumn('student_id', 'integer', [
                'null' => false,
                'signed' => false
            ])
            ->addColumn('sub_batch_id', 'integer', [
                'null' => false,
                'signed' => false
            ])
            ->addColumn('status', 'enum', [
                'values' => ['active', 'completed', 'dropped'],
                'null' => false,
                'default' => 'active',
            ])
            ->addForeignKey('student_id', 'students', 'id', [
                'delete'=> 'CASCADE',
                'update'=> 'NO_ACTION'
            ])
            ->addForeignKey('sub_batch_id', 'sub_batches', 'id', [
                'delete'=> 'CASCADE',
                'update'=> 'NO_ACTION'
            ])
            ->addTimestamps()
            ->create();
    }
}
