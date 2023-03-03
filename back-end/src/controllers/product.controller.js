const { ProductService } = require('../services/Product.service');
const { getStatusCode } = require('./helpers/htmlcodes');

const prodService = new ProductService();

const getProducts = async (req, res) => {
  try {
    const { type, payload } = await prodService.getProducts();
    if (type) return res.status(getStatusCode(type)).json({ message: 'Product not found' });
    return res.status(200).json(payload);
  } catch (erro) {
    return res.status(500).json({
      message: 'Erro sobre products',
      error: erro.message,
    });
  }
};

module.exports = {
  getProducts,
};