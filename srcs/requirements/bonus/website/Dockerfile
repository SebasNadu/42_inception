FROM alpine:3.19

RUN	apk update && apk upgrade && apk add --no-cache nodejs npm

RUN	mkdir -p /home/app

COPY	./requirements/bonus/website/tools /home/app

WORKDIR	/home/app

RUN npm init -y && npm install express -y

CMD ["node", "server.js"]

# RUN	apk update && apk upgrade && apk add --no-cache nginx

# RUN echo "server {" > /etc/nginx/http.d/default.conf && \
# 	echo "root    /var/www;" >> /etc/nginx/http.d/default.conf && \
# 	echo "location / {" >> /etc/nginx/http.d/default.conf && \
# 	echo "    try_files \$uri /index.html;" >> /etc/nginx/http.d/default.conf && \
# 	echo "}}" >> /etc/nginx/http.d/default.conf

# COPY requirements/bonus/website/conf/my_app/dist/* /var/www/

# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
