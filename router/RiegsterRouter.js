const express = require('express');
const { user } = require('../models/usermodel');
const brcypt = require('bcryptjs');
const registerrouter = express.Router();

registerrouter.get('/user', async (req, res) => {
  return res.send('registerUser');
});
registerrouter.post('/user', async (req, res) => {
  try {
    let { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).send({
        error: 'Incomplete data',
      });
    }

    let useRES = await user.findOne({
      email,
    });

    if (useRES) {
      return res.status(400).send({
        error: 'User with email already exists',
      });
    }

    password = brcypt.hashSync(password);

    await user.create({
      username,
      email,
      signinMethod: 'email-password', // remain
      password,
    });

    return res.send({
      message: 'Registration successful',
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      error: 'Something went wrong',
    });
  }
});

module.exports = registerrouter;
