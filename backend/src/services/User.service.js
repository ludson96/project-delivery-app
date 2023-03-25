const md5 = require('md5');
const { SuperService } = require('./SuperService');
const { User } = require('../database/models');
const { createToken } = require('../auth/jwtFunctions');

class USerService extends SuperService {
  constructor() {
    super(User);
  }

  async createUser({ name, email, password, role = 'customer' }) {
    const result = await super.findOne({ email });
    if (result) return { type: 'CONFLICT', payload: { token: null } };
    const validPwd = md5(password);
    const newUser = await super.create({ name, email, password: validPwd, role });
    const { password: _password, ...userWithoutPassword } = newUser;
    const token = createToken(userWithoutPassword);
    return { type: null, payload: { token } };
  }

  async login({ email, password }) {
    const verifyPassword = md5(password);
    const result = await super.findOne({ email, password: verifyPassword });
    if (!result) return { type: 'NOT_FOUND', payload: { token: null } };
    const { password: _password, ...userWithoutPassword } = result;
    const token = createToken(userWithoutPassword);
    return { type: null, payload: { token, user: userWithoutPassword } };
  }

  async getAllUsers() {
    const result = await super.findAll();
    if (!result) return { type: 'NOT_FOUND', payload: result };
    return { type: null, payload: result };
  }
}

module.exports = {
  USerService,
};