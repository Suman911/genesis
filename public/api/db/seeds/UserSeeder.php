<?php

declare(strict_types=1);

use Db\Seeds\Base_Seed;

final class UserSeeder extends Base_Seed
{
    public function run(): void
    {
        if (!$this->isEmpty('users')) {
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
            [
                'name' => 'User One',
                'user_name' => 'user1',
                'email' => 'user1@example.com',
                'ph_number' => '1112223333',
                'password' => password_hash('UserPassword1!', PASSWORD_DEFAULT),
                'email_verified_at' => null,
                'role' => 'user',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'name' => 'User Two',
                'user_name' => 'user2',
                'email' => 'user2@example.com',
                'ph_number' => '4445556666',
                'password' => password_hash('UserPassword2!', PASSWORD_DEFAULT),
                'email_verified_at' => null,
                'role' => 'user',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'name' => 'User Three',
                'user_name' => 'user3',
                'email' => 'user3@example.com',
                'ph_number' => '7778889999',
                'password' => password_hash('UserPassword3!', PASSWORD_DEFAULT),
                'email_verified_at' => null,
                'role' => 'user',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'name' => 'User Four',
                'user_name' => 'user4',
                'email' => 'user4@example.com',
                'ph_number' => '2223334444',
                'password' => password_hash('UserPassword4!', PASSWORD_DEFAULT),
                'email_verified_at' => null,
                'role' => 'user',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'name' => 'User Five',
                'user_name' => 'user5',
                'email' => 'user5@example.com',
                'ph_number' => '5556667777',
                'password' => password_hash('UserPassword5!', PASSWORD_DEFAULT),
                'email_verified_at' => null,
                'role' => 'user',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
        ];
        $this->table('users')->insert($data)->saveData();
    }
}