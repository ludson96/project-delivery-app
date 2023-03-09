const express = require('express');
const { LoginRouter, ProductRouter, SaleRouter, AdminRouter } = require('../routers');

const accessControl = (_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
  res.header('Access-Control-Allow-Headers', '*');
  next();
};
const { registerRouter } = require('../routers');

const app = express();

app.use(express.json());

app.use(accessControl);

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(express.static('public'));

app.use('/register', registerRouter);

app.use('/login', LoginRouter);

app.use('/products', ProductRouter);

app.use('/sales', SaleRouter);

app.use('/admin', AdminRouter);

module.exports = app;
