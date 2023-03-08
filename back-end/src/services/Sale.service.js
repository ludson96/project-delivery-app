const { SuperService } = require('./SuperService');
const { Sale } = require('../database/models');

class SaleService extends SuperService {
  constructor() {
    super(Sale);
  }

  async createSale({ userId, sellerId, totalPrice, deliveryAddress,
    deliveryNumber, status = 'pendente' }) {
    const result = await super.create({
      userId,
      sellerId: 2,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      status,
    });
  
    return { type: null, payload: result };
  }

  async getSales({ userId }) {
    const result = await super.findAll({ where: { userId } });

    if (!result) return { type: 'NOT_FOUND', payload: result };

    return { type: null, payload: result };
  }
}

module.exports = {
  SaleService,
};