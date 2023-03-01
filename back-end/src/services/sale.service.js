const { Sale } = require('../database/models');

const createSale = async ({ userId, sellerId, totalPrice, deliveryAddress,
  deliveryNumber, status }) => {
  const result = await Sale.create({
    userId,
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    status,
  });

  return result.dataValues;
};

module.exports = {
  createSale,
};