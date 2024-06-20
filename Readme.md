Archivo .env

```
### APP URLS
APP_URL_MAIN=http://localhost:3001
APP_URL_LOGIN=http://localhost:3002
APP_URL_SENSOR=http://localhost:3003
APP_URL_PAYMENT=http://localhost:3004

### MYSQL - Main
MYSQL_DATABASE=MainDb
MYSQL_ROOT_PASSWORD=secret
MYSQL_ROOT_USER=root
MYSQL_HOST=localhost
MYSQL_DIALECT=mysql
MYSQL_SYNC=true
MYSQL_PORT=3306

### MYSQL - Login
LOGIN_DATABASE=LoginDb
LOGIN_ROOT_PASSWORD=secret
LOGIN_ROOT_USER=root
LOGIN_HOST=localhost
LOGIN_DIALECT=mysql
LOGIN_SYNC=true
LOGIN_PORT=3307

### MONGO
MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=secret
MONGO_PORT=27017
MONGO_URI=mongodb://root:secret@localhost:27017/Sensors?authSource=admin

### REDIS
REDIS_PORT=6379

### RABBITMQ
RABBITMQ_DEFAULT_USER=user
RABBITMQ_DEFAULT_PASS=password
RABBITMQ_STANDARD_PORT=5672
RABBITMQ_INTERFACE_PORT=15672

### PAYMENT
PAYMENT_TIMEOUT_MINUTES=1

### EMAIL
EMAIL_USER=inmo.2024@outlook.com
EMAIL_PASS=1234.Inmo

### MAIN - VARIABLES
DAYS_ALLOWED_TO_CANCEL_BOOKING=20
REFUND_PERCENTAGE=40
```

```
docker-compose up -d
```

Ejecución del proyecto con pm2
```
pm2 start ecosystem.config.js
```

Ejecución del proyecto con nodemon (desarrollo, en cada servicio)
```
npm run dev
```

Seeds de la db de users
```
npm run seed
```
