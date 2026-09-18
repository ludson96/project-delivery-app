import { prisma } from '../database/prismaClient';

export class ProductService {
  async getProducts() {
    const products = await prisma.product.findMany();

    const formattedProducts = products.map(({ id, name, price, urlImage }) => ({
      id,
      name,
      price: price.toString(),
      urlImage,
    }));

    return { type: null, payload: formattedProducts };
  }
}
