const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const keyPath = path.join(__dirname, '..', '../jwt.evaluation.key');
const secret = fs.readFileSync(keyPath, 'utf8');

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '7d',
};

const createToken = (userWithoutPassword) => {
  const token = jwt.sign({ data: userWithoutPassword }, secret, jwtConfig);
  return token;
};

const verifyToken = (authorization) => {
  try {
    const payload = jwt.verify(authorization, secret);
    delete payload.data.id;
    return payload.data;
  } catch (erro) {
    return { isError: true, erro };
  }
};

module.exports = {
  createToken,
  verifyToken,
};

// eslint-disable-next-line max-len
const tokenGerado = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjozLCJuYW1lIjoiQ2xpZW50ZSBaw6kgQmlyaXRhIiwiZW1haWwiOiJ6ZWJpcml0YUBlbWFpbC5jb20iLCJyb2xlIjoiY3VzdG9tZXIifSwiaWF0IjoxNjc3NzgxNjU3LCJleHAiOjE2NzgzODY0NTd9.My48teIdwK-PEUkdCgbLi1wYi8R2x6klxMyqaSTpkNI';

// eslint-disable-next-line quotes, max-len
// const tokenTrybe = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTm9tZSBEYSBQZXNzb2EgVXN1w6FyaWEiLCJlbWFpbCI6ImVtYWlsQGRvbWluaW8uY29tIiwicm9sZSI6ImN1c3RvbWVyIn0.s5cmiyY16yViCXkHuzWekxkMeYBi75eT8uJnSbfadNE`;

const abc = verifyToken(tokenGerado);

console.log(abc);
