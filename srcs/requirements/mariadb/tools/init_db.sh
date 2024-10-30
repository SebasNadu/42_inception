#!/bin/sh

if [ ! -d "/run/mysqld" ]; then
	mkdir -p /run/mysqld
	chown -R mysql:mysql /run/mysqld
fi

if [ ! -d "/var/lib/mysql" ]; then
	mkdir -p /var/lib/mysql
	chown -R mysql:mysql /var/lib/mysql
fi

if [ ! -d "/var/lib/mysql/mysql" ]; then

	# Initializing the database
	mysql_install_db --basedir=/usr --datadir=/var/lib/mysql --user=mysql --rpm >/dev/null

	file=$(mktemp)
	if [ ! -f "$file" ]; then
		return 1
	fi

	cat <<EOF >"$file"
USE mysql;
FLUSH PRIVILEGES;
DELETE FROM	mysql.user WHERE User='';
DROP DATABASE test;
DELETE FROM mysql.db WHERE Db='test';
DELETE FROM mysql.user WHERE User='root' AND Host NOT IN ('localhost', '127.0.0.1', '::1');
ALTER USER 'root'@'localhost' IDENTIFIED BY '$MYSQL_ROOT_PWD';
CREATE DATABASE \`$WP_DATABASE_NAME\` CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
CREATE USER '$WP_DATABASE_USR'@'%' IDENTIFIED by '$WP_DATABASE_PWD';
GRANT ALL PRIVILEGES ON $WP_DATABASE_NAME.* TO '$WP_DATABASE_USR'@'%';
FLUSH PRIVILEGES;
EOF
	# Creating the environment
	/usr/bin/mysqld --user=mysql --bootstrap <"$file"
	rm -f "$file"
fi

# Allowing network connections
# sed -i "s|skip-networking|# skip-networking|g" /etc/my.cnf.d/mariadb-server.cnf
# sed -i "s|.*bind-address\s*=.*|bind-address=0.0.0.0|g" /etc/my.cnf.d/mariadb-server.cnf

exec /usr/bin/mysqld --user=mysql --console
