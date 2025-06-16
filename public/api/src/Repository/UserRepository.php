<?php

namespace Api\Repository;

use Auth\DbConn\Conn;
use PDO;

class UserRepository
{
    private PDO $pdo;

    public function __construct()
    {
        $this->pdo = Conn::setConnection();
    }

    public function getAllUsers()
    {
        $stmt = $this->pdo->query("SELECT * FROM users WHERE role != 'admin'");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    public function getAdmins()
    {
        $stmt = $this->pdo->query("SELECT * FROM users WHERE role = 'admin'");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getUserById($id)
    {
        $stmt = $this->pdo->prepare("SELECT * FROM users WHERE id = :id");
        $stmt->execute(['id' => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getUserByEmail($email)
    {
        $stmt = $this->pdo->prepare("SELECT * FROM users WHERE email = :email");
        $stmt->execute(['email' => $email]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function createUser(array $data)
    {
        $stmt = $this->pdo->prepare(
            "INSERT INTO users (name, user_name, email, ph_number, password) VALUES (:name, :user_name, :email, :ph_number, :password)"
        );
        $stmt->execute([
            ':name' => $data['name'],
            ':user_name' => $data['user_name'],
            ':email' => $data['email'],
            ':ph_number' => $data['ph_number'],
            ':password' => $data['password'],
        ]);
        $id = $this->pdo->lastInsertId();
        return $this->findUserById($id);
    }

    public function updateUser($id, array $data)
    {
        $fields = [];
        $params = [':id' => $id];
        foreach ($data as $key => $value) {
            $fields[] = "$key = :$key";
            $params[":$key"] = $value;
        }
        $sql = "UPDATE users SET " . implode(', ', $fields) . " WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        return $this->findUserById($id);
    }

    public function deleteUser($id)
    {
        $stmt = $this->pdo->prepare("DELETE FROM users WHERE id = :id");
        return $stmt->execute(['id' => $id]);
    }

    public function findUserById($id)
    {
        $stmt = $this->pdo->prepare("SELECT * FROM users WHERE id = :id");
        $stmt->execute([':id' => $id]);
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }
}