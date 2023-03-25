const express = require('express');
const { UserController } = require('../controllers');

const router = express.Router();

const UserContr = new UserController();

router.get('/manager', UserContr.getAllUsers);

module.exports = router;