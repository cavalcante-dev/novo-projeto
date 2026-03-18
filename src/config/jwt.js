const jwt = require('jsonwebtoken');

const gerarAccessToken = (usuarioId) => jwt.sign(
  { id: usuarioId },
  process.env.JWT_SECRET,
  { expiresIn: process.env.JWT_EXPIRES_IN },
);

const gerarRefreshToken = (usuarioId) => jwt.sign(
  { id: usuarioId },
  process.env.JWT_REFRESH_SECRET,
  { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN },
);

const validarAccessToken = (token) => jwt.verify(token, process.env.JWT_SECRET);

const validarRefreshToken = (token) => jwt.verify(token, process.env.JWT_REFRESH_SECRET);

module.exports = {
  gerarAccessToken,
  gerarRefreshToken,
  validarAccessToken,
  validarRefreshToken,
};
