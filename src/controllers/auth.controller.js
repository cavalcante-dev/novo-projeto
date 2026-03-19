const bcrypt = require('bcrypt');

const Usuario = require('../models/Usuario');
const {
  gerarAccessToken,
  gerarRefreshToken,
  validarRefreshToken,
} = require('../config/jwt');

exports.registrar = async (req, res) => {
  try {
    const { nome, email, chave } = req.body;

    // Verifica se usuario já existe com email único.
    const exists = await Usuario.findOne({ where: { email } });
    if (exists) return res.status(409).json({ error: 'E-mail já cadastrado.' });

    // Criptografa a senha e cria o usuario.
    const hashed = await bcrypt.hash(chave, 10);
    const usuario = await Usuario.create({ nome, email, chave: hashed });

    return res
      .status(201)
      .json({ id: usuario.id, nome: usuario.nome, email: usuario.email });
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao registrar usuário.', codigo: err });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, chave } = req.body;

    // Verifica se usuario já existe com email único.
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) { return res.status(404).json({ error: 'Usuário não encontrado.' }); }

    // Valida a senha criptografada.
    const valid = await bcrypt.compare(chave, usuario.chave);
    if (!valid) return res.status(401).json({ error: 'Senha incorreta.' });

    const accessToken = gerarAccessToken(usuario.id);
    const refreshToken = gerarRefreshToken(usuario.id);

    return res.status(200).json({ accessToken, refreshToken });
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao realizar login.', codigo: err });
  }
};

exports.refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ error: 'Refresh token não fornecido.' });
    }

    const decoded = validarRefreshToken(refreshToken);
    const accessToken = gerarAccessToken(decoded.id);

    return res.status(200).json({ accessToken });
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao realizar login.', codigo: err });
  }
};
