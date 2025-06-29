<?php
namespace Api\Middleware;

use Api\Http\Request;
use Api\Http\Response;
use PDOException;
use Exception;
use Error;

class ErrorHandlerMiddleware
{

    public static function handle(Request $request, Response $response, callable $next)
    {
        $isDev = $_ENV['APP_ENV'] === 'DEV';
        try {
            // Call the next middleware or the handler
            return $next($request, $response);
        } catch (PDOException $e) {
            // Handle database-specific errors
            $response->error(500, $isDev ? $e->getMessage() : 'A database error occurred.');
        } catch (Exception $e) {
            // Handle all other unexpected errors
            $response->error(500, $isDev ? $e->getMessage() : 'Something went wrong.');
        } catch (Error $e) {
            // Catch fatal errors like missing classes, undefined functions, etc.
            $response->error(500, $isDev ? $e->getMessage() : 'A fatal error occurred.');
        }
    }
}
