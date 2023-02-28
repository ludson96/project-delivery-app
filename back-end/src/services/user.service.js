const { UserModel } = require('../database/models');
const { createToken } = require('../auth/jwtFunctions');

const createUser = async ({ email, password }) => {
  const result = await UserModel.findOne({ where: { email } });
  if (result) return { user: null, token: null };
  const newUser = await UserModel.create({ email, password });
  const { password: _password, ...userWithoutPassword } = newUser.dataValues;
  const token = createToken(userWithoutPassword);
  return { user: userWithoutPassword, token };
};

module.exports = {
  createUser,
};