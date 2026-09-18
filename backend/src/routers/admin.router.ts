import { Router } from 'express';
import { UserController } from '../controllers';
import { tokenValidation } from '../middlewares/auth.middleware';

export const adminRouter = Router();
const userController = new UserController();

adminRouter.get('/manager', tokenValidation as any, userController.getAllUsers);
