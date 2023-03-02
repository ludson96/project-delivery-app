const { USerService } = require('../services/User.service');

const LoginService = new USerService();

  const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const { type, payload: { token } } = await LoginService.login({ email, password });
      if (type) return res.status(404).json({ hasToken: false });
      return res.status(200).json({ token });
    } catch (erro) {
      return res.status(500).json({
        message: 'Erro ao entrar no site.',
        error: erro.message,
      });
    }
  };

  module.exports = {
    login,
  };