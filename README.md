<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Running with Docker (Recommended)

You will need to have Docker and Docker Compose installed on your machine, as well as availability on ports 27017 and 3000.

Finally, there is an .env.example file in the repository for development purposes. Remove the .example extension, leaving only .env.

After that, run the following command at the root of the project:

```bash
$ docker-compose up
```

## Folders architecture

This repository will be organized by context, which means that all functionalities will be separated in the folder architecture based on their function, execution, or purpose of the service. 

- dist : Files generated to prod environment after build process;
- node_modules : all dependencies installed on project (Docker already install it);
- src: Source code
  - example (context)
    - application: Folder containing classes, modulers and controllers of section this app;
    - data: Folder containing classes to manipulate data or implement use cases;
    - domain: Folder containing all domain abstractions as well as their implementation.;
  - infra: Folder containing classes to receive data from external api's, which connect with database, etc.
  - shared: Folder containig shared resource, which means resources used more than one context
- test: Folder to implement all tests - unit and integration when elegible;
<br>
<br>

## First request
Example

```bash
POST localhost:3000/api/email/send
```

Expected response
```bash
{
    "id": "646ceda9cc7ba242a2b79b2c",
    "message": "Comunicação agendada com sucesso"
}
```

## Executing testing within Docker

Once the container is up and running, execute the following command ***within the container application shell***
```bash
yarn test
```

### Coverage
```bash
yarn test:cov
```

***It is strongly recommended that every resource added to this microservice be properly tested - unit and integration when applicable***




## License

Nest is [MIT licensed](LICENSE).
