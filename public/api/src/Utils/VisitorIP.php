<?php

namespace Api\Utils;

class VisitorIP
{
    public static function get(): string
    {
        $ip = self::extractFromHeaders();
        return self::validate($ip) ? $ip : 'Unknown';
    }

    private static function extractFromHeaders(): ?string
    {
        // Check for Cloudflare CDN specific header
        if (!empty($_SERVER['HTTP_CF_CONNECTING_IP'])) {
            return $_SERVER['HTTP_CF_CONNECTING_IP'];
        }

        // Standard proxy headers
        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            return $_SERVER['HTTP_CLIENT_IP'];
        }

        if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            // X-Forwarded-For may contain a comma-separated list of IPs.
            // The first one is the real client IP.
            $ips = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
            return trim($ips[0]);
        }

        // Direct connection
        if (!empty($_SERVER['REMOTE_ADDR'])) {
            return $_SERVER['REMOTE_ADDR'];
        }

        return null;
    }

    private static function validate(?string $ip): bool
    {
        return filter_var($ip, FILTER_VALIDATE_IP) !== false;
    }
}