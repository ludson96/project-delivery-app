const UserService = require('../services/user.service');

  const createUser = async (req, res) => {
    try {
      const newUser = req.body;
      const { user, token } = await UserService.createUser(newUser);
      if (!user) return res.status(409).json({ message: 'User already registered' });
      return res.status(201).json({ token });
    } catch (erro) {
      return res.status(500).json({
        message: 'Erro ao criar usuário no banco',
        error: erro.message,
      });
    }
  };

  module.exports = {
    createUser,
  }