const { SaleService } = require('../services/Sale.service');

const saleService = new SaleService();

  const createSale = async (req, res) => {
    try {
      const saleBody = req.body;
      const result = await saleService.createSale(saleBody);
      return res.status(201).json(result.payload);
    } catch (erro) {
      return res.status(500).json({
        message: 'Erro ao criar uma venda no banco',
        error: erro.message,
      });
    }
  };

  module.exports = {
    createSale,
  };