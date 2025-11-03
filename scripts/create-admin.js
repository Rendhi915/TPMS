const { PrismaClient } = require('../prisma/generated/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    // Hash password
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Check if admin already exists
    const existingAdmin = await prisma.user_admin.findUnique({
      where: { email: 'admin@tpms.com' },
    });

    if (existingAdmin) {
      console.log('❌ Admin already exists!');
      console.log('Email:', existingAdmin.email);
      return;
    }

    // Create admin user
    const admin = await prisma.user_admin.create({
      data: {
        name: 'Administrator',
        email: 'admin@tpms.com',
        password: hashedPassword,
        role: 'admin',
        status: 'active',
      },
    });

    console.log('✅ Admin user created successfully!');
    console.log('Email:', admin.email);
    console.log('Password: admin123');
    console.log('Role:', admin.role);
    console.log('ID:', admin.id);
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
