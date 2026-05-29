import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create default user if it doesn't exist
  const existingUser = await prisma.user.findUnique({
    where: { id: 1 }
  });

  if (!existingUser) {
    await prisma.user.create({
      data: {
        id: 1,
        firstName: 'Default',
        lastName: 'User',
        email: 'default@example.com',
        password: 'temporary' // In production, this should be hashed
      }
    });
    console.log('Default user created');
  } else {
    console.log('Default user already exists');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
