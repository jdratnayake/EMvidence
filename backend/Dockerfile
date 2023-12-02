# Use Ubuntu as parent image
FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive
ENV COMPOSER_ALLOW_SUPERUSER=1

# Install necessary dependencies
RUN apt-get update && apt-get install -y \
    software-properties-common \
    curl \
    zip \
    unzip \
    git \
    python3 \
    python3-pip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install PHP and related extensions manually
RUN add-apt-repository ppa:ondrej/php && apt-get update && apt-get install -y \
    php8.2 \
    php8.2-mysql \
    php8.2-xml \
    php8.2-curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set working directory
WORKDIR /var/www/html

# Copy Laravel files
COPY . /var/www/html

# Install Composer dependencies
RUN composer install

# Expose port if needed
EXPOSE 80

# Install Python libraries
RUN pip3 install -r requirements.txt

# Increase the maximum upload file size in the apache server
# upload_max_filesize should NOT exceed post_max_size
RUN sed -i 's/post_max_size = .*/post_max_size = 50M/' /etc/php/8.2/apache2/php.ini
RUN sed -i 's/upload_max_filesize = .*/upload_max_filesize = 40M/' /etc/php/8.2/apache2/php.ini 
RUN sed -i 's/post_max_size = .*/post_max_size = 50M/' /etc/php/8.2/cli/php.ini
RUN sed -i 's/upload_max_filesize = .*/upload_max_filesize = 40M/' /etc/php/8.2/cli/php.ini

# Start Laravel server
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=80"]