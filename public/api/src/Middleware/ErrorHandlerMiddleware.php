<?php
namespace Api\Middleware;

use Api\Http\Request;
use Api\Http\Response;
use PDOException;
use Exception;
use Error;

// Add this function to log errors
function log_error($error, $logFile = __DIR__ . '/../../logs/error.log')
{
    $errorDetails = [
        'timestamp' => date('Y-m-d H:i:s'),
        'type' => get_class($error),
        'message' => $error->getMessage(),
        'file' => $error->getFile(),
        'line' => $error->getLine(),
    ];
    $logDir = dirname($logFile);
    if (!is_dir($logDir)) {
        mkdir($logDir, 0777, true);
    }
    file_put_contents($logFile, json_encode($errorDetails) . PHP_EOL, FILE_APPEND);
}

class ErrorHandlerMiddleware
{
    public static function handle(Request $request, Response $response, callable $next)
    {
        $isDev = $_ENV['APP_ENV'] === 'DEV';
        try {
            // Call the next middleware or the handler
            return $next($request, $response);
        } catch (PDOException $e) {
            log_error($e); // Log error
            $response->error(500, $isDev ? $e->getMessage() : 'A database error occurred.');
        } catch (Exception $e) {
            log_error($e); // Log error
            $response->error(500, $isDev ? $e->getMessage() : 'Something went wrong.');
        } catch (Error $e) {
            log_error($e); // Log error
            $response->error(500, $isDev ? $e->getMessage() : 'A fatal error occurred.');
        }
    }
}