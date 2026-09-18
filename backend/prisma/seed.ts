import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const usersList = [
  {
    name: 'Delivery App Admin',
    email: 'adm@deliveryapp.com',
    password: 'a4c86edecc5aee06eff8fdeda69e0d04', // md5('adm2022')
    role: 'administrator',
  },
  {
    name: 'Fulana Pereira',
    email: 'fulana@deliveryapp.com',
    password: '3c28d2b0881bf46457a853e0b07531c6', // md5('fulana123')
    role: 'seller',
  },
  {
    name: 'Cliente Zé Birita',
    email: 'zebirita@email.com',
    password: '1c37466c159755ce1fa181bd247cb925', // md5('$#zebirita#$')
    role: 'customer',
  },
];

const productsList = [
  { name: 'Skol Lata 250ml', price: 2.20, urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg' },
  { name: 'Heineken 600ml', price: 7.50, urlImage: 'http://localhost:3001/images/heineken_600ml.jpg' },
  { name: 'Antarctica Pilsen 300ml', price: 2.49, urlImage: 'http://localhost:3001/images/antarctica_pilsen_300ml.jpg' },
  { name: 'Brahma 600ml', price: 7.50, urlImage: 'http://localhost:3001/images/brahma_600ml.jpg' },
  { name: 'Skol 269ml', price: 2.19, urlImage: 'http://localhost:3001/images/skol_269ml.jpg' },
  { name: 'Skol Beats Senses 313ml', price: 4.49, urlImage: 'http://localhost:3001/images/skol_beats_senses_313ml.jpg' },
  { name: 'Becks 330ml', price: 4.99, urlImage: 'http://localhost:3001/images/becks_330ml.jpg' },
  { name: 'Brahma Duplo Malte 350ml', price: 2.79, urlImage: 'http://localhost:3001/images/brahma_duplo_malte_350ml.jpg' },
  { name: 'Becks 600ml', price: 8.89, urlImage: 'http://localhost:3001/images/becks_600ml.jpg' },
  { name: 'Skol Beats Senses 269ml', price: 3.57, urlImage: 'http://localhost:3001/images/skol_beats_senses_269ml.jpg' },
  { name: 'Stella Artois 275ml', price: 3.49, urlImage: 'http://localhost:3001/images/stella_artois_275ml.jpg' },
];

async function main() {
  console.log('[Seed] Seeding users...');
  for (const user of usersList) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }

  console.log('[Seed] Seeding products...');
  for (const product of productsList) {
    await prisma.product.upsert({
      where: { name: product.name },
      update: {},
      create: product,
    });
  }

  console.log('[Seed] Seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error('[Seed Error]:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
