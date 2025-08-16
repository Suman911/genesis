<?php

namespace Db\Seeds;

use Phinx\Seed\AbstractSeed;

class Base_Seed extends AbstractSeed
{
    public function isEmpty($tableName): bool
    {
        $count = $this->fetchRow("SELECT COUNT(*) AS count FROM $tableName")['count'];
        return $count === 0;
    }
    public function loadData(string $filePath): array|null
    {
        if (!file_exists($filePath)) {
            return null;
        }

        $data = file_get_contents($filePath);
        return json_decode($data, true);
    }
}