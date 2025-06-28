<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class Alumni extends AbstractMigration
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
        $table = $this->table('alumnis');
        $table
            ->addColumn('student_id', 'integer', [
                'null' => false,
                'signed' => false
            ])
            ->addColumn('pass_out_id', 'integer', [
                'null' => false,
                'signed' => false
            ])
            ->addColumn('image', 'string', [
                'limit' => 255,
                'null' => false,
            ])
            ->addColumn('current_address', 'string', [
                'limit' => 255,
                'null' => false,
            ])
            ->addColumn('current_phone', 'string', [
                'limit' => 20,
                'null' => false,
            ])
            ->addColumn('current_email', 'string', [
                'limit' => 100,
                'null' => false,
            ])
            ->addColumn('current_occupation', 'string', [
                'limit' => 100,
                'null' => false,
            ])
            ->addColumn('current_company', 'string', [
                'limit' => 100,
                'null' => false,
            ])
            ->addColumn('current_designation', 'string', [
                'limit' => 100,
                'null' => false,
            ])
            ->addColumn('current_facebook', 'string', [
                'limit' => 100,
                'null' => false,
            ])
            ->addColumn('current_linkedin', 'string', [
                'limit' => 100,
                'null' => false,
            ])
            ->addForeignKey('student_id', 'users', 'id', [
                'delete' => 'CASCADE',
                'update' => 'NO_ACTION'
            ])
            ->addForeignKey('pass_out_id', 'pass_outs', 'id', [
                'delete' => 'CASCADE',
                'update' => 'NO_ACTION'
            ])
            ->addTimestamps()
            ->create();
    }
}
