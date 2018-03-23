const express = require('express');
const router = express.Router();
const todoApi = {
  create: require('./todo.create.js'),
  read: require('./todo.read.js'),
  update: require('./todo.update.js'),
  delete: require('./todo.delete.js')
};

/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.header('Content-Type', 'text/html').sendFile('public/index.html');
});

router.post('/api/v1/todos', todoApi.create );
router.get('/api/v1/todos', todoApi.read);
router.put('/api/v1/todos/:todo_id', todoApi.update);
router.delete('/api/v1/todos/:todo_id', todoApi.delete);

module.exports = router;
