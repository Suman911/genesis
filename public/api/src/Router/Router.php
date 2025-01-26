<?php

namespace Api\Router;

use Api\Http\Request;
use Api\Http\Response;
use Exception;

class Router
{
    private array $routes = [ // Stores all registered routes
        'GET' => [],
        'POST' => [],
        'PUT' => [],
        'DELETE' => [],
    ];
    private array $routeTrie = []; // Trie data structure for efficient route matching
    private array $globalMiddlewares = []; // Stores global middlewares applied to all routes
    private $notFoundHandler; // Handler for 404 Not Found responses
    private $errorHandler; // Handler for uncaught exceptions

    private Request $request; // The HTTP request object
    private Response $response; // The HTTP response object

    public function __construct()
    {
        $this->request = new Request(); // Initialize the request object
        $this->response = new Response(); // Initialize the response object
    }

    // Set a custom error handler for exceptions
    public function setErrorHandler(callable $handler): self
    {
        $this->errorHandler = $handler;
        return $this;
    }

    // Handle exceptions using the error handler or a default response
    private function handleError(Exception $e)
    {
        if ($this->errorHandler) {
            return call_user_func($this->errorHandler, $e, $this->request, $this->response);
        }

        $this->response->setStatusCode(500)->json(['message' => 'Internal Server Error', 'error' => $e->getMessage()]);
    }

    // Add a new route with optional middlewares
    public function add(string $method, string $path, callable|array $handler, array $middlewares = []): self
    {
        $method = strtoupper($method); // Normalize HTTP method to uppercase
        $this->routes[$method][] = [
            'path' => $path,
            'handler' => $handler,
            'middlewares' => $middlewares,
        ];

        // Add the route to the trie for fast matching
        $this->addToTrie($method, $path, $handler, $middlewares);

        return $this; // Enable method chaining
    }

    // Set a custom handler for 404 Not Found errors
    public function setNotFoundHandler(callable $handler): self
    {
        $this->notFoundHandler = $handler;
        return $this;
    }

    // Add a global middleware to be applied to all routes
    public function addGlobalMiddleware(callable $middleware): self
    {
        $this->globalMiddlewares[] = $middleware;
        return $this;
    }

    // Dispatch the incoming request to the appropriate handler
    public function dispatch()
    {
        try {
            $method = $this->request->getMethod(); // Get the HTTP method
            $uri = $this->request->getUri(); // Get the requested URI

            $params = [];
            $handlerInfo = $this->matchRoute($method, $uri, $params); // Match the route

            if ($handlerInfo) {
                $this->request->setParams($params); // Store dynamic parameters in the request

                // Combine global and route-specific middlewares
                $middlewares = array_merge($this->globalMiddlewares, $handlerInfo['middlewares']);

                // Append the final route handler as the last middleware
                $middlewares[] = function ($request, $response) use ($handlerInfo) {
                    return $this->callHandler($handlerInfo['handler']);
                };

                // Execute the middleware chain
                $this->runMiddlewares($middlewares, $this->request, $this->response);
                return;
            }

            // Handle 404 Not Found
            if ($this->notFoundHandler) {
                http_response_code(404);
                return call_user_func($this->notFoundHandler, $this->request, $this->response);
            }

            $this->response->setStatusCode(404)->send("404 Not Found");
        } catch (Exception $e) {
            $this->handleError($e); // Handle exceptions
        }
    }

    // Executes the middleware chain in sequence
    private function runMiddlewares(array $middlewares, Request $request, Response $response)
    {
        $next = 0; // Tracks the current middleware index

        $middlewareRunner = function ($request, $response, ...$args) use (&$next, $middlewares, &$middlewareRunner) {
            if (isset($middlewares[$next])) {
                $currentMiddleware = $middlewares[$next];
                $next++;

                // Handle class-based middleware with a 'handle' method
                if (is_string($currentMiddleware) && class_exists($currentMiddleware) && method_exists($currentMiddleware, 'handle')) {
                    return call_user_func([$currentMiddleware, 'handle'], $request, $response, $middlewareRunner, ...$args);
                } elseif (is_callable($currentMiddleware)) { // Handle callable middleware
                    return call_user_func($currentMiddleware, $request, $response, $middlewareRunner, ...$args);
                } else {
                    throw new Exception('Invalid middleware: must be a callable or a class with a handle method');
                }
            }
        };

        $middlewareRunner($request, $response);
    }

    // Match a route based on the method and URI, extracting parameters
    private function matchRoute(string $method, string $uri, array &$params): ?array
    {
        $segments = explode('/', trim($uri, '/')); // Split the URI into segments
        $current = $this->routeTrie[$method] ?? null;

        if (!$current) {
            return null; // No matching routes for the method
        }

        $params = [];
        foreach ($segments as $segment) {
            if (isset($current[$segment])) {
                $current = $current[$segment];
            } elseif (isset($current['{param}'])) { // Handle dynamic route parameters
                $params[$current['{param}']['_name']] = $segment;
                $current = $current['{param}'];
            } else {
                return null; // No matching route found
            }
        }

        return $current['_handler'] ?? null;
    }

    // Add a route to the trie for efficient matching
    private function addToTrie(string $method, string $path, callable|array $handler, array $middlewares): void
    {
        $segments = explode('/', trim($path, '/'));
        $current = &$this->routeTrie[$method];

        foreach ($segments as $segment) {
            $current = &$this->getOrCreateTrieNode($current, $segment);
        }

        $current['_handler'] = [
            'handler' => $handler,
            'middlewares' => $middlewares,
        ];
    }

    // Get or create a trie node for a given segment
    private function &getOrCreateTrieNode(array &$current, string $segment): array
    {
        if (preg_match('/^\{(.+?)\}$/', $segment, $matches)) { // Dynamic parameter
            $segment = '{param}';
            if (!isset($current[$segment])) {
                $current[$segment] = ['_name' => $matches[1]];
            }
        } elseif (!isset($current[$segment])) {
            $current[$segment] = [];
        }

        return $current[$segment];
    }

    // Call the handler (controller method or callable)
    private function callHandler(callable|array $handler)
    {
        try {
            if (is_callable($handler)) {
                return call_user_func($handler, $this->request, $this->response);
            }

            if (is_array($handler) && class_exists($handler[0])) { // Handle class-based controllers
                $controller = new $handler[0]();
                if (method_exists($controller, $handler[1])) {
                    return call_user_func([$controller, $handler[1]], $this->request, $this->response);
                }
            }

            throw new Exception('Invalid route handler');
        } catch (Exception $e) {
            return $this->handleError($e); // Handle errors in the handler
        }
    }
}
