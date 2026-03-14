# Build dependencies (Composer)
FROM composer:2 AS vendor
WORKDIR /app
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

# Copy source code từ apps/api vào container
WORKDIR /var/www/html
COPY apps/api/ .
COPY apps/api/.env.example .env
COPY --from=vendor /app/vendor ./vendor

# Thiết lập entrypoint
COPY apps/api/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Thiết lập quyền hạn
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 9000
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["php-fpm"]