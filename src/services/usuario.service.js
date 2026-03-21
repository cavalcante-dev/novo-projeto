const Usuarios = require('../models/Usuarios');

module.exports = {
    async criar(dados) {
        const usuario = await Usuarios.create(dados);
        return usuario;
    },

    async buscarPorEmail(email) {
        const usuario = await Usuarios.findOne({
            where: { email: email }
        });
        return usuario;        
    },

    async verificarUsuarioExistente(email) {        
        const usuario = await Usuarios.findOne({
            where: { email: email }
        });
        return !!usuario;
    }
}