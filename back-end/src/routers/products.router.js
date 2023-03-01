const express = require('express');
// const { validateInputUser } = require('../middlewares/validateInputUser');
const { ProductController } = require('../controllers');

const router = express.Router();

router.get('/', ProductController.getProducts);

module.exports = router;