const jwt = require('jsonwebtoken');
const fs = require('fs').promises;
const path = require('path');

const secretPath = path.resolve(__dirname, '../talker.json');

const getTalker = async () => {
  const contentJSON = await fs.readFile(secretPath);
  const secret = JSON.parse(contentJSON);
  return secret;
}

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '7d',
};

const createToken = (userWithoutPassword) => {
  const token = jwt.sign({ data: userWithoutPassword }, getTalker(), jwtConfig);
  return token;
};

const verifyToken = (authorization) => {
  try {
    const payload = jwt.verify(authorization, getTalker());
    return payload;
  } catch (erro) {
    return { isError: true, erro };
  }
};

module.exports = {
  createToken,
  verifyToken,
};
