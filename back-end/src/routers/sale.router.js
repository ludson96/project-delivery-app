const express = require('express');
const { SaleController } = require('../controllers');
const { tokenValidation } = require('../middlewares/tokenValidation');

const router = express.Router();

router.post('/', tokenValidation, new SaleController().createSale);

module.exports = router;