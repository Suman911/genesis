<?php

use Dotenv\Dotenv;

$localDotenv = Dotenv::createImmutable(__DIR__, '/../.test.env');
$localDotenv->load();