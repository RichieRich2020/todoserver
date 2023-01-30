const express = require('express');
const { user } = require('../models/usermodel');
const jwt = require('jsonwebtoken');
const brcypt = require('bcryptjs');
const loginrouter = express.Router();

loginrouter.get('/user', async (req, res) => {
  return res.send('loginUser');
});
loginrouter.post('/user', async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(req.body, 'sdc');
    let userp = await user.findOne({
      email,
    });

    if (!userp) {
      return res.status(400).send({
        error: 'User with email does not exist',
      });
    }

    if (!brcypt.compareSync(password, userp.password)) {
      return res.status(400).send({
        error: 'Wrong password',
      });
    }

    function generateToken(obj) {
      let token = jwt.sign(obj, 'JWT_SECRET_KEY');
      return token;
    }
    let obj = {
      email: userp.email,
      _id: userp._id,
    };

    const token = generateToken(obj);
    return res.send(token);
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      error: 'Something went wrong',
    });
  }
});

module.exports = loginrouter;
