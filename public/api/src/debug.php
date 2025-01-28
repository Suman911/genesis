<?php
function debug(...$args)
{
    echo "<pre style='background-color: #f4f4f4; color: #333; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-family: monospace; line-height: 1.5;'>";
    echo "========== DEBUG OUTPUT ==========\n\n";

    foreach ($args as $index => $arg) {
        echo "Argument #$index:\n";
        echo "----------------\n";
        echo "Type: " . gettype($arg) . "\n";
        echo "Value:\n";
        var_dump($arg);
        echo "\n";
    }

    echo "========== END OF DEBUG ==========\n";
    echo "</pre>";
}