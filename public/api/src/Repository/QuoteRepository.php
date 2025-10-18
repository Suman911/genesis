<?php

namespace Api\Repository;

use PDO;

final class QuoteRepository extends Repository
{
    private array $listFields = ['id', 'author', 'quote', 'category', 'created_at'];

    private function orderMap(array $filterOrder): array
    {
        $map = [
            'date' => 'q.created_at'
        ];

        return array_map(function ($f) use ($map) {
            if (is_array($f)) {
                $field = $map[$f[0]] ?? $f[0];
                $dir = $f[1] ? 'ASC' : 'DESC';
                return "$field $dir";
            }
            return $f;
        }, $filterOrder);
    }

    public function listQuery(array $filters = [])
    {
        $params = [];
        $fields = implode(', ', array_map(fn($f) => "q.$f", $this->listFields));
        $conds = [];

        $base_sql = "FROM quotes q";

        if (isset($filters['author']) && $filters['author'] !== '') {
            $conds[] = "q.author LIKE :author";
            $params[':author'] = '%' . $filters['author'] . '%';
        }

        if ($conds) {
            $base_sql .= ' WHERE ' . implode(' AND ', $conds);
        }

        $sql_quotes = "SELECT q.id, q.author, q.quote, q.category, q.created_at
                       $base_sql";

        if (!empty($filters['order_by'])) {
            $order = implode(', ', $this->orderMap($filters['order_by']));
            $sql_quotes .= " ORDER BY $order, q.id DESC";
        } else {
            $sql_quotes .= " ORDER BY q.created_at DESC, q.id DESC";
        }

        if (isset($filters['limit'])) {
            $limit = (int) $filters['limit'];
            $page = max((int) ($filters['page'] ?? 1), 1);
            $offset = ($page - 1) * $limit;
            $sql_quotes .= " LIMIT $limit OFFSET $offset";
        }

        $sql_count = "SELECT COUNT(*) $base_sql";

        return [$sql_quotes, $sql_count, $params];
    }

    public function list(array $filters = []): array
    {
        [$sql_quotes, $sql_count, $params] = $this->listQuery($filters);

        $stmt = $this->pdo->prepare($sql_quotes);
        $stmt->execute($params);
        $quotes = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $stmt = $this->pdo->prepare($sql_count);
        $stmt->execute($params);
        $totalCount = (int) $stmt->fetchColumn();

        return [
            'quotes' => $quotes,
            'total' => $totalCount
        ];
    }

    public function find(int $id): ?array
    {
        $stmt = $this->pdo->prepare("SELECT id, author, quote, category, created_at FROM quotes WHERE id = :id");
        $stmt->execute([':id' => $id]);
        $quote = $stmt->fetch(PDO::FETCH_ASSOC);
        return $quote ?: null;
    }

    public function create(array $data): int
    {
        $sql = "INSERT INTO quotes (author, quote, category, created_at, updated_at)
                VALUES (:author, :quote, :category, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([
            ':author' => $data['author'],
            ':quote' => $data['quote'],
            ':category' => $data['category'] ?? null
        ]);
        return (int) $this->pdo->lastInsertId();
    }

    public function update(int $id, array $data): bool
    {
        $sql = "UPDATE quotes SET author = :author, quote = :quote, category = :category, updated_at = CURRENT_TIMESTAMP WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute([
            ':author' => $data['author'],
            ':quote' => $data['quote'],
            ':category' => $data['category'] ?? null,
            ':id' => $id
        ]);
    }

    public function delete(int $id): bool
    {
        $stmt = $this->pdo->prepare("DELETE FROM quotes WHERE id = :id");
        return $stmt->execute([':id' => $id]);
    }
}