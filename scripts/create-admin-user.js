const { PrismaClient } = require('../prisma/generated/client');
const bcrypt = require('bcryptjs');

async function createAdmin() {
  const prisma = new PrismaClient();

  try {
    console.log('🔐 Creating admin user...\n');

    // Hash password
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Check if admin already exists
    const existingAdmin = await prisma.user_admin.findUnique({
      where: { email: 'admin@tpms.com' },
    });

    if (existingAdmin) {
      console.log('⚠️  Admin user already exists!');
      console.log(`   Email: ${existingAdmin.email}`);
      console.log(`   Name: ${existingAdmin.name}`);
      console.log('\n✅ Skipping creation.\n');
      return;
    }

    // Create admin user
    const admin = await prisma.user_admin.create({
      data: {
        email: 'admin@tpms.com',
        name: 'Administrator',
        password: hashedPassword,
        role: 'superadmin',
      },
    });

    console.log('✅ Admin user created successfully!');
    console.log(`   ID: ${admin.id}`);
    console.log(`   Email: ${admin.email}`);
    console.log(`   Name: ${admin.name}`);
    console.log(`   Role: ${admin.role}`);
    console.log(`   Password: admin123`);
    console.log('\n🎉 You can now login with:');
    console.log(`   Email: admin@tpms.com`);
    console.log(`   Password: admin123\n`);
  } catch (error) {
    console.error('❌ Error creating admin user:');
    console.error('   ', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
