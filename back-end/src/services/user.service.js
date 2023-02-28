const { User } = require('../database/models');
const { createToken } = require('../auth/jwtFunctions');

const createUser = async ({ displayname, email, password, role }) => {
  const result = await User.findOne({ where: { email } });
  if (result) return { user: null, token: null };
  const newUser = await User.create({ name: displayname, email, password, role });
  const { password: _password, ...userWithoutPassword } = newUser.dataValues;
  const token = createToken(userWithoutPassword);
  return { user: userWithoutPassword, token };
};

module.exports = {
  createUser,
};