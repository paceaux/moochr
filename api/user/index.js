const express = require('express');
const router = express.Router();
const userApi = {
  create: require('./user.create.js'),
  read: require('./user.read.js'),
  update: require('./user.update.js'),
  delete: require('./user.delete.js')
};
router.get('/', function(req, res, next) {
  
  res.header('Content-Type', 'text/html').sendFile('public/index.html');
});

router.post('/api/v1/user', userApi.create );
router.get('/api/v1/user', userApi.read);
router.get('/api/v1/user/:user_id', userApi.read);
router.put('/api/v1/user/:user_id', userApi.update);
router.delete('/api/v1/user/:user_id', userApi.delete);

module.exports = router;
