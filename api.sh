#!/bin/bash

API_DIR="public/api"
PHINX_BIN="vendor/bin/phinx"
PHINX_CONFIG="db/phinx.php"

print_help() {
  echo "Usage: $0 <command> [options]"
  echo ""
  echo "Available commands:"
  echo "  autoload         Run 'composer dump-autoload'"
  echo "  autoload-o       Run 'composer dump-autoload -o' (optimized)"
  echo "  migrate          Run database migrations using Phinx"
  echo "  rollback         Rollback the last Phinx migration batch"
  echo "  rollback-all     Rollback all Phinx migrations (to version 0)"
  echo "  seed             Run database seeders using Phinx"
  echo "  reset-db         Rollback all migrations, migrate, and run seeders"
  echo "  create <name>    Create a new Phinx migration with the specified name"
  echo "  help             Show this help message"
  echo ""
  echo "Example:"
  echo "  $0 create AddUserTable"
  exit 0
}

case "$1" in
  (autoload)
    cd "$API_DIR" && composer dump-autoload
    ;;
  (autoload-o)
    cd "$API_DIR" && composer dump-autoload -o
    ;;
  (migrate)
    cd "$API_DIR" && php "$PHINX_BIN" migrate -c "$PHINX_CONFIG"
    ;;
  (rollback)
    cd "$API_DIR" && php "$PHINX_BIN" rollback -c "$PHINX_CONFIG"
    ;;
  (rollback-all)
    cd "$API_DIR" && php "$PHINX_BIN" rollback -c "$PHINX_CONFIG" -t 0
    ;;
  (seed)
    cd "$API_DIR" && php "$PHINX_BIN" seed:run -c "$PHINX_CONFIG"
    ;;
  (reset-db)
    cd "$API_DIR"
    php "$PHINX_BIN" rollback -c "$PHINX_CONFIG" -t 0
    php "$PHINX_BIN" migrate -c "$PHINX_CONFIG"
    php "$PHINX_BIN" seed:run -c "$PHINX_CONFIG"
    ;;
  (create)
    MIGRATION_NAME="$2"
    if [ -z "$MIGRATION_NAME" ]; then
      echo "Error: Migration name is required."
      echo "Usage: $0 create MigrationName"
      exit 1
    fi
    cd "$API_DIR" && php "$PHINX_BIN" create -c "$PHINX_CONFIG" "$MIGRATION_NAME"
    ;;
  (help|-h|--help)
    print_help
    ;;
  (*)
    echo "Error: Unknown command '$1'"
    print_help
    ;;
esac
