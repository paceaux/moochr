const Router = require('koa-router');

const router = new Router({
    prefix: '/api/v1',
});

const login = require('./auth.login.js');
const logout = require('./auth.logout.js');
const register = require('./auth.login.js');


const authApi = {
    login,
    logout,
    register,
};

router.post('/auth/login', authApi.login);

module.exports = router;
