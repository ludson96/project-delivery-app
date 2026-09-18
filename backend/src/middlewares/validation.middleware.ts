import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

export const validate = (schema: z.ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: 'Dados inválidos',
          errors: error.errors.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        });
      }
      return res.status(500).json({ message: 'Erro interno de validação' });
    }
  };
};

export const registerSchema = z.object({
  name: z.string().min(12, 'O nome deve ter no mínimo 12 caracteres'),
  email: z.string().email('Formato de e-mail inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  role: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Formato de e-mail inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

export const createSaleSchema = z.object({
  totalPrice: z.union([z.number(), z.string()]),
  deliveryAddress: z.string().min(1, 'Endereço é obrigatório'),
  deliveryNumber: z.union([z.string(), z.number()]).transform(String),
  sellerId: z.number().optional(),
  products: z.array(
    z.object({
      productId: z.number(),
      quantity: z.number().min(1, 'Quantidade deve ser maior que 0'),
    })
  ).min(1, 'Pelo menos um produto deve ser informado'),
});
