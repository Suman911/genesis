<?php

namespace Auth\JWT;

use Exception;
use Firebase\JWT\JWT as FirebaseJWT;
use Firebase\JWT\Key;

class JWT
{
    private static $privateKey = "file://" . __DIR__  . '/../private_key.pem';  // Path to RSA private key
    private static $publicKey = "file://" . __DIR__  . '/../public_key.pem';    // Path to RSA public key
    private static $alg = 'RS256';  // Default algorithm
    private static $exp = 24 * 60 * 60;

    // Encode the JWT with header, payload, and signature
    public static function encode(array $payload, $exp = null)
    {
        if ($exp === null) {
            $exp = self::$exp;
        }
        $payload['exp'] = time() + $exp;  // Expiration time
        $payload['iat'] = time();         // Issued at time
        $payload['nbf'] = time();         // Not before time

        // Load the private key
        $privateKey = file_get_contents(self::$privateKey);
        if (!$privateKey) {
            throw new Exception('Private key not found or invalid');
        }

        // Generate the JWT
        return FirebaseJWT::encode($payload, $privateKey, self::$alg);
    }

    // Decode and verify the JWT
    public static function decode($jwt)
    {
        // Load the public key
        $publicKey = file_get_contents(self::$publicKey);
        if (!$publicKey) {
            throw new Exception('Public key not found or invalid');
        }

        // Decode and verify the JWT
        try {
            return (array) FirebaseJWT::decode($jwt, new Key($publicKey, self::$alg));
        } catch (Exception $e) {
            throw new Exception('Invalid token: ' . $e->getMessage());
        }
    }

    // Refresh the JWT by extending the expiration time
    public static function refresh($jwt, $exp = 86400)
    {
        $payload = self::decode($jwt);

        // Check expiration
        if (!isset($payload['exp']) || time() >= $payload['exp']) {
            throw new Exception('Token is expired, please login again');
        }

        unset($payload['exp']);  // Remove the old expiration time
        return self::encode($payload, $exp);  // Re-encode with a new expiration
    }
}
