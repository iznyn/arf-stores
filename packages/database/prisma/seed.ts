import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create default admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('✅ Created admin user:', adminUser.email);

  // Create a default store if none exists
  const store = await prisma.store.upsert({
    where: { code: 'MAIN' },
    update: {},
    create: {
      name: 'Main Store',
      code: 'MAIN',
      address: '123 Main Street',
      phone: '+1234567890',
    },
  });

  console.log('✅ Created default store:', store.name);

  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
