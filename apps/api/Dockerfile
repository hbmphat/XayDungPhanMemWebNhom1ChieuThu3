# Stage 1: Build dependencies (Composer)
FROM composer:2 AS vendor
WORKDIR /app
# Copy file cấu hình trước để tận dụng Docker Cache
COPY apps/api/composer.json apps/api/composer.lock ./
# Cài đặt không có source code để tận dụng cache
RUN composer install \
    --no-dev \
    --no-interaction \
    --no-plugins \
    --no-scripts \
    --prefer-dist \
    --no-autoloader
# Stage 2: Final Image
# Cài đặt môi trường PHP
FROM php:8.3-fpm-alpine AS base
# Cài đặt system dependencies và PHP extensions
COPY --from=mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/local/bin/
RUN install-php-extensions pdo_pgsql bcmath gd zip intl
# Copy composer từ image chính thức
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Thiết lập cấu hình Opcache tối ưu cho Production
RUN { \
    echo 'opcache.memory_consumption=128'; \
    echo 'opcache.interned_strings_buffer=8'; \
    echo 'opcache.max_accelerated_files=10000'; \
    echo 'opcache.revalidate_freq=0'; \
    echo 'opcache.enable_cli=1'; \
    } > /usr/local/etc/php/conf.d/opcache-optimized.ini

# Copy vendor và source code vào image
WORKDIR /var/www/html
COPY --from=vendor --chown=www-data:www-data /app/vendor ./vendor
COPY --chown=www-data:www-data apps/api/ .

# Copy file .env.example để làm template
COPY --chown=www-data:www-data apps/api/.env.example .env

# Chạy dump-autoload sau khi đã có source code để ánh xạ đúng các class
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
RUN composer dump-autoload --optimize --no-dev --classmap-authoritative

# Thiết lập quyền hạn
RUN chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Thiết lập entrypoint
COPY apps/api/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Thiết lập deloyment port
EXPOSE 10000

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
# Chạy ứng dụng bằng built-in server của Laravel
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=10000"]