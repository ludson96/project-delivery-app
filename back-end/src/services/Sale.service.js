const { SuperService } = require('./SuperService');
const { Sale } = require('../database/models');
const { SalesProduct } = require('../database/models');

class SaleService extends SuperService {
  constructor() {
    super(Sale);
    this.SalesProduct = SalesProduct;
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
  
    return { type: null, payload: result };
  }

  async createSaleProduct({ saleId, productId, quantity }) {
    const result0 = await this.SalesProduct.create({ saleId, productId, quantity });

    return { type: null, payload: result0.dataValues };
  }

  async findAllSaleProduct(obj) {
    const result0 = await this.SalesProduct.findAll(obj);

    if (result0.length === 0) return { type: 'NOT_FOUND', payload: result0 };

    const payload = result0.map((item) => item.dataValues);

    return { type: null, payload };
  }
}

module.exports = {
  SaleService,
};