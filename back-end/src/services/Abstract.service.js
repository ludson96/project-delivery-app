const md5 = require('md5');
const { createToken } = require('../auth/jwtFunctions');
const { Product, User } = require('../database/models');

class Service {
  constructor(model) {
    this.model = model;
  }

  async create({ name, email, password, role = 'costumer' }) {
    const result = await this.model.findOne({ where: { email } });
    if (result) return { user: null, token: null };
    const validPwd = md5(password);
    const newUser = await this.model.create({ name, email, password: validPwd, role });
    const { password: _password, ...userWithoutPassword } = newUser.dataValues;
    const token = createToken(userWithoutPassword);
    return { user: userWithoutPassword, token };
  }

  async findAll() {
    const result = await this.model.findAll();
  
    const result2 = result.map((item) => item.dataValues);
  
    return result2;
  }
}

const abc = new Service(Product);
const def = new Service(User);

const oi = async () => {
  const a = await abc.findAll();
  const b = await def.findAll();
  console.log('Produtos');
  console.log(a);
  console.log('User');
  console.log(b);
  return { a, b };
};

oi();