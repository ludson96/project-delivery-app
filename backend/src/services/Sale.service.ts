import { prisma } from '../database/prismaClient';

interface CreateSaleInput {
  userId: number;
  sellerId?: number;
  totalPrice: number | string;
  deliveryAddress: string;
  deliveryNumber: string;
  status?: string;
  products: Array<{ productId: number; quantity: number }>;
}

export class SaleService {
  async createSale({
    userId,
    sellerId = 2,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    status = 'Pendente',
    products,
  }: CreateSaleInput) {
    // Transação atômica no Prisma: cria venda e seus itens associados
    const newSale = await prisma.$transaction(async (tx) => {
      const sale = await tx.sale.create({
        data: {
          userId,
          sellerId,
          totalPrice: typeof totalPrice === 'string' ? parseFloat(totalPrice) : totalPrice,
          deliveryAddress,
          deliveryNumber,
          status,
        },
      });

      if (products && products.length > 0) {
        await tx.salesProduct.createMany({
          data: products.map((item) => ({
            saleId: sale.id,
            productId: item.productId,
            quantity: item.quantity,
          })),
        });
      }

      return sale;
    });

    return { type: null, payload: newSale };
  }

  async getSales({ userId, role }: { userId: number; role: string }) {
    const whereCondition = role === 'customer' ? { userId } : { sellerId: userId };

    const sales = await prisma.sale.findMany({
      where: whereCondition,
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        saleDate: 'desc',
      },
    });

    return { type: null, payload: sales };
  }

  async updateStatus(saleId: number, status: string) {
    const updated = await prisma.sale.update({
      where: { id: saleId },
      data: { status },
    });
    return { type: null, payload: updated };
  }
}
