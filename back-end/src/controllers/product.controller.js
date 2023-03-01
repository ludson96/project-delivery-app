const ProductService = require('../services/product.service');

const getProducts = async (req, res) => {
  try {
    const newUser = req.body;
    const result = await ProductService.getProducts(newUser);
    if (!result) return res.status(404).json({ message: 'Product not found' });
    return res.status(200).json(result);
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