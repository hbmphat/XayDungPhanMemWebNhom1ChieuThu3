#!/bin/sh
set -e

# 1. Dọn dẹp cache cũ để tránh lỗi khi chạy trong môi trường mới
echo "Clearing old caches..."
php artisan cache:clear
php artisan config:clear
php artisan view:clear
php artisan route:clear
php artisan event:clear

# 2. Tối ưu hóa không cần kết nối Database
echo "Optimizing application..."
php artisan view:cache
php artisan route:cache
php artisan event:cache

# 3. Kiểm tra Database có sẵn trước khi chạy migrations
echo "Running migrations..."
php artisan migrate --force
# 4. Khởi động PHP-FPM 
echo "Starting PHP-FPM..."
exec "$@"