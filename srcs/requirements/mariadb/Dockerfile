FROM alpine:3.19.4

RUN apk update && apk upgrade && \
	apk add --no-cache mariadb mariadb-client

COPY ./conf/50-server.cnf /etc/mysql/mariadb.conf.d/50-server.cnf

COPY --chmod=0755 ./tools/init_db.sh /usr/local/bin/

EXPOSE 3306

ENTRYPOINT ["/usr/local/bin/init_db.sh"]
