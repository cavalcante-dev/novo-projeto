const bcrypt = require('bcrypt');
const usuarioService = require('../services/usuario.service')
const errorHelpers = require('../../helpers/errors.helper');
const strings = require('../../helpers/strings');
const { gerarAccessToken, gerarRefreshToken, validarRefreshToken } = require('../config/jwt');

exports.registrar = async (req, res) => {
  const { 
    nome,
    email, 
    chave 
  } = req.body;

  try {
    const usuarioExiste = await usuarioService.verificarUsuarioExistente(email);
    
    if(usuarioExiste) {
      return errorHelpers.enviarErro(res, strings.avisoEmailJaCadastrado, 409)
    }

    const hashed = await bcrypt.hash(chave, 10);

    const usuario = await usuarioService.criar({ 
      nome, 
      email, 
      chave: hashed 
    });

    return res.status(201).json({ 
      id: usuario.id, 
      nome: usuario.nome, 
      email: usuario.email 
    });

  } catch (err) {
    console.error(strings.avisoErroCadastro, err)
    return errorHelpers.enviarErro(res, strings.avisoErroCadastro, 500)
  }
};

exports.login = async (req, res) => {
  try {
    const { email, chave } = req.body;

    const usuario = await usuarioService.buscarPorEmail(email); 
    if (!usuario) { 
      return errorHelpers.enviarErro(res, strings.avisoErroLogin, 401) 
    }

    const senhaValida = await bcrypt.compare(chave, usuario.chave);
    if (!senhaValida) {
      return errorHelpers.enviarErro(res, strings.avisoErroLogin, 401)
    };

    const accessToken = gerarAccessToken(usuario.id);
    const refreshToken = gerarRefreshToken(usuario.id);

    return res.status(200).json({ 
      accessToken, refreshToken 
    });
  } catch (err) {
    console.error(strings.avisoErroLogin, err)
    return errorHelpers.enviarErro(res, strings.avisoErroLogin, 500);
  }
};

exports.refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return errorHelpers.enviarErro(res, strings.avisoErroRefreshToken, 401);
    }

    const decoded = validarRefreshToken(refreshToken);
    const accessToken = gerarAccessToken(decoded.id);

    return res.status(200).json({ 
      accessToken 
    });
  } catch (err) {
    console.error(strings.avisoErroLogin, err)
    return errorHelpers.enviarErro(res, strings.avisoErroLogin, 401);
  }
};


