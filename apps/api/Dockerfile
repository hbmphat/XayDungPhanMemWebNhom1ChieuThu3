FROM composer:2 AS vendor
WORKDIR /app
COPY apps/api/composer.json apps/api/composer.lock ./
RUN composer install --no-dev --no-interaction --no-plugins --no-scripts --prefer-dist --no-autoloader

FROM php:8.3-cli-alpine

RUN apk add --no-cache netcat-openbsd

COPY --from=mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/local/bin/
RUN install-php-extensions pdo_pgsql bcmath gd zip intl opcache

WORKDIR /var/www/html

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
COPY --from=vendor /app/vendor ./vendor
COPY apps/api/ .

RUN composer dump-autoload --optimize --no-dev --classmap-authoritative --no-scripts

RUN chmod -R 775 storage bootstrap/cache

COPY apps/api/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 10000

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["sh", "-c", "php artisan serve --host=0.0.0.0 --port=$PORT"]