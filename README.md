## Description

This is a test example of the Nest JS server for the Impulse team.
The task can be viewed [here](https://impulseteam.notion.site/Node-js-Engineer-cfb8332b00ee499b889b1aec7d5c6bc7).
It is worth noting that the application uses a PostgreSQL database.

## Tech
 - [NestJS] - A progressive Node.js framework for building efficient, reliable and scalable server-side applications.
 - [PostgreSQL] - The World's Most Advanced Open Source Relational Database
 - [Docker] - Toolkit for managing isolated Linux containers.
 - [Swager] - Can help you design and document your APIs at scale.
 - [TypeORM] - TypeORM is an ORM that can run in NodeJS.
 - [ESLint] - statically analyzes your code to quickly find problems. It is built into most text editors and you can run ESLint as part of your continuous integration pipeline.
 - [Prettier] - is an opinionated code formatter. It enforces a consistent style by parsing your code and re-printing it with its own rules that take the maximum line length into account, wrapping code when necessary.

## Installation

```bash
$ npm install
```

## Environment

This section will describe the fields for the .env file an example of it can be found in the repository under the name .env_example

```bash
# database host
DATABASE_HOST=localhost
# database port
DATABASE_PORT=5432
# database user name
DATABASE_USERNAME=test
# database password
DATABASE_PASSWORD=test
# database name
DATABASE_NAME=test
# secret for access token
TOKEN_SECRET = superSecret
```

## Building the app

This section will describe how run build scripts

```bash
$ npm run build
```

## Running the app

This section will describe how run start scripts

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Migrations

This section will describe how run migrations scripts.

```bash
# Automatic migration creation
$ npm run migration:generate --name=MigrationName

# Empty migration creation
$ npm run migration:create --name=MigrationName

# Revert migration
$ npm run migration:revert

# Run migration
$ npm run migration:run
```

## Lint and Format

This section will describe how run lint and format scripts

```bash
# Starts code formatting
$ npm run format

# Starts code lint
$ npm run lint

```

## Docker

Configurations:

- ```version```: This field at the beginning of a Docker Compose file specifies the version of the Compose file format we’re using.

- ```db```: This service sets up a PostgreSQL database using the official ```postgres``` image from Docker Hub. It sets the password for the ```postgres``` user to ```postgres```, creates a named volume ```pgdata``` for storing the database data, and maps the container port ```5432``` to the host port ```5432```. The ```restart: always``` option ensures that the container will automatically restart if it crashes or is stopped.

- ```app```: This service builds a Docker image for the NestJS app using the ```Dockerfile``` in the current directory. It sets the container name to ```nest-docker-postgres```, sets the environment variable ```PORT``` to the value of the host ```PORT``` environment variable, maps the container port ```3000``` to the host port ```3000```, and mounts the ```src``` directory on the host to the ```/app/src``` directory in the container. The depends_on option specifies that this service depends on the ```db``` service, meaning that the ```db``` container will be started before the ```app``` container.

- ```pgadmin```: This service sets up pgAdmin, a web-based PostgreSQL administration tool, using the ```dpage/pgadmin4``` image from Docker Hub. It sets the container name to ```nest-pgadmin4```, sets the default email and password for the pgAdmin login, maps the container port ```80``` to the host port ```5050```, and specifies that this service depends on the ```db``` service.

Build the container

```bash
# Start container building
$ docker compose up
```

[NestJS]: <https://nestjs.com/>
[PostgreSQL]: <https://www.postgresql.org/>
[Swager]: <https://swagger.io/>
[Docker]: <https://www.docker.com/>
[TypeORM]: <https://typeorm.io/>
[ESLint]: <https://eslint.org/>
[Prettier]: <https://prettier.io/>