import { Router } from 'express';
import { SaleController } from '../controllers';
import { tokenValidation } from '../middlewares/auth.middleware';
import { validate, createSaleSchema } from '../middlewares/validation.middleware';

export const saleRouter = Router();
const saleController = new SaleController();

/**
 * @openapi
 * /sales:
 *   post:
 *     summary: Criar um novo pedido
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [totalPrice, deliveryAddress, deliveryNumber, products]
 *             properties:
 *               totalPrice:
 *                 type: number
 *               deliveryAddress:
 *                 type: string
 *               deliveryNumber:
 *                 type: string
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: integer
 *                     quantity:
 *                       type: integer
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *   get:
 *     summary: Listar pedidos do usuário/vendedor
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pedidos
 */
saleRouter.post('/', tokenValidation as any, validate(createSaleSchema), saleController.createSale as any);
saleRouter.get('/', tokenValidation as any, saleController.getSales as any);
saleRouter.patch('/:id/status', tokenValidation as any, saleController.updateStatus as any);
