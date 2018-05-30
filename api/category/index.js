const Router = require('koa-router');

const router = new Router({
    prefix: '/api/v1',
});
const create = require('./category.create.js');
const read = require('./category.read.js');
const update = require('./category.update.js');
const del = require('./category.delete.js');

const categoryApi = {
    create,
    read,
    update,
    delete: del,
};

router.get('/', (ctx, next) => {
    ctx.header('Content-Type', 'text/html').sendFile('public/index.html');
    next();
});

router.post('/category', categoryApi.create.one);
router.get('/categories', categoryApi.read.all);
router.get('/category', categoryApi.read.all);
router.get('/category/:category_id', categoryApi.read.byId);
router.put('/category/:category_id', categoryApi.update.byId);
router.delete('/category/:category_id', categoryApi.delete.byId);

module.exports = router;
