const Router = require('koa-router');

const router = new Router({
    prefix: '/api/v1',
});
const create = require('./user.create.js');
const read = require('./user.read.js');
const update = require('./user.update.js');
const del = require('./user.delete.js');

const userApi = {
    create,
    read,
    update,
    delete: del,
};

router.get('/', (ctx, next) => {
    ctx.header('Content-Type', 'text/html').sendFile('public/index.html');
    next();
});

router.post('/user', userApi.create.one);
router.get('/user', userApi.read.all);
router.get('/users', userApi.read.all);
router.get('/user/:user_id', userApi.read.byId);
router.put('/user/:user_id', userApi.update.byId);
router.delete('/user/:user_id', userApi.delete.byId);

module.exports = router;
