# grupo-Asado-Familiar-backend

\*\* Primeros pasos

- Correr Yarn install - Instalación dependicias necesarias.

```console
yarn install
```

- Crear archivo .env

```console
DB_USER = "example"
DB_PASSWORD = "example_password"
DB_NAME = "werlin"
DB_HOST = "127.0.0.1"
PORT = "3005"
```

- Puerto postgres start

```console
sudo service postgresql start
```

- Crear usuario (Sin comillas y en minusculas) - usuario de ubuntu

```console
sudo -u postgres createuser --superuser "example"
```

- Asignar contraseña al usuario (Contraseña entre comillas simples)

```console
sudo -u postgres psql
```

```console
ALTER USER "example" WITH PASSWORD 'example_password';
```

- Crear las 3 bases de datos

```console
sudo -u postgres createdb werlin_development
```

```console
sudo -u postgres createdb werlin_production
```

```console
sudo -u postgres createdb werlin_test
```

- Correr psql en localhost

```console
psql -U "example" -d werlin_development -h 127.0.0.1
```

- Creación modelos ejemplo capsulas

```console
npx sequelize-cli model:generate --name Player --atributes nickname:string, email:string, hash_contrasena:string
```

- migracion de datos ejemplo capsulas

```console
npx sequelize-cli db:migrate
```

- rollback migraciones

```console
npx sequelize-cli db:migrate:undo:all
```

- Semillas de las tablas ("nombre modelos")

```console
npx sequelize-cli seed:generate --name seed-"modelos"
```

- Correr las semillas modificadas

```console
npx sequelize-cli db:seed:all
```

- Probar cosas

```console
yarn dev
```
