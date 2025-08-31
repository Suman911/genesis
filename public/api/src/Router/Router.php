<?php
namespace Api\Router;

use Api\Http\Request;
use Api\Http\Response;
use Exception;

class Router
{
    private array $routeTrie = []; // Trie structure to store routes
    private array $globalMiddlewares = []; // Global middlewares for all routes
    private $notFoundHandler; // Handler for 404 Not Found
    private $errorHandler; // Custom error handler
    private Request $request; // HTTP request object
    private Response $response; // HTTP response object
    private string $cacheFile; // File path for route trie cache

    public function __construct()
    {
        $this->request = new Request();
        $this->response = new Response();
        $this->cacheFile = __DIR__ . '/routeTrie.cache.php';

        // In production, load the route trie from the cache
        if ($_ENV['APP_ENV'] === 'PROD') {
            $this->loadRouteTrie();
        }
    }

    /**
     * Set a custom error handler.
     */
    public function setErrorHandler(callable $handler): self
    {
        $this->errorHandler = $handler;
        return $this;
    }

    /**
     * Handle any errors during route dispatching.
     */
    private function handleError(Exception $e)
    {
        if ($this->errorHandler) {
            return call_user_func($this->errorHandler, $e, $this->request, $this->response);
        }

        $this->response->error(500, 'Error: ' . $e->getMessage());
    }

    /**
     * Add a route to the router in the development environment.
     */
    public function add(string $method, string $path, callable|array $handler, array $middlewares = []): self
    {
        if ($_ENV['APP_ENV'] === 'DEV') {
            $method = strtoupper($method);
            $this->addToTrie($method, $path, $handler, $middlewares);
            $this->saveRouteTrie();
        }

        return $this;
    }

    /**
     * Set a handler for 404 Not Found errors.
     */
    public function setNotFoundHandler(callable|string $handler): self
    {
        $this->notFoundHandler = $handler;
        return $this;
    }

    /**
     * Add a global middleware to be executed for all routes.
     */
    public function addGlobalMiddleware(callable|string $middleware): self
    {
        $this->globalMiddlewares[] = $middleware;
        return $this;
    }

    /**
     * Dispatch the current request to the appropriate route handler.
     */
    public function dispatch()
    {
        try {
            $method = $this->request->getMethod();
            $uri = $this->request->getUri();

            // Remove base path from the URI if it exists
            $basePath = $_ENV['API_Root'];
            if (strpos($uri, $basePath) === 0) {
                $uri = substr($uri, strlen($basePath));
            }

            $params = [];
            $handlerInfo = $this->matchRoute($method, $uri, $params);

            if ($handlerInfo) {
                $this->request->setParams($params);

                $middlewares = array_merge($this->globalMiddlewares, $handlerInfo['middlewares']);
                $middlewares[] = function ($request, $response) use ($handlerInfo) {
                    return $this->callHandler($handlerInfo['handler']);
                };

                $this->runMiddlewares($middlewares, $this->request, $this->response);
                return;
            }

            // If no route matches, call the 404 handler or send a default 404 response
            if ($this->notFoundHandler) {
                http_response_code(404);
                return call_user_func($this->notFoundHandler, $this->request, $this->response);
            }

            $this->response->error(404, 'Error: 404 Not Found: No route matches');
        } catch (Exception $e) {
            $this->handleError($e);
        }
    }

    /**
     * Execute the middlewares sequentially.
     */
    private function runMiddlewares(array $middlewares, Request $request, Response $response)
    {
        $next = 0;

        $middlewareRunner = function ($request, $response, ...$args) use (&$next, $middlewares, &$middlewareRunner) {
            if (isset($middlewares[$next])) {
                $currentMiddleware = $middlewares[$next];
                $next++;

                if (is_string($currentMiddleware) && class_exists($currentMiddleware) && method_exists($currentMiddleware, 'handle')) {
                    return call_user_func([$currentMiddleware, 'handle'], $request, $response, $middlewareRunner, ...$args);
                } elseif (is_callable($currentMiddleware)) {
                    return call_user_func($currentMiddleware, $request, $response, $middlewareRunner, ...$args);
                } else {
                    throw new Exception('Invalid middleware: must be a callable or a class with a handle method');
                }
            }
        };

        $middlewareRunner($request, $response);
    }

    /**
     * Match a route to the current request and return handler information.
     */
    private function matchRoute(string $method, string $uri, array &$params): ?array
    {
        $segments = explode('/', trim($uri, '/'));
        $current = $this->routeTrie[$method] ?? null;

        if (!$current) {
            return null;
        }

        $params = [];
        foreach ($segments as $segment) {
            if (isset($current[$segment])) {
                $current = $current[$segment];
            } elseif (isset($current['{param}'])) {
                $params[$current['{param}']['_name']] = $segment;
                $current = $current['{param}'];
            } else {
                return null;
            }
        }

        return $current['_handler'] ?? null;
    }

    /**
     * Add a route to the trie structure.
     */
    private function addToTrie(string $method, string $path, callable|array $handler, array $middlewares): void
    {
        if (!isset($this->routeTrie[$method])) {
            $this->routeTrie[$method] = [];
        }

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

    /**
     * Create or retrieve a node in the trie for a given segment.
     */
    private function &getOrCreateTrieNode(array &$current, string $segment): array
    {
        if (preg_match('/^\{(.+?)\}$/', $segment, $matches)) {
            $segment = '{param}';
            if (!isset($current[$segment])) {
                $current[$segment] = ['_name' => $matches[1]];
            }
        } elseif (!isset($current[$segment])) {
            $current[$segment] = [];
        }

        return $current[$segment];
    }

    /**
     * Call the handler for the matched route.
     */
    private function callHandler(callable|array $handler)
    {
        try {
            if (is_callable($handler)) {
                return call_user_func($handler, $this->request, $this->response);
            }

            if (is_array($handler) && class_exists($handler[0])) {
                $controller = new $handler[0]();
                if (method_exists($controller, $handler[1])) {
                    return call_user_func([$controller, $handler[1]], $this->request, $this->response);
                }
            }

            throw new Exception('Invalid route handler');
        } catch (Exception $e) {
            return $this->handleError($e);
        }
    }

    /**
     * Save the current route trie to a cache file.
     */
    private function saveRouteTrie(): void
    {
        file_put_contents($this->cacheFile, '<?php return ' . var_export($this->routeTrie, true) . ';');
    }

    /**
     * Load the route trie from the cache file in production.
     */
    private function loadRouteTrie(): void
    {
        if (file_exists($this->cacheFile)) {
            $this->routeTrie = require $this->cacheFile;
        } else {
            throw new Exception("Route cache file not found in production environment");
        }
    }
}
