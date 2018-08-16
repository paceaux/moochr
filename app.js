const Koa = require('koa');
const Serve = require('koa-static');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const router = new Router();
const app = new Koa();
const path = require('path');

const authCrud = require('./api/auth/index.js');
const categoryCrud = require('./api/category/index.js');
const userCrud = require('./api/user/index.js');
const itemCrud = require('./api/item/index.js');

app
    .use(bodyParser({
        enableTypes: ['json', 'form'],
    }))
    .use(Serve(path.join(__dirname, 'public')))
    .use(router.routes())
    .use(authCrud.routes())
    .use(categoryCrud.routes())
    .use(userCrud.routes())
    .use(itemCrud.routes())
    .use(router.allowedMethods());

module.exports = app;

/*  todo:
  add error handling.
  consider putting API on diff port
*/
