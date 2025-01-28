<?php

namespace Api\Repository;

use Auth\DbConn\Conn;
use PDO;

class UserRepository
{
    private $pdo;

    public function __construct()
    {
        $this->pdo = Conn::setConnection();
    }

    public function getAllUsers()
    {
        $stmt = $this->pdo->query("SELECT * FROM userinfo");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getUserById($id)
    {
        $stmt = $this->pdo->prepare("SELECT * FROM users WHERE id = :id");
        $stmt->execute(['id' => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function createUser($data)
    {
        $stmt = $this->pdo->prepare("INSERT INTO users (name, email) VALUES (:name, :email)");
        return $stmt->execute(['name' => $data['name'], 'email' => $data['email']]);
    }

    public function updateUser($id, $data)
    {
        $stmt = $this->pdo->prepare("UPDATE users SET name = :name, email = :email WHERE id = :id");
        return $stmt->execute(['id' => $id, 'name' => $data['name'], 'email' => $data['email']]);
    }

    public function deleteUser($id)
    {
        $stmt = $this->pdo->prepare("DELETE FROM users WHERE id = :id");
        return $stmt->execute(['id' => $id]);
    }
}