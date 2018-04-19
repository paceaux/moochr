# Overview
A personal inventory app. useful for keeping track of your stuff, and who you loaned it to. 

## Prerequisites

* [PostgreSQL](https://www.postgresql.org/download/)
* [Node](https://nodejs.org/en/)

## Stack

* [Express](https://expressjs.com/)
* [sequelize](http://docs.sequelizejs.com/)
* [Vue](https://vuejs.org/)
* [Vuex](https://vuex.vuejs.org/en/intro.html)
* [Webpack](https://webpack.js.org/)
## Startup
0. Look in the `db.config.js` and either make a postgres db with those params, or change that file to suit your db
1. `npm install` (a postinstall command runs after this that sets up the tables)
2. `npm start` (Starts the app)
3. `npm run dev` (watches web app files and rebuilds them).
4. `npm run test` to test the API. App must be running first

