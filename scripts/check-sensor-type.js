require('dotenv').config();
const { PrismaClient } = require('../prisma/generated/client');

async function checkSensorType() {
  const prisma = new PrismaClient();

  try {
    const result = await prisma.$queryRaw`
      SELECT 
        conname AS constraint_name,
        pg_get_constraintdef(c.oid) AS constraint_definition
      FROM pg_constraint c
      JOIN pg_namespace n ON n.oid = c.connamespace
      WHERE conrelid = 'sensor'::regclass
        AND contype = 'c'
        AND conname LIKE '%type%'
    `;

    console.log('Sensor type constraint:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkSensorType();
