const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  chave: {
    type: DataTypes.STRING,
  },
  avatar_url: {
    type: DataTypes.STRING,
  },
  criado_em: {
    type: DataTypes.DATE,
  },
  atualizado_em: {
    type: DataTypes.DATE,
  },
}, {
  tableName: 'usuarios',
  freezeTableName: true,
  timestamps: true,
  createdAt: 'criado_em',
  updatedAt: 'atualizado_em',
});

module.exports = Usuario;
