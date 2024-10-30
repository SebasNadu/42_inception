FROM alpine:3.19.4

RUN apk update && apk upgrade && \
	apk add --no-cache php8.4 php8.4-fpm \
	php8.4-cli php8.4-json php8.4-mysqli \
	php8.4-curl php8.4-gd php8.4-xml php8.4-zip \
	mariadb-client sendmail wget tar

COPY conf/php-fpm.conf /etc/php8.4/php-fpm.conf
COPY ./conf/www.conf /etc/php8.4/php-fpm.d/www.conf

COPY conf/index.html /tmp/index.html

RUN wget https://wordpress.org/wordpress-6.6.2.tar.gz -P /var/www

RUN mkdir -p /var/www/html

WORKDIR /var/www/html

RUN chown -R www-data:www-data /var/www/html

RUN tar -xzvf wordpress-6.6.2.tar.gz && \
	rm -rf wordpress-6.6.2.tar.gz

RUN wget --no-check-certificate https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar

RUN chmod +x wp-cli.phar && \
	mv wp-cli.phar /usr/local/bin/wp

EXPOSE 9000

COPY ./tools/auto_config.sh /usr/local/bin/auto_config.sh
RUN chmod +x /usr/local/bin/auto_config.sh

ENTRYPOINT ["/usr/local/bin/auto_config.sh"]
CMD ["php-fpm8.4", "-F", "-R"]
