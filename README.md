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
3. `npm run local` (Starts the app with supervisor, which will reload js files when they're edited)
4. `npm run dev` (watches web app files and rebuilds them).
5. `npm run test` to test the API. App must be running first

## API
Current api url is `api/v1`

There are three endpoints:
* `category` : categorizaton of items
* `user` : users
* `item` : items that a user owns



### `Using the API`
All three APIs are identical in structure and usage. 

|Endpoint|Verb|Result|
| --- | ---| --- |
`category` | POST | requires a JSON body. will create that category and return the created version
`/category` | GET | Returns all categories|
`/category/:id` | GET | Returns category of that id |
`/categories` | GET | Returns all categories |
`/categories?field=value` | GET |  returns array of all matches
`/category:id` : PUT | needs a JSON body, will update category by id
`/category/:id` : DELETE | Deletes that category. Returns state

