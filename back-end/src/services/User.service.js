const md5 = require('md5');
const { SuperClass } = require('./SuperClass.service');
const { User } = require('../database/models');
const { createToken } = require('../auth/jwtFunctions');

class USerService extends SuperClass {
  constructor() {
    super(User);
  }

  async create({ name, email, password, role = 'costumer' }) {
    const result = await super.findOne({ email });
    if (result) return { user: null, token: null };
    const validPwd = md5(password);
    const newUser = await super.create({ name, email, password: validPwd, role });
    const { password: _password, ...userWithoutPassword } = newUser;
    const token = createToken(userWithoutPassword);
    return { user: userWithoutPassword, token };
  }
}

const user = new USerService();

const oi = async () => {
  const a = await user.create({ 
    name: 'abcdef', email: 'abcdefdfgsadsdad@def.com', password: 'oioioi',
  });

  const obj = { a };

  console.log(obj);

  return obj;
};

oi();

module.exports = {
  USerService,
};