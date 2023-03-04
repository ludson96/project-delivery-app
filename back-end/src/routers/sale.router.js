const express = require('express');
const { SaleController } = require('../controllers');

const router = express.Router();

router.post('/', new SaleController().createSale);

module.exports = router;