const { Product } = require('../database/models');

const getProducts = async () => {
  const result = await Product.findAll();

  const result2 = result.map((item) => {

    const result = item.dataValues

    result.price.toFixed(2);

    return result
  });

  console.log(result2);
  
  return result2;
};

getProducts()

module.exports = {
  getProducts,
};