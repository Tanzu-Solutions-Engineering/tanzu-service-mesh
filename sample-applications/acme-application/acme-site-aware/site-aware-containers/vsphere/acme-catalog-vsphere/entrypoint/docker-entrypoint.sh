#!/bin/sh

echo $CATALOG_DB_HOST
echo $CATALOG_DB_USERNAME
echo $CATALOG_DB_PASSWORD
echo $CATALOG_DB_PORT

echo "Checking if Database is running "

until mongo --host $CATALOG_DB_HOST --port $CATALOG_DB_PORT --username $CATALOG_DB_USERNAME --password=$CATALOG_DB_PASSWORD --authenticationDatabase admin --eval "printjson(db.serverStatus())"; do
  >&2 echo "mongo is unavailable - sleeping" then
  sleep 1
done

echo "Starting Catalog Service "
./catalog
exec "@"
