<?php

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/src/debug.php';
require_once __DIR__ . '/src/dev.php';

use Dotenv\Dotenv;
use Api\Router\Router;
use Api\Controller\Controller;
use Api\Controller\UserController;
use Api\Middleware\AuthMiddleware;
use Api\Middleware\ErrorHandlerMiddleware;

// Load the main .env file
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

$router = new Router();

$router->addGlobalMiddleware(ErrorHandlerMiddleware::class);

// Define routes with route-specific middlewares
// $router->add('GET', '/', function ($request, $response) {
//     $response->send(['message' => 'API is working.']);
// });

// Home route
$router->add('GET', '/', [Controller::class, 'index']);

// auth routes
$router->add('POST', '/login', [UserController::class, 'login']);
$router->add('POST', '/logout', [UserController::class, 'logout']);

// admin routes
$router->add('GET', '/users', [UserController::class, 'index'], [AuthMiddleware::class]);
$router->add('GET', '/users/{id}', [UserController::class, 'show'], [AuthMiddleware::class]);
$router->add('POST', '/users', [UserController::class, 'create'], [AuthMiddleware::class]);
$router->add('PUT', '/users/{id}', [UserController::class, 'update'], [AuthMiddleware::class]);
$router->add('DELETE', '/users/{id}', [UserController::class, 'delete'], [AuthMiddleware::class]);
$router->add('PUT', '/users/password/{id}', [UserController::class, 'updatePassword'], [AuthMiddleware::class]);
$router->add('GET', '/admins', [UserController::class, 'getAdmins'], [AuthMiddleware::class]);

// user routes
$router->add('GET', '/users/me', [UserController::class, 'me'], [AuthMiddleware::class]);
$router->add('PUT', '/users/password', [UserController::class, 'updatePassword'], [AuthMiddleware::class]);




$router->dispatch();
