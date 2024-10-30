FROM alpine:3.19.4

# Install dependencies
RUN apk update && apk upgrade && apk add --no-cache nginx openssl

RUN mkdir /etc/nginx/ssl && \
	openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:4096 \
	-keyout "${CERTS_KEY}" \
	-out "${CERTS_CRT}" \
	-subj "/C=DE/ST=Berlin/L=Berlin/O=42/OU=johnavar/CN=johnavar.42.fr"

COPY ./conf/default.conf /etc/nginx/http.d/nginx.conf

RUN chmod 755 /var/www/html

RUN chown -R www-data:www-data /var/www/html

RUN nginx -t

EXPOSE 80 443

STOPSIGNAL SIGQUIT

CMD ["nginx", "-g", "daemon off;"]
