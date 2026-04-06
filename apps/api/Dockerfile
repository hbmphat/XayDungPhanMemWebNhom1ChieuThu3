# Stage 1: Build dependencies (Giữ nguyên)
FROM composer:2 AS vendor
WORKDIR /app
COPY apps/api/composer.json apps/api/composer.lock ./
RUN composer install --no-dev --no-interaction --no-plugins --no-scripts --prefer-dist --no-autoloader

# Stage 2: Final Image
FROM php:8.3-fpm-alpine AS base

# Cài đặt các extension cần thiết
COPY --from=mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/local/bin/
RUN install-php-extensions pdo_pgsql bcmath gd zip intl opcache

WORKDIR /var/www/html

# Copy công cụ cần thiết
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Cấu hình Opcache
RUN { \
    echo 'opcache.memory_consumption=128'; \
    echo 'opcache.interned_strings_buffer=8'; \
    echo 'opcache.max_accelerated_files=10000'; \
    echo 'opcache.revalidate_freq=0'; \
    echo 'opcache.enable_cli=1'; \
    } > /usr/local/etc/php/conf.d/opcache-optimized.ini

# Copy Vendor từ Stage 1
COPY --from=vendor --chown=www-data:www-data /app/vendor ./vendor

# Copy Source Code
COPY --chown=www-data:www-data apps/api/ .
COPY --chown=www-data:www-data apps/api/.env.example .env

# Optimize Autoload
RUN composer dump-autoload --optimize --no-dev --classmap-authoritative --no-scripts

# Quyền hạn & Entrypoint
RUN chmod -R 775 storage bootstrap/cache
COPY apps/api/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 10000
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=10000"]