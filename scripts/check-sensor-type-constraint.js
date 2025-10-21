// Check sensor type constraint
const { PrismaClient } = require('../prisma/generated/client');

const prisma = new PrismaClient();

async function checkConstraint() {
  try {
    // Query check constraints
    const constraints = await prisma.$queryRaw`
      SELECT 
        con.conname as constraint_name,
        pg_get_constraintdef(con.oid) as constraint_definition
      FROM pg_constraint con
      INNER JOIN pg_class rel ON rel.oid = con.conrelid
      WHERE rel.relname = 'sensor'
        AND con.conname = 'sensor_type_check'
    `;
    
    console.log('Constraint definition:');
    console.log(constraints);

    // Check existing sensor types
    const existingTypes = await prisma.$queryRaw`
      SELECT DISTINCT type
      FROM sensor
      WHERE type IS NOT NULL
    `;
    
    console.log('\nExisting sensor types in database:');
    console.log(existingTypes);

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkConstraint();
