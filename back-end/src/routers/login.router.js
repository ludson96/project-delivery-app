const express = require('express');
const { validateInputUser } = require('../middlewares/validateInputUser');
const { LoginController } = require('../controllers');

const router = express.Router();

router.post('/', validateInputUser, LoginController.login);

module.exports = router;