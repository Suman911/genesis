<?php

require_once __DIR__ . '/vendor/autoload.php';

use Api\Router\Router;
use Api\Controller\UserController;
use Api\Middleware\AuthMiddleware;

$router = new Router();

// Define routes with route-specific middlewares
$router->add('GET', '/users', [UserController::class, 'index'], [AuthMiddleware::class]);

$router->add('POST', '/users', [UserController::class, 'store'], [AuthMiddleware::class]);

$router->dispatch();
