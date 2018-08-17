const Router = require('koa-router');

const router = new Router({
    prefix: '/api/v1',
});

const register = require('./register.js');
const del = require('./user.delete.js');
const update = require('./user.update.js');
const login = require('./login.js');

router.post('/register', register);
router.post('/login', login);
router.put('/auth/user/:id', update.byId);
router.delete('/auth/user/:id', del.byId);

module.exports = router;
