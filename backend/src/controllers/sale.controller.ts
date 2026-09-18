import { Response } from 'express';
import { SaleService } from '../services/Sale.service';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';

export class SaleController {
  private saleService: SaleService;

  constructor() {
    this.saleService = new SaleService();
    this.createSale = this.createSale.bind(this);
    this.getSales = this.getSales.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
  }

  async createSale(req: AuthenticatedRequest, res: Response) {
    try {
      const { totalPrice, deliveryAddress, deliveryNumber, products, sellerId } = req.body;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ message: 'Usuário não autenticado' });
      }

      const { payload } = await this.saleService.createSale({
        userId,
        sellerId: sellerId || 2,
        totalPrice,
        deliveryAddress,
        deliveryNumber,
        status: 'Pendente',
        products,
      });

      // Emissão via WebSocket se socket.io estiver configurado
      const io = req.app.get('io');
      if (io) {
        io.emit('new_order', payload);
      }

      return res.status(201).json({ saleId: payload.id, ...payload });
    } catch (error: any) {
      return res.status(500).json({
        message: 'Erro ao criar uma venda no banco',
        error: error.message,
      });
    }
  }

  async getSales(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user?.id;
      const role = req.user?.role;

      if (!userId || !role) {
        return res.status(401).json({ message: 'Usuário não autenticado' });
      }

      const { payload } = await this.saleService.getSales({ userId, role });
      return res.status(200).json(payload);
    } catch (error: any) {
      return res.status(500).json({
        message: 'Erro ao listar as vendas do banco',
        error: error.message,
      });
    }
  }

  async updateStatus(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const { payload } = await this.saleService.updateStatus(Number(id), status);

      const io = req.app.get('io');
      if (io) {
        io.emit('order_status_update', { saleId: Number(id), status });
      }

      return res.status(200).json(payload);
    } catch (error: any) {
      return res.status(500).json({
        message: 'Erro ao atualizar status da venda',
        error: error.message,
      });
    }
  }
}
