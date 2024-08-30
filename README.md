# Autochek API

## Description

This project relies on

- NodeJS >= 18
- Sqlite3
- TypeScript
- TypeOrm

and contails the following Modules

### Auth 
Basic user authentication (Sign up, Sign in). All routes besides the authentication routes requires a Bearer token passed in the Authorization header.

### Vehicle
CRUD endpoints to injest vehicle data.

### Loan
CRUD endpoints for loan application, and checking for loan eligibility.

## API Documentaion
- The API is documented using Swagger and the @Nestje/Swagger library which automatically documents the API. the docs can be visited from ```localhost:3000/api-docs```

## Environment variables 
We manage 2 different environment variables, one for development and another for test
- .env.development
- .env.test

ensure the database names are different. Test database are deleted using the Teardown mechanism.

```bash
SECRET=testecret
DATABASE=test-database.sqlite
NODE_ENV=test
````


## Project setup

```bash
$ yarn install
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests
End to end tests are used to test major components in the system.

```bash

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Test VIN
 ```5FRYD4H66GB592800```


## Resources


## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
