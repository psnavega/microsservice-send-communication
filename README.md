<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">

  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm start

# watch mode
$ npm start:dev

# production mode
$ npm start:prod
```

## Test

```bash
# unit tests
$ npm test

# e2e tests
$ npm test:e2e

# test coverage
$ npm test:cov
```

## Running with Docker (Recommended)

You will need to have Docker and Docker Compose installed on your machine, as well as availability on ports 27017 and 3010.

Finally, there is an .env.example file in the repository for development purposes. Remove the .example extension, leaving only .env

If you're running integrated in environment B2B, leave filename as .env.example

After that, run the following command at the root of the project:

Running this script
```bash
$ cp .env.example .env
```

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

## Contribution

- Open a new branch like gitflow. Example: \`feature/what-your-branch-does\`.
- When finished, open a Merge Request (MR) to the \`develop\` branch and handle the card on the Asana/Jira board to advise that you have finished and wait for a reviewer.

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

## Considerations

Ensure that all mandatories envs were set on .env.example when running inside B2B environment, or in .env if you are running on compose inside this repository

Mandatory environments will be below a region in .env.example/.env

To test send emails will be necessary have account on mailtrap, just set authentications on env on the specific field and zenvia key

## Powered

Powered by Vale Saúde



