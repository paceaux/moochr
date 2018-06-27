const Koa = require('koa');
const Serve = require('koa-static');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const session = require('koa-generic-session');
const passport = require('koa-passport');
const convert = require('koa-convert');

const router = new Router();
const app = new Koa();
const path = require('path');
const { store } = require('./api/auth/auth.session');

const sessionConfig = {
    cookie: {
        path: '/',
        httpOnly: false,
        maxAge: 24 * 60 * 60 * 1000,
        rewrite: true,
        signed: true,
    },
    key: 'moocherId',
    store,
};

const categoryCrud = require('./api/category/index.js');
const userCrud = require('./api/user/index.js');
const itemCrud = require('./api/item/index.js');
const authCrud = require('./api/auth/index.js');

app.keys = ['moochr'];

app
    .use(bodyParser({
        enableTypes: ['json', 'form'],
    }))
    .use(Serve(path.join(__dirname, 'public')))
    .use(convert(session(sessionConfig)))
    .use(passport.initialize())
    .use(passport.session())
    .use(router.routes())
    .use(categoryCrud.routes())
    .use(userCrud.routes())
    .use(itemCrud.routes())
    .use(authCrud.routes())
    .use(router.allowedMethods());

module.exports = app;

/*  todo:
  add error handling.
  consider putting API on diff port
*/
