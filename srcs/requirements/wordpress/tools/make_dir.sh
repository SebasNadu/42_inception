#!/bin/sh

if [ ! -d "/home/${USER}/data" ]; then
    mkdir ~/data/
fi

if [ ! -d "/home/${USER}/data/mariadb" ]; then
    mkdir ~/data/mariadb/
fi

if [ ! -d "/home/${USER}/data/wordpress" ]; then
    mkdir ~/data/wordpress/
fi
