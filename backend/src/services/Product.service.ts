import { prisma } from '../database/prismaClient';

export class ProductService {
  async getProducts(baseUrl?: string) {
    const products = await prisma.product.findMany();

    const formattedProducts = products.map(({ id, name, price, urlImage }) => {
      let resolvedImage = urlImage;

      // Se a imagem no banco for uma URL absoluta antiga de localhost, ou um caminho relativo,
      // convertemos dinamicamente para o domínio atual do backend (seja local ou no Render)
      if (resolvedImage.includes('localhost:3001')) {
        const imagePath = resolvedImage.substring(resolvedImage.indexOf('/images/'));
        resolvedImage = baseUrl ? `${baseUrl}${imagePath}` : imagePath;
      } else if (resolvedImage.startsWith('/images/')) {
        resolvedImage = baseUrl ? `${baseUrl}${resolvedImage}` : resolvedImage;
      }

      return {
        id,
        name,
        price: price.toString(),
        urlImage: resolvedImage,
      };
    });

    return { type: null, payload: formattedProducts };
  }
}
