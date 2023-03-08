const { SuperService } = require('./SuperService');
const { Sale } = require('../database/models');
const { SalesProduct } = require('../database/models');

class SaleService extends SuperService {
  constructor() {
    super(Sale);
    this.saleProduct = SalesProduct;
  }

  async createSale({ userId, sellerId = 2, totalPrice, deliveryAddress,
    deliveryNumber, status = 'pendente' }) {
    const result = await super.create({
      userId,
      sellerId,
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

  async test() {
    const result = await super.findAll({
      where: { userId: 11 },
      include: [{
        model: this.saleProduct,
        where: { saleId: 9 },
      }],
    });

    if (!result) return { type: 'NOT_FOUND', payload: result };

    return { type: null, payload: result };
  }
}

// const a = new SaleService();

// const b = async () => {
//   await a.test();
// };

// b();

module.exports = {
  SaleService,
};