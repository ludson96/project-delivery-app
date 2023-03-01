const express = require('express');
const { registerRouter } = require('../routers');

const app = express();

app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/register', registerRouter);

module.exports = app;
