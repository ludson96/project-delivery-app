const express = require('express');
const { userRouter } = require('./routers');

const app = express();

app.use(express.json());

app.use('/user', userRouter);

module.exports = app;