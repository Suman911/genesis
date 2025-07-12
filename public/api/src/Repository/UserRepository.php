<?php

namespace Api\Repository;

use PDO;

final class UserRepository extends Repository
{
    private string $userFields = "id, name, user_name, email, ph_number, email_verified_at, role";

    public function getAllUsers()
    {
        $stmt = $this->pdo->query("SELECT {$this->userFields} FROM users WHERE role != 'admin'");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getAdmins()
    {
        $stmt = $this->pdo->query("SELECT {$this->userFields} FROM users WHERE role = 'admin'");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getUserById($id)
    {
        $stmt = $this->pdo->prepare("SELECT {$this->userFields} FROM users WHERE id = :id");
        $stmt->execute(['id' => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getUserByEmail($email)
    {
        $stmt = $this->pdo->prepare("SELECT * FROM users WHERE email = :email"); // Keep this for login
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
        // $id = $this->pdo->lastInsertId();
        // return $this->getUserById($id);
        return $this->pdo->lastInsertId();
    }

    public function createStudent(array $data)
    {
        // echo "\nstudent creation data: \n", json_encode($data) , "\n";
        $stmt = $this->pdo->prepare(
            "INSERT INTO students (user_id, college, date_of_admission, subject) VALUES (:user_id, :college, :date_of_admission, :subject)"
        );
        $stmt->execute([
            ':user_id' => $data['user_id'],
            ':college' => $data['college'],
            ':date_of_admission' => $data['date_of_admission'],
            ':subject' => $data['subject'],
        ]);
        return $this->pdo->lastInsertId();
    }

    public function addToBatch(array $data)
    {
        $stmt = $this->pdo->prepare(
            "INSERT INTO student_batches (student_id, sub_batch_id) VALUES (:student_id, :sub_batch_id)"
        );
        $stmt->execute([
            ':student_id' => $data['student_id'],
            ':sub_batch_id' => $data['sub_batch_id'],
        ]);
        return $this->pdo->lastInsertId();
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
        return $this->getUserById($id);
    }

    public function deleteUser($id)
    {
        $stmt = $this->pdo->prepare("DELETE FROM users WHERE id = :id");
        return $stmt->execute(['id' => $id]);
    }
}