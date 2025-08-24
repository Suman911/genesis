<?php
function log_request($logFile = __DIR__ . '/../logs/request.log', $maxRequests = 1000, $jwtPayload = null) {
    $requestInfo = [
        'query_params' => $_GET,
        'body' => $_POST ?: json_decode(file_get_contents('php://input'), true) ?? [],
        'method' => $_SERVER['REQUEST_METHOD'] ?? null,
        'uri' => isset($_SERVER['REQUEST_URI']) ? parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) : null,
    ];

    // Ensure log directory exists
    $logDir = dirname($logFile);
    if (!is_dir($logDir)) {
        mkdir($logDir, 0777, true);
    }

    // Read existing logs
    $logs = file_exists($logFile) ? file($logFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) : [];

    // Append new log
    $logs[] = json_encode($requestInfo);

    // Keep only last $maxRequests logs
    if (count($logs) > $maxRequests) {
        $logs = array_slice($logs, -$maxRequests);
    }

    // Write back to file
    file_put_contents($logFile, implode(PHP_EOL, $logs) . PHP_EOL);
}
log_request();