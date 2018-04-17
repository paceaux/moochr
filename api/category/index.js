const express = require('express');
const router = express.Router();
const categoryApi = {
  create: require('./category.create.js'),
  read: require('./category.read.js'),
  update: require('./category.update.js'),
  delete: require('./category.delete.js')
};
router.get('/', function(req, res, next) {

  res.header('Content-Type', 'text/html').sendFile('public/index.html');
});

router.post('/api/v1/category', categoryApi.create );
router.get('/api/v1/category', categoryApi.read);
router.get('/api/v1/category/:category_id', categoryApi.read);
router.put('/api/v1/category/:category_id', categoryApi.update);
router.delete('/api/v1/category/:category_id', categoryApi.delete);

module.exports = router;
