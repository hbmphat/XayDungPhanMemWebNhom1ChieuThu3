#!/bin/sh
set -e

echo "Starting Laravel container..."

if [ "$APP_ENV" != "production" ]; then
  php artisan config:clear
  php artisan route:clear
  php artisan view:clear
  php artisan event:clear
fi

if [ -n "$DB_HOST" ]; then
  echo "Waiting for database..."
  until nc -z "$DB_HOST" "${DB_PORT:-3306}"; do
    sleep 1
  done
fi

if [ "$RUN_MIGRATIONS" = "true" ]; then
  php artisan migrate:fresh --force || true
fi

if [ "$RUN_SEED" = "true" ]; then
  php artisan db:seed --force
fi

if [ "$APP_ENV" = "production" ]; then
  php artisan config:cache
  php artisan route:cache
  php artisan event:cache
fi

echo "Application is ready!"
exec "$@"