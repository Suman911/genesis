<?php

namespace Api\Repository;

use Db\DbConn\Conn;

class Repository
{
    protected $pdo;

    public function __construct()
    {
        $this->pdo = Conn::setConnection();
    }

    public function startTransaction()
    {
        $this->pdo->beginTransaction();
    }

    public function commitTransaction()
    {
        $this->pdo->commit();
    }

    public function rollbackTransaction()
    {
        $this->pdo->rollBack();
    }

    protected function implode(string $table, array $list): string
    {
        return implode(', ', array_map(fn($f) => "$table.$f", $list));
    }
}