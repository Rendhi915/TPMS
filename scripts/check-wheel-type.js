require('dotenv').config();
const { PrismaClient } = require('../prisma/generated/client');
const prisma = new PrismaClient();

async function checkWheelTypeConstraint() {
  try {
    const result = await prisma.$queryRaw`
      SELECT constraint_name, check_clause 
      FROM information_schema.check_constraints 
      WHERE constraint_name LIKE '%wheel_type%'
    `;
    
    console.log('\n🔍 Wheel Type Constraint Check:\n');
    console.log(result);
    
    // Also check enum values if exists
    const enumCheck = await prisma.$queryRaw`
      SELECT t.typname, e.enumlabel
      FROM pg_type t 
      JOIN pg_enum e ON t.oid = e.enumtypid  
      WHERE t.typname LIKE '%wheel%'
      ORDER BY e.enumsortorder
    `;
    
    console.log('\n🔍 Wheel Type Enum Values (if exists):\n');
    console.log(enumCheck);
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkWheelTypeConstraint();
