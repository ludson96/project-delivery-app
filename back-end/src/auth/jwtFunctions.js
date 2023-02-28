const jwt = require('jsonwebtoken');
const fs = require('fs');

const secret = fs.readFile('jwt.evaluation.key', 'utf8');

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
    return payload;
  } catch (erro) {
    return { isError: true, erro };
  }
};

module.exports = {
  createToken,
  verifyToken,
};
