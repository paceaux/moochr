# Overview
Postgres + node stuff inspired/based-on [this tutorial](http://mherman.org/blog/2015/02/12/postgresql-and-nodejs/). Written in ES6 and promisified. 

Architecture based on the [node-postgres-todo](https://github.com/mjhea0/node-postgres-todo)  which is an [express generator](https://expressjs.com/en/starter/generator.html) package.

Vue bits based on [another example](https://codesandbox.io/s/o29j95wx9).
## Architecture

* [PostgreSQL](https://www.postgresql.org/download/)
* Node
* Express
* Vue
* Vuex
* Webpack

## Startup
1. Run `npm install`
2. Run `npm start` (Starts the app)
3. Run `npm run dev` watches web app files and rebuilds them.

There's a `postinstall` command that creates the DB tables for you. It runs when you run `npm install`. You'll want to create a Todo database.
