const express = require('express');
const { validateInputUser } = require('../middlewares/validateInputUser');
const UserController = require('../controllers');

const router = express.Router();

router.post('/', validateInputUser, UserController.createUser);

module.exports = router;