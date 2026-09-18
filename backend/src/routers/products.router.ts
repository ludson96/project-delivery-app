import { Router } from 'express';
import { ProductController } from '../controllers';

export const productRouter = Router();
const productController = new ProductController();

/**
 * @openapi
 * /products:
 *   get:
 *     summary: Listar todos os produtos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de produtos disponíveis
 */
productRouter.get('/', productController.getProducts);
