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

    public function json(array $data): void
    {
        $this->addHeader('Content-Type', 'application/json');
        $this->send(json_encode($data));
    }

    public function send(string $body = ''): void
    {
        http_response_code($this->statusCode);

        foreach ($this->headers as $key => $value) {
            header("$key: $value");
        }

        echo $body;
        exit;
    }
}
