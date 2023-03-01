const SaleService = require('../services/sale.service');

  const createSale = async (req, res) => {
    try {
      const saleBody = req.body;
      const result = await SaleService.createSale(saleBody);
      return res.status(201).json(result);
    } catch (erro) {
      return res.status(500).json({
        message: 'Erro ao criar usuário no banco',
        error: erro.message,
      });
    }
  };

  module.exports = {
    createSale,
  };