const { SaleService } = require('../services/Sale.service');
const { SaleProduct } = require('../services/SaleProduct.service');
const { verifyToken } = require('../auth/jwtFunctions');

class SaleController {
  constructor() {
    this.SaleService = new SaleService();
    this.SaleProductService = new SaleProduct();
    this.createSale = this.createSale.bind(this);
  }

  async createSale(req, res) {
    try {
      const { totalPrice, deliveryAddress, deliveryNumber, products } = req.body;
      const { authorization } = req.headers;
      const { id } = verifyToken(authorization);
      const result = await this.SaleService
        .createSale({
          userId: id, totalPrice, deliveryAddress, deliveryNumber, status: 'Pendente' });
      await Promise.all(products.map(({ productId, quantity }) => this.SaleProductService
        .createSaleProduct({ saleId: result.payload.id, productId, quantity })));
      return res.status(201).json({ saleId: result.payload.id });
    } catch (erro) {
      return res.status(500).json({
        message: 'Erro ao criar uma venda no banco',
        error: erro.message,
      });
    }
  }
}

module.exports = {
  SaleController,
};