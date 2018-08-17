const Router = require('koa-router');

const router = new Router({
    prefix: '/api/v1',
});

const register = require('./register.js');
const deleteuser = require('./user.delete.js');

router.post('/register', register);
router.delete('/auth/deleteuser', deleteuser);

module.exports = router;
