const { PrismaClient } = require('@prisma/client');

const db = new PrismaClient();

async function main() {
  try {
    await db.category.createMany({
      data: [
        { name: 'Pessoas Famosas' },
        { name: 'Filmes e TV' },
        { name: 'Músicos' },
        { name: 'Jogos' },
        { name: 'Animais' },
        { name: 'Filosofos' },
        { name: 'Minha Mulher' }
      ],
    });
  } catch (error) {
    console.error('Error seeding default categories:', error);
  } finally {
    await db.$disconnect();
  }
}

main();
