<?php

declare(strict_types=1);

use Phinx\Seed\AbstractSeed;

final class UserSeeder extends AbstractSeed
{
    public function run(): void
    {
        $count = $this->fetchRow('SELECT COUNT(*) AS count FROM users')['count'];
        if ($count > 0) {
            return;
        }

        $data = [
            [
                'name' => 'Admin One',
                'user_name' => 'admin1',
                'email' => 'admin1@example.com',
                'ph_number' => '1234567890',
                'password' => password_hash('AdminPassword1!', PASSWORD_DEFAULT),
                'email_verified_at' => date('Y-m-d H:i:s'),
                'role' => 'admin',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'name' => 'Admin Two',
                'user_name' => 'admin2',
                'email' => 'admin2@example.com',
                'ph_number' => '0987654321',
                'password' => password_hash('AdminPassword2!', PASSWORD_DEFAULT),
                'email_verified_at' => date('Y-m-d H:i:s'),
                'role' => 'admin',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
        ];

        $this->table('users')->insert($data)->saveData();
    }
}