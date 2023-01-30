const express = require('express');
const jwt = require('jsonwebtoken');
const { todo } = require('../models/todoModel');
const { user } = require('../models/usermodel');

const todorouter = express.Router();

todorouter.get('/create', authenticate, async (req, res) => {
  const userdata = req.userinfo;
  console.count('create');
  const respones = await todo.find({ user_id: userdata._id });
  // console.log(respones);
  return res.send(respones);
});

todorouter.post('/create', authenticate, async (req, res) => {
  let data = req.body;
  const userdata = req.userinfo;
  data = {
    user_id: userdata._id,
    ...data,
  };
  console.log(data);
  const respones = await todo.create({
    ...data,
  });
  return res.send(respones);
});

todorouter.delete('/create/:id', authenticate, async (req, res) => {
  const _id = req.params.id;
  console.log(_id);
  const respones = await todo.findByIdAndDelete(_id);
  return res.send(respones);
});

todorouter.patch('/create/:id', authenticate, async (req, res) => {
  const _id = req.params.id;
  let data = req.body;
  const respones = await todo.findByIdAndUpdate(_id, data);
  return res.send(respones);
});

function authenticate(req, res, next) {
  let authorization = req.headers.authorization;

  let token = authorization && authorization.split(' ').pop();

  jwt.verify(token, 'JWT_SECRET_KEY', async (err, userr) => {
    if (err) {
      // return res.redirect('/')
      return res.send({
        err: err.message,
      });
    } else {
      let existingUser = await user.findOne({ _id: userr._id });
      if (!existingUser) {
        return res.send({
          message: 'User not found',
        });
      }
      // data = {
      //   user_id: userr._id,
      //   ...data,
      // };
      req.userinfo = userr;

      next();
    }
  });
}

module.exports = todorouter;
