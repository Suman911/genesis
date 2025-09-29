<?php

namespace Api\Utils;

use Api\Http\Request;
use Api\Http\Response;

final class FileHandler
{
    public static function upload(
        Request $request,
        Response $response,
        string $fieldName,
        string $uploadDir,
        array $options = [],
        ?string $oldFile = null
    ): string {
        $files = $request->getFiles();
        if (!isset($files[$fieldName]) || $files[$fieldName]['error'] === UPLOAD_ERR_NO_FILE) {
            return $oldFile;
        }

        $file = $files[$fieldName];

        $maxSize = $options['maxSize'] ?? 2 * 1024 * 1024;
        if ($file['size'] > $maxSize) {
            $response->error(400, "File size must be less than " . ($maxSize / 1024 / 1024) . " MB.");
        }

        $rootPath = realpath(__DIR__ . '/../../../') ?: (__DIR__ . '/../../../');
        $uploadDir = preg_replace('#^/?public/?#', '', $uploadDir);
        $targetDir = rtrim($rootPath, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . ltrim($uploadDir, DIRECTORY_SEPARATOR);
        if (!is_dir($targetDir)) {
            mkdir($targetDir, 0777, true);
        }

        // Delete old file if present
        if ($oldFile && file_exists($rootPath . '/' . ltrim($oldFile, '/'))) {
            unlink($rootPath . '/' . ltrim($oldFile, '/'));
        }

        $title = $options['title'] ?? $file['name'];
        $suffix = $options['suffix'] ?? date('YmdHis');

        $suffix = str_replace([' ', 'T', ':'], '_', $suffix);
        $suffix = preg_replace('/[^0-9_\-]/', '_', $suffix);

        $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
        $safeTitle = preg_replace('/[^a-zA-Z0-9_\-]/', '_', $title);

        $baseName = "{$safeTitle}_{$suffix}";
        $maxBaseLength = 200 - strlen($uploadDir) - strlen($ext) - 2;

        if (strlen($baseName) > $maxBaseLength) {
            $baseName = substr($baseName, 0, $maxBaseLength);
        }

        $filename = "$baseName.$ext";
        $filePath = $targetDir . '/' . $filename;
        $publicPath = rtrim($uploadDir, '/') . '/' . $filename;

        if (strlen($publicPath) > 200) {
            $response->error(400, "File path is too long (must be under 200 characters).");
        }

        if (!move_uploaded_file($file['tmp_name'], $filePath)) {
            $response->error(500, "Failed to save file.");
        }

        return $publicPath;
    }

    public static function remove(?string $oldFile): void
    {
        if (!$oldFile)
            return;

        $rootPath = realpath(__DIR__ . '/../../..') ?: (__DIR__ . '/../../..');
        $filePath = $rootPath . '/' . ltrim($oldFile, '/');

        if (file_exists($filePath)) {
            unlink($filePath);
        }
    }
}
