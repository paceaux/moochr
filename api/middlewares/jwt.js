const koaJwt = require('koa-jwt');

module.exports = koaJwt({
    secret: process.env.secret || 'm00ch3r', // TODO: DO NOT HARDCODE
});
