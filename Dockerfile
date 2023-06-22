FROM mariadb:latest

ENV MYSQL_ROOT_PASSWORD=my-secret-pw
ENV MYSQL_DATABASE=mydb

COPY ./mydb.sql /docker-entrypoint-initdb.d/