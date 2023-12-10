#!/bin/bash

# Perform db backups with rotation

TIMESTAMP="$(date +%Y-%m-%d)"

cd "$(dirname "$0")";          

docker exec starcross_mysql_1 sh -c 'exec mysqldump --no-tablespaces -u"$WORDPRESS_DB_USER" -p"$WORDPRESS_DB_PASSWORD" wordpress' > mysql-$TIMESTAMP.sql 
docker exec starcross_postgres_1 sh -c 'exec pg_dump -U"$POSTGRES_USER"' > postgres-$TIMESTAMP.sql


TO_DELETE="$(date -d "$TIMESTAMP - 100 days" +%Y-%m-%d)"  


if [ -f $DESTINATION/$TO_DELETE ]

then
   rm -rf $DESTINATION/$TO_DELETE.sql

fi

