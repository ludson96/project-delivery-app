import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../api/app';
import { prisma } from '../database/prismaClient';

vi.mock('../database/prismaClient', () => {
  return {
    prisma: {
      user: {
        findUnique: vi.fn(),
        findFirst: vi.fn(),
        create: vi.fn(),
        findMany: vi.fn(),
      },
      product: {
        findMany: vi.fn(),
      },
      sale: {
        findMany: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
      },
      $transaction: vi.fn(),
    },
  };
});

describe('API Endpoints (Vitest)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('GET /health deve responder com status ok 200', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
  });

  it('GET /products deve retornar a lista de produtos', async () => {
    (prisma.product.findMany as any).mockResolvedValue([
      { id: 1, name: 'Skol Lata 250ml', price: '2.20', urlImage: 'http://localhost:3001/images/skol.jpg' },
    ]);

    const res = await request(app).get('/products');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].name).toBe('Skol Lata 250ml');
  });

  it('POST /login deve retornar 400 para requisição com corpo inválido', async () => {
    const res = await request(app).post('/login').send({ email: 'invalido' });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('errors');
  });

  it('GET /api-docs deve responder com documentação Swagger 200/301', async () => {
    const res = await request(app).get('/api-docs/');
    expect([200, 301]).toContain(res.status);
  });
});
