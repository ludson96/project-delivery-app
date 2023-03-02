const { USerService } = require('../services/User.service');

const UService = new USerService();

  const createUser = async (req, res) => {
    try {
      const newUser = req.body;
      const { type, payload: { token } } = await UService.createUser(newUser);
      if (type === 'CONFLICT') { 
        return res.status(409).json({ message: 'User already registered' }); 
      }
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
  };