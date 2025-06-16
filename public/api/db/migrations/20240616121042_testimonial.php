<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class Testimonial extends AbstractMigration
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
        $table = $this->table('testimonials');
        $table
            ->addColumn('user_id', 'integer', [
                'null' => true,
            ])
            ->addColumn('message', 'text', [
                'null' => false,
            ])
            ->addColumn('image', 'string', [
                'limit' => 100,
                'null' => false,
            ])
            ->addColumn('name', 'string', [
                'limit' => 100,
                'null' => false,
            ])
            ->addColumn('is_active', 'boolean', [
                'default' => true,
            ])
            ->addTimestamps()
            ->create();
    }
}
