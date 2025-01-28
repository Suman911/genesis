<?php
namespace Api\Middleware;

use Api\Http\Request;
use Api\Http\Response;
use PDOException;
use Exception;

class ErrorHandlerMiddleware
{
    public static function handle(Request $request, Response $response, callable $next)
    {
        try {
            // Call the next middleware or the handler
            return $next($request, $response);
        } catch (PDOException $e) {
            // Handle database-specific errors
            $response->setStatusCode(500);
            $response->send([
                'message' => 'Database Error',
                'error' => $_ENV['APP_ENV'] === 'DEV' ? $e->getMessage() : 'A database error occurred.'
            ]);
        } catch (Exception $e) {
            // Handle all other unexpected errors
            $response->setStatusCode(500);
            $response->send([
                'message' => 'Internal Server Error',
                'error' => $_ENV['APP_ENV'] === 'DEV' ? $e->getMessage() : 'Something went wrong.'
            ]);
        }
    }
}
