<?php

namespace Api\Middleware;

use Api\Http\Request;
use Api\Http\Response;
use Api\Utils\VisitorIP;

class RateLimiterMiddleware
{
    public static function handle(Request $request, Response $response, $next)
    {
        $limit = 5;            // max requests
        $window = 600;           // window (in seconds, 600 = 10 min)
        $ip = VisitorIP::get();

        // directory for storing counters
        $dir = __DIR__ . "/../../rate_cache";
        if (!is_dir($dir))
            mkdir($dir, 0755, true);

        $file = "$dir/rl_" . md5($ip) . ".txt";

        // read & update counter
        $count = 0;
        $firstTime = time();

        if (file_exists($file)) {
            $data = explode("|", file_get_contents($file));
            $firstTime = (int) ($data[0] ?? time());
            $count = (int) ($data[1] ?? 0);

            if (time() - $firstTime > $window) {
                $firstTime = time();
                $count = 0;
            }
        }

        $count++;

        if ($count > $limit) {
            header("HTTP/1.1 429 Too Many Requests");
            echo json_encode([
                "error" => "Rate limit exceeded. Try again later."
            ]);
            exit;
        }

        file_put_contents($file, $firstTime . "|" . $count);

        // Call the next middleware or handler
        return $next($request, $response);
    }
}
