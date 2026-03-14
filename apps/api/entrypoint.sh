#!/bin/sh
set -e

# Chạy các lệnh tối ưu hóa khi container đã có đủ biến môi trường
php artisan optimize:clear
php artisan event:cache
php artisan route:cache
php artisan view:cache

# Khởi động PHP-FPM
exec php-fpm