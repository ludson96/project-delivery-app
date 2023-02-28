const LoginService = require('../services/login.service');

  const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const result = await LoginService.login({email, password});
      if (!result) return res.status(404).json({message: 'Email ou senha inválido'});
      const { token } = result;
      return res.status(200).json({ token });
    } catch (erro) {
      return res.status(500).json({
        message: 'Erro ao entrar no site.',
        error: erro.message,
      })
    }
  }

  module.exports = {
    login,
  };