const md5 = require('md5');
const { User } = require('../database/models');
const { createToken } = require('../auth/jwtFunctions');

const login = async ({ email, password }) => {
  const verifyPassword = md5(password);
  const result = await User.findOne({ where: { email, password: verifyPassword } });
  if (!result) return { token: null };
  const { password: _password, ...userWithoutPassword } = result.dataValues;
  const token = createToken(userWithoutPassword);
  return { token };
};

module.exports = {
  login,
};