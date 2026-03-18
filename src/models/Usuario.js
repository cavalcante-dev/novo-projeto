const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.SERIAL,
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
        type: DataTypes.DATE,
    },
    criado_em: {
        type: DataTypes.DATE,
    }, 
    atualizado_em: {
        type: DataTypes.DATE,
    }
}, {
    tableName: usuarios, 
    freezeTableName: true,
    timeStamps: false,
    createdAt: 'criado_em', 
    updateAt: 'atualizado_em'
})

module.exports = Usuario;