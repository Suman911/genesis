<?php

namespace Api\Middleware;

use Auth\JWT\JWTHandler;
use Api\Http\Request;
use Api\Http\Response;
use Exception;

class AuthMiddleware {
    public static function handle(Request $request, Response $response, $next) {
        // Retrieve JWT from cookies
        $token = $_COOKIE['jwt'] ?? null;

        if ($token) {
            // Validate the token using JWTHandler
            try {
                $payload = JWTHandler::decode($token);  // Assuming you have a JWTHandler that decodes the token

                // Set the payload in the request object
                $request->setJwtPayload((array)$payload);  // Use the method to store the JWT payload

            } catch (Exception $e) {
                // Return an error response if the JWT is invalid or expired
                $response->setStatusCode(403);
                $response->json(['message' => 'Forbidden: ' . $e->getMessage()]);
                return;
            }
        } else {
            // Return an error response if the token is missing
            $response->setStatusCode(401);
            $response->json(['message' => 'Unauthorized']);
            return;
        }

        // Call the next middleware or handler
        return $next($request, $response);
    }
}
