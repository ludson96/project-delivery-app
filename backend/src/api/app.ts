import express from 'express';
import cors from 'cors';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '../docs/swagger';
import {
  loginRouter,
  registerRouter,
  productRouter,
  saleRouter,
  adminRouter,
} from '../routers';

export const app = express();

app.use(express.json());
app.use(cors());

// Documentação Swagger Interativa
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Arquivos estáticos (ex: imagens dos produtos)
app.use('/images', express.static(path.resolve(__dirname, '../../public/images')));
app.use(express.static('public'));

// Rota de Healthcheck
app.get('/health', (_req, res) => res.status(200).json({ status: 'ok', timestamp: new Date() }));
app.get('/coffee', (_req, res) => res.status(418).end());

// Rotas da API
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/products', productRouter);
app.use('/sales', saleRouter);
app.use('/admin', adminRouter);

export default app;
