const { SuperService } = require('./SuperService');
const { SalesProduct } = require('../database/models');

class SaleProduct extends SuperService {
  constructor() {
    super(SalesProduct);
  }

  async createSaleProduct({ saleId, productId, quantity }) {
    const result0 = await super.create({ saleId, productId, quantity });

    return { type: null, payload: result0.dataValues };
  }

  async findAllSaleProduct(obj) {
    const result0 = await super.findAll(obj);

    if (result0.length === 0) return { type: 'NOT_FOUND', payload: result0 };

    const payload = result0.map((item) => item);

    return { type: null, payload };
  }
}

module.exports = {
  SaleProduct,
};