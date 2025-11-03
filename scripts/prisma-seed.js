const { PrismaClient } = require('../prisma/generated/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  try {
    // Hash password untuk admin
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Cek apakah admin sudah ada
    const existingAdmin = await prisma.user_admin.findUnique({
      where: { email: 'admin@tpms.com' },
    });

    if (existingAdmin) {
      console.log('✅ Admin user already exists');
    } else {
      // Buat user admin default
      await prisma.user_admin.create({
        data: {
          name: 'admin',
          email: 'admin@tpms.com',
          password: hashedPassword,
          role: 'superadmin',
          status: 'active',
        },
      });

      console.log('✅ Admin user created successfully');
      console.log('   Email: admin@tpms.com');
      console.log('   Password: admin123');
      console.log('   Role: superadmin');
    }

    console.log('🎉 Seed completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
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
