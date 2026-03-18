require('dotenv').config();
const http = require('http');
const app = require('./app');
const sequelize = require('./config/database');

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

sequelize.authenticate()
  .then(() => {
    console.log('- Banco de Dados Conectado');
    server.listen(PORT, () => {
      console.log(`Servidor rodando na porta: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco:', err);
    process.exit(1);
  });
