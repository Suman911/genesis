<?php

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/src/debug.php';
require_once __DIR__ . '/src/dev.php';

use Dotenv\Dotenv;
use Api\Router\Router;
use Api\Controller\Controller;
use Api\Controller\UserController;
use Api\Controller\NoticeController;
use Api\Controller\TestimonialController;
use Api\Controller\BatchController;
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
$router->add('GET', '/users/{id}', [UserController::class, 'fetch'], [AuthMiddleware::class]);
$router->add('POST', '/users', [UserController::class, 'create'], [AuthMiddleware::class]);
$router->add('PUT', '/users/{id}', [UserController::class, 'update'], [AuthMiddleware::class]);
$router->add('PUT', '/users/password/{id}', [UserController::class, 'updatePassword'], [AuthMiddleware::class]);
$router->add('DELETE', '/users/{id}', [UserController::class, 'delete'], [AuthMiddleware::class]);
$router->add('GET', '/admins/me', [UserController::class, 'meAdmin'], [AuthMiddleware::class]);
$router->add('GET', '/admins', [UserController::class, 'getAdmins'], [AuthMiddleware::class]);

// user routes
$router->add('GET', '/users/me', [UserController::class, 'me'], [AuthMiddleware::class]);
$router->add('PUT', '/users/password', [UserController::class, 'updatePassword'], [AuthMiddleware::class]);

// notice routes
$router->add('GET', '/notices', [NoticeController::class, 'index']);
$router->add('GET', '/notices/{id}', [NoticeController::class, 'fetch'], [AuthMiddleware::class]);
$router->add('POST', '/notices', [NoticeController::class, 'create'], [AuthMiddleware::class]);
$router->add('PUT', '/notices/{id}', [NoticeController::class, 'update'], [AuthMiddleware::class]);
$router->add('DELETE', '/notices/{id}', [NoticeController::class, 'delete'], [AuthMiddleware::class]);

// testimonial routes
$router->add('GET', '/testimonials', [TestimonialController::class, 'index']);
$router->add('GET', '/testimonials/{id}', [TestimonialController::class, 'fetch']);
$router->add('POST', '/testimonials', [TestimonialController::class, 'create'], [AuthMiddleware::class]);
$router->add('PUT', '/testimonials/{id}', [TestimonialController::class, 'update'], [AuthMiddleware::class]);
$router->add('DELETE', '/testimonials/{id}', [TestimonialController::class, 'delete'], [AuthMiddleware::class]);

// batch routes
$router->add('GET', '/batches/counts', [BatchController::class, 'counts'], [AuthMiddleware::class]);
$router->add('GET', '/batches/names', [BatchController::class, 'names'], [AuthMiddleware::class]);
$router->add('GET', '/batches', [BatchController::class, 'index'], [AuthMiddleware::class]);
$router->add('PUT', '/batches/{id}', [BatchController::class, 'update'], [AuthMiddleware::class]);
$router->add('DELETE', '/batches/{id}', [BatchController::class, 'delete'], [AuthMiddleware::class]);
$router->add('DELETE', '/batches/sub/{id}', [BatchController::class, 'deleteSubBatch'], [AuthMiddleware::class]);


$router->dispatch();
