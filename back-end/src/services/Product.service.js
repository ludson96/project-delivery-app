const { SuperClass } = require('./SuperClass.service');
const { Product } = require('../database/models');

class ProductService extends SuperClass {
  constructor() {
    super(Product);
  }
}

const ab = new ProductService();

const oi = async () => {
  const a = await ab.findAll();
  const b = await ab.findOne({ id: 2 });
  await ab.update({ price: 30 }, { where: { id: 1 } });
  const c = await ab.findOne({ id: 1 });
  const d = await ab.create({ name: 'bbbbcdaaaf', price: 22, urlImage: 'aaaaaa' });
  ab.abc();

  const obj = { a, b, c, d };

  // console.log(obj);
  return obj;
};

oi();

module.exports = {
  ProductService,
};