
const express = require('express');
const Todo = require('../models/Todo');



const router = express.Router();
// Create
router.post('/', async (req, res) => {
  const todo = new Todo(req.body);
  const saved = await todo.save();
  res.json(saved);
});

// Read with Pagination
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const todos = await Todo.find()
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ date: -1 });
  const count = await Todo.countDocuments();
  res.json({ todos, totalPages: Math.ceil(count / limit) });
});

// Read One
router.get('/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  res.json(todo);
});

// Update
router.put('/:id', async (req, res) => {
  const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

//Delete
// Update
router.delete('/:id', async (req, res) => {
  const updated = await Todo.findByIdAndDelete(req.params.id );
  res.json(updated);
});


router.put('/', async (req, res) => {
  
  res.json("Hello to kaise h app log");
});
module.exports = router;