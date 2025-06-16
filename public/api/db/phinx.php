<?php
require_once __DIR__ . '/../vendor/autoload.php';

use Dotenv\Dotenv;

// Load the .env.local file
$localDotenv = Dotenv::createImmutable(__DIR__, '/../.env.local');
$localDotenv->load();

$host = $_ENV['DB_HOST'];
$dbname = $_ENV['DB_DATABASE'];
$user = $_ENV['DB_USERNAME'];
$pass = $_ENV['DB_PASSWORD'];

echo "$host $dbname $user $pass";

return [
    'paths' => [
        'migrations' => 'db/migrations',
        'seeds' => 'db/seeds',
    ],
    'environments' => [
        'default_migration_table' => 'phinxlog',
        'default_environment' => 'development',
        'development' => [
            'adapter' => 'mysql',
            'host' => $host,
            'name' => $dbname,
            'user' => $user,
            'pass' => $pass,
            'port' => '3306',
            'charset' => 'utf8',
        ],
    ],
];