# Use PHP official image
FROM php:8.2

ENV COMPOSER_ALLOW_SUPERUSER 1

# Install necessary dependencies
RUN apt-get update && apt-get install -y \
    zip \
    unzip \
    git \
    python3 \
    python3-pip \
    python3-venv
    # Add any other required dependencies

# RUN python3 -m venv /venv
# RUN /venv/bin/pip install --no-cache-dir tensorflow

# Set working directory
WORKDIR /var/www/html

# Copy Laravel files
COPY . /var/www/html

# Install Composer dependencies
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install

# RUN pip3 install --no-cache-dir -r requirements.txt

# Expose port if needed
EXPOSE 80

RUN apt upgrade -y  \
    python3-numpy \
    python3-scipy \
    python3-sklearn \
    python3-pandas \
    python3-h5py

# RUN pip3 install --no-cache-dir \
#     tensorflow

# Start Laravel server
# CMD ["ls", ">", "result.txt"]
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=80"]
# CMD cd ./backend && php artisan serve --host=0.0.0.0 --port=80