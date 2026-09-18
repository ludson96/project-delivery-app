import { Router } from 'express';
import { UserController } from '../controllers';
import { validate, registerSchema } from '../middlewares/validation.middleware';

export const registerRouter = Router();
const userController = new UserController();

/**
 * @openapi
 * /register:
 *   post:
 *     summary: Cadastrar novo cliente
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Criado com sucesso
 *       409:
 *         description: E-mail já cadastrado
 */
registerRouter.post('/', validate(registerSchema), userController.createUser);
