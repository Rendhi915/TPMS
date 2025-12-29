const { PrismaClient } = require('../prisma/generated/client');

async function checkUsers() {
  const prisma = new PrismaClient();
  
  try {
    console.log('📋 Checking all users in database...\n');
    
    const users = await prisma.user_admin.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true
      }
    });
    
    if (users.length === 0) {
      console.log('⚠️  No users found in database!');
    } else {
      console.log(`✅ Found ${users.length} user(s):\n`);
      users.forEach(user => {
        console.log(`  ID: ${user.id}`);
        console.log(`  Name: ${user.name}`);
        console.log(`  Email: ${user.email}`);
        console.log(`  Role: ${user.role}`);
        console.log(`  Status: ${user.status || 'active'}`);
        console.log('  ---');
      });
    }
    
    // Check specifically for user ID 2
    console.log('\n🔍 Checking user ID 2...');
    const user2 = await prisma.user_admin.findUnique({
      where: { id: 2 }
    });
    
    if (user2) {
      console.log('✅ User ID 2 exists:', user2);
    } else {
      console.log('❌ User ID 2 NOT FOUND in database!');
      console.log('⚠️  The token references user ID 2 but user does not exist.');
      console.log('💡 Solution: Create user or get new token from existing user.');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkUsers();
