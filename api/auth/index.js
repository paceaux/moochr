const Router = require('koa-router');

const router = new Router({
    prefix: '/api/v1',
});

const create = require('./auth.create.js');
const read = require('./auth.read.js');
const update = require('./auth.update.js');
const del = require('./auth.delete.js');
const login = require('./auth.login.js');
const logout = require('./auth.logout.js');
const status = require('./auth.status.js');


const authApi = {
    create,
    read,
    update,
    delete: del,
};

/* not using any routes added to params.
Don't want to make it any easier than necessary for someone to see what users are available  */
router.post('/auth/newuser', authApi.create.one);
router.post('/auth/user', authApi.read.byJson);
router.post('/auth/users', authApi.read.all);
router.post('/auth/login', login);
router.post('/auth/logout', logout);
router.get('/auth/status', status);
router.put('/auth/user', authApi.update.byJson);
router.delete('/auth/user', authApi.delete.byJson);

module.exports = router;
