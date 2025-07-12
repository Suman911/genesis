#!/bin/bash

PHINX_DIR="public/api"
PHINX_BIN="$PHINX_DIR/vendor/bin/phinx"
PHINX_CONFIG="$PHINX_DIR/db/phinx.php"

case "$1" in
  (autoload)
    cd "$PHINX_DIR" && composer dump-autoload
    ;;
  (autoload-o)
    cd "$PHINX_DIR" && composer dump-autoload -o
    ;;
  (migrate)
    cd "$PHINX_DIR" && php vendor/bin/phinx migrate -c db/phinx.php
    ;;
  (rollback)
    cd "$PHINX_DIR" && php vendor/bin/phinx rollback -c db/phinx.php
    ;;
  (rollback-all)
    cd "$PHINX_DIR" && php vendor/bin/phinx rollback -c db/phinx.php -t 0
    ;;
  (seed)
    cd "$PHINX_DIR" && php vendor/bin/phinx seed:run -c db/phinx.php
    ;;
  (db-reset)
    cd "$PHINX_DIR"
    php vendor/bin/phinx rollback -c db/phinx.php -t 0
    php vendor/bin/phinx migrate -c db/phinx.php
    php vendor/bin/phinx seed:run -c db/phinx.php
    ;;
  (create)
    if [ -z "$2" ]; then
      echo "Usage: $0 create MigrationName"
      exit 1
    fi
    cd "$PHINX_DIR" && php vendor/bin/phinx create -c db/phinx.php "$2"
    ;;
  (*)
    echo "Usage: $0 {migrate|rollback|rollback-all|seed|create MigrationName}"
    exit 1
    ;;
esac