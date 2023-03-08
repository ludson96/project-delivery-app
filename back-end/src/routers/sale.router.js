const express = require('express');
const { SaleController } = require('../controllers');
const { tokenValidation } = require('../middlewares/tokenValidation');

const router = express.Router();

router.post('/', tokenValidation, new SaleController().createSale);
router.get('/', tokenValidation, new SaleController().getSales);

module.exports = router;