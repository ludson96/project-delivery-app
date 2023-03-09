const express = require('express');
const { SaleController } = require('../controllers');
const { tokenValidation } = require('../middlewares/tokenValidation');
const { ValidatingBody } = require('../middlewares/createSaleBody');

const router = express.Router();

const listOfKeysToValidate = ['totalPrice', 'deliveryAddress', 'deliveryNumber', 'products'];

router.post(
  '/',
  tokenValidation,
  new ValidatingBody(listOfKeysToValidate).checkingBodyContents,
  new SaleController().createSale,
);
router.get('/', tokenValidation, new SaleController().getSales);

module.exports = router;