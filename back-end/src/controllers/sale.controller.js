const { SaleService } = require('../services/Sale.service');
const { SaleProduct } = require('../services/SaleProduct.service');

class SaleController {
  constructor() {
    this.SaleService = new SaleService();
    this.SaleProductService = new SaleProduct();
    this.createSale = this.createSale.bind(this);
  }

  async createSale(req, res) {
    try {
      const saleBody = req.body;
      const result0 = await this.SaleService.createSale(saleBody);
      await Promise.all(saleBody.products.map(({ productId, quantity }) => this
        .SaleProductService.createSaleProduct({
          saleId: result0.payload.id,
          productId,
          quantity,
        })));
      return res.status(201).json({ saleId: result0.payload.id });
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