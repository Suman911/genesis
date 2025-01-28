<?php

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/src/debug.php';

use Dotenv\Dotenv;

// Load the .env.local file
// $localDotenv = Dotenv::createImmutable(__DIR__, '.env.local');
// $localDotenv->load();

// Load the main .env file
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();


use Api\Router\Router;
use Api\Controller\UserController;
use Api\Middleware\AuthMiddleware;
use Api\Middleware\ErrorHandlerMiddleware;

$router = new Router();

$router->addGlobalMiddleware(ErrorHandlerMiddleware::class);

// Define routes with route-specific middlewares
$router->add('GET', '/', function ($request, $response) {
    $response->send(['message' => 'API is working.']);
});
$router->add('GET', '/users/{id}/{post}', [UserController::class, 'index'], [AuthMiddleware::class]);
$router->add('POST', '/users', [UserController::class, 'store'], [AuthMiddleware::class]);
$router->add('GET', '/params/{a}/{b}/c/{d}', [UserController::class, 'params']);

$router->dispatch();
