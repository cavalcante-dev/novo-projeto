const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: console.log,
    timezone: process.env.DB_TIMEZONE || '-03:00',
    dialectOptions: {
      connectTimeout: 10000, // 10 segundos
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 10000, // tempo máximo para obter conexão
      idle: 10000,
    },
  },
);

module.exports = sequelize;
