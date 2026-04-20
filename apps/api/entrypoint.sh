#!/bin/sh
set -e

# 1. Tối ưu hóa hệ thống
echo "Optimizing Configuration and Routes..."
php artisan package:discover --ansi
php artisan config:cache
php artisan route:cache

# 2. Cache các thành phần khác
echo "Caching Events..."
php artisan event:cache

# 3. Chạy Migration nếu được yêu cầu
if [ "$RUN_MIGRATIONS" = "true" ]; then
    echo "Checking database connection and running migrations..."
    php artisan migrate:fresh --force --seed
fi

# 4. Thực thi lệnh chính (CMD từ Dockerfile)
echo "Application is ready!"
exec "$@"