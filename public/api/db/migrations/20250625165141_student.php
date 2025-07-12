<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class Student extends AbstractMigration
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
        $table = $this->table('students');
        $table
            ->addColumn('user_id', 'integer', [
                'null' => false,
                'signed' => false
            ])
            ->addColumn('photo', 'string', [
                'limit' => 255,
            ])
            ->addColumn('address', 'string', [
                'limit' => 255,
            ])
            ->addColumn('date_of_birth', 'date', [])
            ->addColumn('facebook_profile', 'string', [
                'limit' => 255,
            ])
            ->addColumn('guardian_name', 'string', [
                'limit' => 100,
            ])
            ->addColumn('guardian_number', 'string', [
                'limit' => 20,
            ])
            ->addColumn('college', 'string', [
                'limit' => 512,
                'null' => false,
            ])
            ->addColumn('date_of_admission', 'date', [
                'null' => false,
            ])
            ->addColumn('subject', 'string', [
                'limit' => 100,
                'null' => false,
            ])
            ->addColumn('isAlumni', 'boolean', [
                'default' => false,
            ])
            ->addForeignKey('user_id', 'users', 'id', [
                'delete' => 'CASCADE',
                'update' => 'NO_ACTION'
            ])
            ->addTimestamps()
            ->create();
    }
}