<?php

use Dotenv\Dotenv;

// Load the .env.local file
$localDotenv = Dotenv::createImmutable(__DIR__, '/../.env.local');
$localDotenv->load();

$frontend_url = $_ENV['FRONTEND_URL'];

// Allow cross-origin requests from your frontend
header("Access-Control-Allow-Origin: $frontend_url");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true'); // Allow cookies with the request

// For preflight requests (OPTIONS method)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header('Access-Control-Max-Age: 86400');  // Cache preflight response for 24 hours
    exit(0);
}

// Detect if request is from browser
$userAgent = $_SERVER['HTTP_USER_AGENT'] ?? '';
$accept = $_SERVER['HTTP_ACCEPT'] ?? '';
$isBrowser = false;

// If it contains "Mozilla" and not API clients
if (stripos($userAgent, 'Mozilla') !== false && stripos($userAgent, 'Postman') === false && stripos($userAgent, 'curl') === false && stripos($userAgent, 'Insomnia') === false) {
    $isBrowser = true;
}

// Sleep if request is from browser
if ($isBrowser) {
    sleep(3);
}
