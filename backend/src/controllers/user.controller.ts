import { Request, Response } from 'express';
import { UserService } from '../services/User.service';

export class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
    this.login = this.login.bind(this);
    this.createUser = this.createUser.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { type, payload } = await this.service.login({ email, password });

      if (type === 'NOT_FOUND') {
        return res.status(404).json({ hasToken: false, message: 'Usuário não encontrado ou senha incorreta' });
      }

      return res.status(200).json(payload);
    } catch (error: any) {
      return res.status(500).json({
        message: 'Erro ao entrar no site.',
        error: error.message,
      });
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const { name, email, password, role } = req.body;
      const { type, payload } = await this.service.createUser({ name, email, password, role });

      if (type === 'CONFLICT') {
        return res.status(409).json({ message: 'User already registered' });
      }

      return res.status(201).json(payload);
    } catch (error: any) {
      return res.status(500).json({
        message: 'Erro ao criar usuário no banco',
        error: error.message,
      });
    }
  }

  async getAllUsers(_req: Request, res: Response) {
    try {
      const { payload } = await this.service.getAllUsers();
      return res.status(200).json(payload);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}
