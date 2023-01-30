const express = require('express');
const cors = require('cors');
const app = express();
const user = require('./models/usermodel');
const todo = require('./models/todoModel');
const todorouter = require('./router/TodoRouter');
const registerrouter = require('./router/RiegsterRouter');
const loginrouter = require('./router/loginrouter');
const connectdatabase = require('./config/connectdb');
app.use(express.json());
app.use(cors());

app.use('/todo', todorouter);
app.use('/regsiter', registerrouter);
app.use('/login', loginrouter);
app.get('/welcome', (req, res) => {
  res.send('hello');
});

app.listen(process.env.port, (req, res) => {
  connectdatabase();
  console.log('connected at' + process.env.port);
});
