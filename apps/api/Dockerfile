# Build dependencies (Composer)
FROM composer:2 AS vendor
WORKDIR /app
# Copy file cấu hình và cài đặt 
COPY apps/api/composer.json apps/api/composer.lock ./
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist

# Cài đặt môi trường PHP
FROM php:8.3-fpm-alpine AS base

# Cài đặt extension cần thiết
RUN apk add --no-cache \
    libpng-dev libzip-dev zip unzip git postgresql-dev \
    && docker-php-ext-install pdo_pgsql bcmath gd zip

# Copy composer từ image chính thức
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copy source code từ apps/api vào container
COPY apps/api/ .
COPY apps/api/.env.example .env

# Copy vendor
COPY --from=vendor /app/vendor ./vendor

# Chạy dump-autoload để đăng ký các class Laravel
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
RUN composer dump-autoload --optimize --no-dev

# Thiết lập quyền hạn
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Thiết lập entrypoint
COPY apps/api/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Thiết lập Port mặc định 
EXPOSE 10000

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD php artisan serve --host=0.0.0.0 --port=${PORT:-10000}