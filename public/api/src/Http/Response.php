<?php

namespace Api\Http;

class Response
{
    private int $statusCode = 200;
    private array $headers = [];
    private mixed $body;

    public function setStatusCode(int $statusCode): self
    {
        $this->statusCode = $statusCode;
        return $this;
    }

    public function addHeader(string $key, string $value): self
    {
        $this->headers[$key] = $value;
        return $this;
    }

    public function send(array $data): void
    {
        $this->addHeader('Content-Type', 'application/json');
        http_response_code($this->statusCode);

        foreach ($this->headers as $key => $value) {
            header("$key: $value");
        }

        echo json_encode($data);
        exit;
    }

    public function error(int $statusCode = 400, string $message = ''): void
    {
        $this->setStatusCode($statusCode)->send([
            'message' => $message
        ]);
    }
}
