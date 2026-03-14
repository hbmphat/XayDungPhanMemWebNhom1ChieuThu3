#!/bin/sh
set -e

# 1. Tối ưu hóa không cần kết nối Database
echo "Optimizing application..."
php artisan view:cache
php artisan route:cache
php artisan event:cache

# 2. Kiểm tra Database có sẵn trước khi chạy migrations
if [ "$1" = "php-fpm" ]; then
    echo "Running migrations..."
    php artisan migrate --force || echo "Migration skipped or failed - check DB connection"
fi
# 3. Khởi động PHP-FPM 
echo "Starting PHP-FPM..."
exec "$@"