const { SuperService } = require('./SuperService');
const { Sale } = require('../database/models');
const { SalesProduct } = require('../database/models');
const { Product } = require('../database/models');

class SaleService extends SuperService {
  constructor() {
    super(Sale);
    this.saleProduct = SalesProduct;
    this.products = Product;
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
    const result = await super.findAll({
      where: { userId },
      include: {
        model: this.saleProduct,
        include: {
          model: this.products,
        },
      },
    });

    if (!result) return { type: 'NOT_FOUND', payload: result };

    return { type: null, payload: result };
  }
}

module.exports = {
  SaleService,
};