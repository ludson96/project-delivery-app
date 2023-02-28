const md5 = require('md5');
const { User } = require('../database/models');
const { createToken } = require('../auth/jwtFunctions');
 
const createUser = async ({ name, email, password, role }) => {
  const result = await User.findOne({ where: { email } });
  console.log('Eu sou result: ', result);
  if (result) return { user: null, token: null };
  const validPwd = md5(password);
  const newUser = await User.create({ name, email, password: validPwd, role });
  const { password: _password, ...userWithoutPassword } = newUser.dataValues;
  const token = createToken(userWithoutPassword);
  return { user: userWithoutPassword, token };
};

module.exports = {
  createUser,
};