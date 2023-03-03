const { SaleService } = require('../services/Sale.service');

class SaleController {
  constructor() {
    this.service = new SaleService();
    this.createSale = this.createSale.bind(this);
  }

  async createSale(req, res) {
    try {
      const saleBody = req.body;
      const result = await this.service.createSale(saleBody);
      return res.status(201).json(result.payload);
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