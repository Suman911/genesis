<?php

namespace Api\Utils;

class Dumper
{
    private static string $logFile = __DIR__ . '/../../logs/dump.log';

    public static function dump(...$args): void
    {
        $logDir = dirname(self::$logFile);
        if (!is_dir($logDir)) {
            mkdir($logDir, 0777, true);
        }

        // Ensure file exists
        if (!file_exists(self::$logFile)) {
            touch(self::$logFile);
        }

        $output = "==== DUMP at " . date('Y-m-d H:i:s') . " ====" . PHP_EOL;
        foreach ($args as $i => $arg) {
            $output .= "Argument $i:" . PHP_EOL;
            ob_start();
            var_dump($arg);
            $output .= ob_get_clean() . PHP_EOL;
        }
        $output .= str_repeat("=", 40) . PHP_EOL . PHP_EOL;

        file_put_contents(self::$logFile, $output, FILE_APPEND);
    }

    public static function setLogFile(string $path): void
    {
        self::$logFile = $path;
    }
}
