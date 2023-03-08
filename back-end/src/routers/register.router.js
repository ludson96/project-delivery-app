const express = require('express');
const { validateInputUser } = require('../middlewares/validateInputUser');
const { validateUserBody } = require('../middlewares/registerUserBody');
const { UserController } = require('../controllers');

const router = express.Router();

router.post('/', validateUserBody, validateInputUser, new UserController().createUser);

module.exports = router;