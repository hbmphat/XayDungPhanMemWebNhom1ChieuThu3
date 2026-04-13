#!/bin/sh
set -e

# 1. Xóa toàn bộ cache cũ
echo "Clearing old caches..."
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan event:clear

# 2. Phát hiện package (Cần thiết cho các thư viện mới cài)
php artisan package:discover --ansi

# 3. Chạy Migration và Seed
if [ "$RUN_MIGRATIONS" = "true" ]; then
    echo "Checking database connection and running migrations..."
    
    # Đợi DB sẵn sàng
    sleep 5

    php artisan migrate:fresh --force --seed
fi

# 4. Tối ưu hóa hiệu năng (Chỉ nên chạy ở Production)
if [ "$APP_ENV" = "production" ]; then
    echo "Optimizing for Production..."
    php artisan config:cache
    php artisan route:cache
    php artisan event:cache
    php artisan view:cache
else
    echo "Running in $APP_ENV mode. Skipping optimization cache..."
fi

# 5. Thực thi lệnh chính (CMD từ Dockerfile)
echo "Application is ready!"
exec "$@"