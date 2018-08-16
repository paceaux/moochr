const Router = require('koa-router');

const router = new Router({
    prefix: '/api/v1',
});

const register = require('./register.js');

router.post('/register', register);

module.exports = router;
