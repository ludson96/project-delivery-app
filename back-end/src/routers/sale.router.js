const express = require('express');
const { SaleController } = require('../controllers');

const router = express.Router();

router.post('/', SaleController.createSale);

module.exports = router;