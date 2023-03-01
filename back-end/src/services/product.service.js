const { Product } = require('../database/models');

const getProducts = async () => {
  const result = await Product.findAll();

  const result2 = result.map((item) => item.dataValues);

  return result2;
};

module.exports = {
  getProducts,
};