<?php

namespace Services\Turnstile;

class Turnstile
{
    public static function verify($token): array
    {
        if (empty($token)) {
            return ['error' => 'Please complete the captcha', 'code' => 400];
        }

        $secret = $_ENV['CF_Turnstile_key'] ?? null;
        if (empty($secret)) {
            return ['error' => 'Internal error', 'code' => 500];
        }

        $verifyUrl = $_ENV['CF_Turnstile_url'] ?? null;
        if (empty($verifyUrl)) {
            return ['error' => 'Internal error', 'code' => 500];
        }
        $data = http_build_query([
            'secret' => $secret,
            'response' => $token,
            'remoteip' => $_SERVER['REMOTE_ADDR'] ?? null,
        ]);

        $ch = curl_init($verifyUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/x-www-form-urlencoded']);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 2); // seconds to wait for connection
        curl_setopt($ch, CURLOPT_TIMEOUT, 5); // max seconds for the whole request

        $result = curl_exec($ch);
        $err = curl_error($ch);

        $decoded = json_decode($result, true);
        if ($result === false || $err || !is_array($decoded)) {
            return ['error' => 'We are having trouble sending the message please try again later', 'code' => 502];
        }

        if (empty($decoded['success'])) {
            return ['error' => 'Captcha verification failed', 'code' => 403];
        }

        return ['success' => true];
    }
}