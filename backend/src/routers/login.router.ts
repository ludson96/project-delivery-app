import { Router } from 'express';
import { UserController } from '../controllers';
import { validate, loginSchema } from '../middlewares/validation.middleware';

export const loginRouter = Router();
const userController = new UserController();

/**
 * @openapi
 * /login:
 *   post:
 *     summary: Autenticar usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *       404:
 *         description: Credenciais inválidas
 */
loginRouter.post('/', validate(loginSchema), userController.login);
