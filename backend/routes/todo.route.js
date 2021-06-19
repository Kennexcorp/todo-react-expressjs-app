var express = require('express');
var router = express.Router();
const todos = require('../controllers/todo.controller');

router.get('/', todos.findAll);

router.post('/', todos.create);

router.get('/completed', todos.findAllCompleted);

router.get('/:id', todos.find);

router.delete('/:id', todos.delete);

router.put('/:id', todos.update);

// router.delete('/', todos.deleteAll);

module.exports = router;
