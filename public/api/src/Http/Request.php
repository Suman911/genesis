<?php

namespace Api\Http;

class Request
{
    private array $queryParams;
    private array $body;
    private array $headers;
    private string $method;
    private string $uri;
    private array $params;
    private array $files;
    private ?array $jwtPayload; // Added property for JWT payload

    public function __construct()
    {
        $this->queryParams = $_GET;
        $this->body = $_POST ?: json_decode(file_get_contents('php://input'), true) ?? [];
        $this->headers = getallheaders();
        $this->method = $_SERVER['REQUEST_METHOD'];
        $this->uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $this->params = [];
        $this->files = $_FILES;
        $this->jwtPayload = null; // Initialize JWT payload as null
    }

    // Method to add data to body (corrected implementation)
    public function addToBody(array $data): void
    {
        $this->body = array_merge($this->body, $data); // Merge new data into the existing body array
    }

    // Method to set JWT payload
    public function setJwtPayload(array $payload): void
    {
        $this->jwtPayload = $payload; // Store the JWT payload
    }

    // Method to get JWT payload
    public function getJwtPayload(): ?array
    {
        return $this->jwtPayload; // Return the JWT payload
    }

    public function getQueryParams(): array
    {
        return $this->queryParams;
    }

    public function getBody(): array
    {
        return $this->body;
    }

    public function getHeaders(): array
    {
        return $this->headers;
    }

    public function getMethod(): string
    {
        return $this->method;
    }

    public function getUri(): string
    {
        return $this->uri;
    }

    public function getParams(): array
    {
        return $this->params;
    }

    public function setParams(array $params): void
    {
        $this->params = $params;
    }

    public function getFiles(): array
    {
        return $this->files;
    }
}
