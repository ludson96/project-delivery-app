const express = require('express');
const { userRouter, LoginRouter, ProductRouter } = require('../routers');

const accessControl = (_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
  res.header('Access-Control-Allow-Headers', '*');
  next();
};

const app = express();

app.use(express.json());

app.use(accessControl);

app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/register', userRouter);

app.use('/login', LoginRouter);

app.use('/products', ProductRouter);

module.exports = app;
