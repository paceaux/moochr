const express = require('express');
const router = express.Router();
const itemApi = {
  create: require('./item.create.js'),
  read: require('./item.read.js'),
  update: require('./item.update.js'),
  delete: require('./item.delete.js')
};
router.get('/', function(req, res, next) {

  res.header('Content-Type', 'text/html').sendFile('public/index.html');
});

router.post('/api/v1/item', itemApi.create );
router.get('/api/v1/item', itemApi.read);
router.get('/api/v1/item/:item_id', itemApi.read);
router.put('/api/v1/item/:item_id', itemApi.update);
router.delete('/api/v1/item/:item_id', itemApi.delete);

module.exports = router;
