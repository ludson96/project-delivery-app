const express = require('express');
const { userRouter } = require('./routers/user.router');

const app = express();

app.use(express.json());

app.use('/register', userRouter);

module.exports = app;