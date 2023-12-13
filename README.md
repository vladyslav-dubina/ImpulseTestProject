## Description

This is a test example of the Nest JS server for the Impulse team.
The task can be viewed [here](https://impulseteam.notion.site/Node-js-Engineer-cfb8332b00ee499b889b1aec7d5c6bc7).
It is worth noting that the application uses a PostgreSQL database.

## Tech
 - [NestJS] - A progressive Node.js framework for building efficient, reliable and scalable server-side applications.
 - [PostgreSQL] - The World's Most Advanced Open Source Relational Database
 - [Docker] - Toolkit for managing isolated Linux containers.
 - [Swager] - Can help you design and document your APIs at scale.
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

[NestJS]: <https://nestjs.com/>
[PostgreSQL]: <https://www.postgresql.org/>
[Swager]: <https://swagger.io/>
[Docker]: <https://www.docker.com/>