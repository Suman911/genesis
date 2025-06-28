<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class Notice extends AbstractMigration
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
        $table = $this->table('notices');
        $table
            ->addColumn('title', 'string', [
                'limit' => 100,
                'null' => false,
            ])
            ->addColumn('description', 'text', [
                'null' => false,
            ])
            ->addColumn('document_url', 'string', [
                'limit' => 255,
                'null' => true,
            ])
            ->addColumn('target_timestamp', 'datetime', [
                'null' => false,
            ])
            ->addColumn('expiry_date', 'datetime', [
                'null' => false,
            ])
            ->addColumn('type', 'string', [
                'limit' => 50,
                'null' => true,
            ])
            ->addColumn('is_urgent', 'boolean', [
                'default' => false,
                'null' => false,
            ])
            ->addColumn('tag', 'string', [
                'limit' => 100,
                'null' => true,
            ])
            ->addTimestamps()
            ->create();
    }
}
