const md5 = require('md5');
const { SuperClass } = require('./SuperClass.service');
const { User } = require('../database/models');
const { createToken } = require('../auth/jwtFunctions');

class USerService extends SuperClass {
  constructor() {
    super(User);
  }

  async createUser({ name, email, password, role = 'customer' }) {
    const result = await super.findOne({ email });
    if (result) return { user: null, token: null };
    const validPwd = md5(password);
    const newUser = await super.create({ name, email, password: validPwd, role });
    const { password: _password, ...userWithoutPassword } = newUser;
    const token = createToken(userWithoutPassword);
    return { user: userWithoutPassword, token };
  }

  async login({ email, password }) {
    const verifyPassword = md5(password);
    const result = await super.findOne({ email, password: verifyPassword });
    if (!result) return { token: null };
    const { password: _password, ...userWithoutPassword } = result.dataValues;
    const token = createToken(userWithoutPassword);
    return { token };
  }
}

const user = new USerService();

const oi = async () => {
  // const a = await user.createUser({ 
  //   name: 'abcdef', email: 'abcdefdfgsadsdad@def.com', password: 'oioioi',
  // });

  const b = await user.login({
    email: 'zebirita@email.com', password: '$#zebirita#$',
  });

  const obj = { b };

  console.log(obj);

  return obj;
};

oi();

module.exports = {
  USerService,
};