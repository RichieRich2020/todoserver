const mongoose = require('mongoose');

const todo = mongoose.model('todo', {
  Task: String,
  status: Boolean,
  Tags: String,
  user_id: String,
});

module.exports = { todo };
