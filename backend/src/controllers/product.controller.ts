import { Request, Response } from 'express';
import { ProductService } from '../services/Product.service';

export class ProductController {
  private service: ProductService;

  constructor() {
    this.service = new ProductService();
    this.getProducts = this.getProducts.bind(this);
  }

  async getProducts(_req: Request, res: Response) {
    try {
      const { payload } = await this.service.getProducts();
      return res.status(200).json(payload);
    } catch (error: any) {
      return res.status(500).json({ message: 'Erro ao buscar produtos', error: error.message });
    }
  }
}
