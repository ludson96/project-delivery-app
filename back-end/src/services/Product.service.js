const { SuperService } = require('./SuperService');
const { Product } = require('../database/models');

class ProductService extends SuperService {
  constructor() {
    super(Product);
  }

  async getProducts(obj) {
    const result = await super.findAll(obj);

    if (result.length === 0) return { type: 'NOT_FOUND', payload: result };
    
    const objWithPriceFixed = result.map(({ id, name, price, urlImage }) => ({
        id, 
        name,
        price: price.toString(),
        urlImage,
      }));

    return { type: null, payload: objWithPriceFixed };
  }
}

module.exports = {
  ProductService,
};