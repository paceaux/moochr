const Router = require('koa-router');

const router = new Router({
    prefix: '/api/v1',
});
const create = require('./item.create.js');
const read = require('./item.read.js');
const update = require('./item.update.js');
const del = require('./item.delete.js');

const itemApi = {
    create,
    read,
    update,
    delete: del,
};

router.get('/', (ctx, next) => {
    ctx.header('Content-Type', 'text/html').sendFile('public/index.html');
    next();
});

router.post('/item', itemApi.create.one);
router.get('/item', itemApi.read.all);
router.get('/items', itemApi.read.all);
router.get('/item/:item_id', itemApi.read.byId);
router.put('/item/:item_id', itemApi.update.byId);
router.delete('/item/:item_id', itemApi.delete.byId);

module.exports = router;
