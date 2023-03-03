const { Product } = require('../database/models');

const getProducts = async () => {
  const result = await Product.findAll();

  const result2 = result.map(({ id, name, price, urlImage }) => ({
      id,
      name,
      price: price.toString(),
      urlImage,
    }));

  return result2;
};

module.exports = {
  getProducts,
};