const { SuperService } = require('./SuperService');
const { Sale } = require('../database/models');

class SaleService extends SuperService {
  constructor() {
    super(Sale);
  }

  async createSale({ userId, sellerId, totalPrice, deliveryAddress,
    deliveryNumber, status }) {
    const result = await super.create({
      userId,
      sellerId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      status,
    });
  
    return result;
  }
}

module.exports = {
  SaleService,
};