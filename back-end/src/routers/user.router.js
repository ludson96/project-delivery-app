const express = require('express');
const { validateInputUser } = require('../middlewares/validateInputUser');
const validateJWT = require('../auth/validateJWT');
const UserController = require('../controllers');

const router = express.Router();

router.post('/', validateInputUser, UserController.createUser);

router.get('/', validateJWT, UserController.getAllUsers);

router.get('/:id', validateJWT, UserController.getUserById);

router.delete('/me', validateJWT, UserController.deleteUser);

module.exports = router;