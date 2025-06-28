<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class User extends AbstractMigration
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
        $table = $this->table('users');
        $table
            ->addColumn('name', 'string', [
                'limit' => 100,
                'null' => false,
            ])
            ->addColumn('user_name', 'string', [
                'limit' => 100,
                'null' => true,
            ])
            ->addColumn('email', 'string', [
                'limit' => 150,
                'null' => false,
            ])
            ->addColumn('ph_number', 'string', [
                'limit' => 20,
                'null' => false,
            ])
            ->addColumn('password', 'string', [
                'limit' => 255,
                'null' => false,
            ])
            ->addColumn('email_verified_at', 'datetime', [
                'default' => null,
            ])
            ->addColumn('role', 'enum', [
                'values' => ['user', 'alumni', 'admin'],
                'null' => false,
                'default' => 'user',
            ])
            ->addTimestamps()
            ->addIndex(['email'], [
                'unique' => true,
                'name' => 'idx_users_email_unique',
            ])
            ->create();
    }
}
