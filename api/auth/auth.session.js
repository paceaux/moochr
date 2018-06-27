const PgStore = require('koa-pg-session');

const store = new PgStore('postgres://todo:todo@localhost:5432/todo');

function init() {
    return sessionStore.setup();
}

exports.init = init;
exports.store = store;
