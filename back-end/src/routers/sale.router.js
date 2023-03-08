const express = require('express');
const { SaleController } = require('../controllers');
const { tokenValidation } = require('../middlewares/tokenValidation');
const { saleBodyKeys, saleBodyProductsArray } = require('../middlewares/createSaleBody');

const router = express.Router();

router.post(
  '/', tokenValidation, saleBodyKeys, saleBodyProductsArray, new SaleController().createSale,
);
router.get('/', tokenValidation, new SaleController().getSales);

module.exports = router;