<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class PassOut extends AbstractMigration
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
        $table = $this->table('pass_outs');
        $table
        ->addColumn('batch_id', 'integer', [
            'null' => false,
            'signed' => false
        ])
        ->addColumn('pass_out_year', 'integer', [
            'null' => false,
            'signed' => false,
            'limit' => 4,
        ])
        ->addForeignKey('batch_id', 'batches', 'id', [
            'delete'=> 'CASCADE',
            'update'=> 'NO_ACTION'
        ])
        ->addTimestamps()
        ->create();
    }
}
