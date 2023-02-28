// const { User } = require('../database/models/user.model');
// const { createToken } = require('../auth/jwtFunctions');

// const createUser = async ({ email, password }) => {
//   const result = await User.findOne({ where: { email } });
//   if (result) return { user: null, token: null };
//   const newUser = await User.create({ email, password });
//   const { password: _password, ...userWithoutPassword } = newUser.dataValues;
//   const token = createToken(userWithoutPassword);
//   return { user: userWithoutPassword, token };
// };

// module.exports = {
//   createUser,
// };