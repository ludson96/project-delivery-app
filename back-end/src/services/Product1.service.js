const { SuperService } = require('./SuperService');
const { Product } = require('../database/models');

class ProductService extends SuperService {
  constructor() {
    super(Product);
  }

  async getProducts(obj) {
    const result = (await this.model.findAll(obj)).map(({ dataValues }) => dataValues);

    if (result.length === 0) return { type: 'NOT_FOUND', payload: result };
    const objWithPriceFixed = result.map(({ id, name, price, urlImage }) => ({
        id, 
        name,
        price: price.toFixed(2).toString(),
        urlImage,
      }));

    return { type: null, payload: objWithPriceFixed };
  }
}

module.exports = {
  ProductService,
};