require('dotenv').config();
const http = require('http');
const app = require('./app');
const sequelize = require('./config/database');

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('- Banco de Dados Conectado');
    server.listen(PORT, () => {
      console.log(`- Servidor rodando na porta: ${PORT}`);
    });
  } catch (err) {
    console.error('Erro ao conectar ao banco:', err.message);
    process.exit(1);
  }
};

start();
