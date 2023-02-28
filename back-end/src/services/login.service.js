const { User } = require('../database/models');

const login = async ({ email, password }) => {
  const result = await User.findOne({ where: {email, password}});
  if (!result) return { user: null };
  const { dataValues } = result;

  return { user: dataValues };
}

module.exports = {
  login,
};