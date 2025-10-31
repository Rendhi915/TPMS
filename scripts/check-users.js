const { PrismaClient } = require('../prisma/generated/client');
const prisma = new PrismaClient();

async function checkUsers() {
  try {
    console.log('\n🔍 Checking users in database...\n');
    
    const users = await prisma.user_admin.findMany({
      orderBy: { created_at: 'desc' },
    });

    if (users.length === 0) {
      console.log('❌ No users found in database');
    } else {
      console.log(`✅ Found ${users.length} user(s):\n`);
      
      users.forEach((user, index) => {
        console.log(`${index + 1}. ${user.name}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Role: ${user.role}`);
        console.log(`   Status: ${user.status}`);
        console.log(`   Last Login: ${user.last_login || 'Never'}`);
        console.log(`   Created: ${user.created_at}`);
        console.log('');
      });
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkUsers();
