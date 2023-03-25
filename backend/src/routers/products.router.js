const express = require('express');
const { ProductController } = require('../controllers');

const router = express.Router();

router.get('/', new ProductController().getProducts);

module.exports = router;