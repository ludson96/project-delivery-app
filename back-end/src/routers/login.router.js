const express = require('express');
const { validateInputUser } = require('../middlewares/validateInputUser');
const { UserController } = require('../controllers');

const router = express.Router();

const UserContr = new UserController();

router.post('/', validateInputUser, UserContr.login);

module.exports = router;