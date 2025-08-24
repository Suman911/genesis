<?php
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
    sleep(1);
}