const mongoose = require('mongoose');

const user = mongoose.model('user', {
  username: String,
  email: String,
  password: String,
});

module.exports = { user };
