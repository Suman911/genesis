<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class UserDetail extends AbstractMigration
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
        $table = $this->table('user_details');
        $table
            ->addColumn('user_id', 'integer', [
                'null' => false,
                'signed' => false
            ])
            ->addColumn('photo', 'string', [
                'limit' => 255,
                'null' => false,
            ])
            ->addColumn('address', 'string', [
                'limit' => 255,
                'null' => false,
            ])
            ->addColumn('date_of_birth', 'date', [
                'null' => false,
            ])
            ->addColumn('facebook_profile', 'string', [
                'limit' => 255,
                'null' => false,
            ])
            ->addColumn('guardian_name', 'string', [
                'limit' => 100,
                'null' => false,
            ])
            ->addColumn('guardian_number', 'string', [
                'limit' => 20,
                'null' => false,
            ])
            ->addColumn('college', 'string', [
                'limit' => 255,
                'null' => false,
            ])
            ->addColumn('date_of_admission', 'date', [
                'null' => false,
            ])
            ->addColumn('subject', 'string', [
                'limit' => 100,
                'null' => false,
            ])
            ->addColumn('active', 'boolean', [
                'default' => false,
            ])
            ->addForeignKey('user_id', 'users', 'id', [
                'delete'=> 'CASCADE',
                'update'=> 'NO_ACTION'
            ])
            ->addTimestamps()
            ->create();
    }
}
