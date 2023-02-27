const express = require('express');
const { userRouter } = require('../routers');

const app = express();

app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/register', userRouter);

module.exports = app;
