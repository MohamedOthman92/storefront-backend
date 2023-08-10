# Storefront Backend Project

## Technologies and Pacages used

Postgresql for Database
Pg Admin for ERD design
Express for Server
Typescript
Jasmin for testing

## Layout

The project is a typical ORM where there is a model for each database and a handlers folder where you can find endpoints

## Usage:

the usage is pretty straigt forward the conection is made through local host this should work on any laptop or workstation, all parameters are taklen from URL query or from JSON object in body, used postman application to do so

- Commands to begin the project:

npm i yarn
yarn
yarn add typescript
yarn add pg
yarn add jsonwebtoken
yarn add express
yarn add dotenv
yarn add db-migrate db-migrate-pg
yarn add cors
yarn add body-parser
yarn add bcrypt
yarn add ts-watch --dev
yarn add ts-node --dev
yarn add jasmine-ts --dev
yarn add jasmine-spec-reporter --dev
yarn add jasmine --dev
yarn add @types/pg --dev
yarn add @types/jsonwebtoken --dev
yarn add @types/jasmine --dev
yarn add @types/express --dev
yarn add @types/cors --dev
yarn add @types/bcrypt --dev

- To start server and watch for changes:
  yarn watch

- To start server:
  yarn start

- To start tests
  yarn test

## Setting up database

- Connect to default postgres database as default root user:
  `psql -U postgres`

- Create a new user (store_user):
  `CREATE USER store_user WITH PASSWORD ''store123;`

- Create dev and test databases:
  `CREATE DATABASE music_frontstore;`
  `CREATE DATABASE music_frontstore_test;`

- Connect database and grant privilege to store_user (require password):
  `\c music_storefront`
  `GRANT ALL PRIVILEGES ON DATABASE music_storefront TO store_user;`

`\c music_storefront_test`
`GRANT ALL PRIVILEGES ON DATABASE music_storefront_test TO store_user;`

- Connect to database as store_user:
  `\c music_storefront store_user`

- DATABASE PORT USED: 5432
