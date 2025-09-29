<?php
namespace Api\Utils;

use Api\Http\Request;
use Api\Http\Response;
use Throwable;
use PDOException;
use Error;
use Exception;

class ErrorHandler
{
    private bool $isDev;
    private string $logFile;

    public function __construct(?string $logFile = __DIR__ . '/../../logs/error.log')
    {
        $this->isDev = $_ENV['APP_ENV'] === 'DEV';
        $this->logFile = $logFile;
    }

    public function __invoke(Throwable $error, Request $request, Response $response)
    {
        $this->logError($error, $request);

        $message = $this->isDev
            ? $error->getMessage()
            : $this->mapErrorMessage($error);

        $response->error(500, $message);
    }

    private function logError(Throwable $error, Request $request): void
    {
        $errorDetails = [
            'timestamp' => date('Y-m-d H:i:s'),
            'type' => get_class($error),
            'message' => $error->getMessage(),
            'file' => $error->getFile(),
            'line' => $error->getLine(),
            'request' => [
                'method' => $request->getMethod(),
                'uri' => $request->getUri(),
                'query' => $request->getQueryParams(),
                'body' => $this->sanitizeBody($request->getBody()),
            ],
        ];

        $logDir = dirname($this->logFile);
        if (!is_dir($logDir)) {
            mkdir($logDir, 0777, true);
        }

        file_put_contents($this->logFile, json_encode($errorDetails) . PHP_EOL, FILE_APPEND);
    }

    private function sanitizeBody(array $body): array
    {
        // prevent logging sensitive fields like password or tokens
        $sensitive = ['password'];
        foreach ($sensitive as $field) {
            if (isset($body[$field])) {
                $body[$field] = '***';
            }
        }
        return $body;
    }

    private function mapErrorMessage(Throwable $error): string
    {
        return match (true) {
            $error instanceof PDOException => 'A database error occurred.',
            $error instanceof Error => 'A fatal error occurred.',
            $error instanceof Exception => 'Something went wrong.',
            default => 'An unknown error occurred.',
        };
    }
}
