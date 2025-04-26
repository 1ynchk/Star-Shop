Установка:

```
git clone https://github.com/1ynchk/Star-Shop
cd Star-Shop
docker-compose up
```

Кастомизация: 

```
services:

    db: 
        ...

    backend:

        ... 

        environment:
        - DB_NAME=starshop-db
        - DB_HOST=db
        - DB_PORT=5432
        - DB_PASSWORD=12345qwerty
        - DB_USER=postgres
        - AWS_ACCESS_KEY_ID=YOUR-KEY
        - AWS_SECRET_ACCESS_KEY=YOUR-KEY
        - AWS_STORAGE_BUCKET_NAME=YOUR-BUCKET
        - AWS_S3_ENDPOINT_URL=YOUR-URL 
```

По умолчанию база данных запускается как отдельный сервис, но при желании ее можно изменить. Также, необходимо указать ключи подключения к S3 хранилищу. 

