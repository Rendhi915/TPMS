require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'fleet_secret_key_2024';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

module.exports = {
  JWT_SECRET,
  JWT_EXPIRES_IN,
};
