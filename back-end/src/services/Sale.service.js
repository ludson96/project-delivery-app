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

const sale = new SaleService();

const oi = async () => {
  const result = await sale.createSale({
    userId: 1,
    sellerId: 2,
    totalPrice: 2,
    deliveryAddress: 'xablau',
    deliveryNumber: 1232,
    status: 'asdasdsa',
  });

  console.log(result);

  return result;
};

oi();

module.exports = {
  SaleService,
};