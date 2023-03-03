const { USerService } = require('../services/User.service');

class UserController {
  constructor() {
    this.service = new USerService();
    this.login = this.login.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  async login(req, res) {
    try {
      console.log(this);
      const { email, password } = req.body;
      const { type, payload: { token } } = await this.service.login({ email, password });
      console.log(2);
      if (type) return res.status(404).json({ hasToken: false });
      return res.status(200).json({ token });
    } catch (erro) {
      return res.status(500).json({
        message: 'Erro ao entrar no site.',
        error: erro.message,
      });
    }
  }

  async createUser(req, res) {
    try {
      const newUser = req.body;
      const { type, payload: { token } } = await this.service.createUser(newUser);
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
  }
}

module.exports = {
  UserController,
};