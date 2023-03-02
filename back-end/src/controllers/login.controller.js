const LoginService = require('../services/login.service');
const { verifyToken } = require('../auth/jwtFunctions');

  const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const result = await LoginService.login({ email, password });
      if (!result.token) return res.status(404).json({ hasToken: false });
      const { token } = result;
      const user = verifyToken(token);
      return res.status(200).json({ token, user });
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