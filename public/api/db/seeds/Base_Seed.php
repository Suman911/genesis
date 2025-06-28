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
}