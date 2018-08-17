# Overview
A personal inventory app. useful for keeping track of your stuff, and who you loaned it to. 

## Prerequisites

* [PostgreSQL](https://www.postgresql.org/download/)
* [Node](https://nodejs.org/en/)

## Stack

* [Koa](https://koajs.com/)
* [sequelize](http://docs.sequelizejs.com/)
* [Vue](https://vuejs.org/)
* [Vuex](https://vuex.vuejs.org/en/intro.html)
* [Webpack](https://webpack.js.org/)

## Startup
0. Look in the `db.config.js` and either make a postgres db with those params, or change that file to suit your db
1. Add SSL certificates (the openssl command is in the ssl folder)
2. `npm install` (a postinstall command runs after this that sets up the tables)
3. `npm run test-models` nukes existing tables, and tests that models behave (optional)
4. `npm run local` (Starts the api and server with supervisor, which will reload js files when they're edited)
5. `npm run test` to test the API. App must be running first
6. `npm run dev` (watches web app files and rebuilds them).

## API
Current api url is `api/v1`

There are 6 endpoints
* `register` : registers (creates) a user (future: will login, too)
* `auth` : gets user information
* `login` : authenticates a user (in progress)
* `logout`: logs out a user (in progress)
* `category` : categorizaton of items
* `user` : user data (address, phone, location)
* `item` : items that a user owns

Three apis are identical in structure and usage (user, item, category). In the API below, replace `category` with the singular/plural of the other two endpoints, and you're good to go.

|Endpoint|Verb|Result|
| --- | ---| --- |
`category` | POST | requires a JSON body. will create that category and return the created version
`/category` | GET | Returns array of all categories (needs to be deprecated) |
`/category/:id` | GET | Returns category of that id |
`/categories` | GET | Returns array of categories |
`/categories?field=value` | GET |  returns array of all matches. Search by any field and value. Exact matches, though.
`/category/:id` | PUT | needs a JSON body, returns updated category
`/category/:id` | DELETE | Deletes that category. Returns state

The authorization API is different. Intentionally
|Endpoint|Verb|Result|
| --- | ---| --- |
`register` | POST | Requires a JSON body. will create a user and return the user (returned body doesn't contain password)
`auth/user/:id` | PUT | Requires a JSON body. Will update the user. Can update the email or the password.
`auth/user/:id` | DELETE| Json body optional. send `destroyData: true` to delete all the vestigial data.