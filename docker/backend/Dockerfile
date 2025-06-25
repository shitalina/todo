FROM php:8.4-fpm

WORKDIR /var/www/html

RUN apt-get update && apt-get install -y \
        libfreetype-dev \
        libjpeg62-turbo-dev \
        libpng-dev \
        git \
        unzip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd pdo_mysql mysqli

COPY --from=composer /usr/bin/composer /usr/bin/composer
# RUN composer install --no-dev --optimize-autoloader

# RUN chown -R /var/www/html/storage /var/www/html/bootstrap/cache 
# RUN chmod -R 755 /var/www/html/bootstrap/cache /var/www/html/storage

EXPOSE 9000
CMD ["php-fpm"]