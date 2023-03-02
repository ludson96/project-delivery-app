const express = require('express');
const { ProductController } = require('../controllers');

const router = express.Router();

router.get('/', ProductController.getProducts);

module.exports = router;