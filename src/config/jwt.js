const jwt = require('jsonwebtoken');

const gerarAccessToken = (usuarioID) => {
    return jwt.sign(
        { id: usuarioid },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    )
}

const gerarRefreshToken = (usuarioID) => {
    return jwt.sign(
        { id: usuarioid },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
    )    
}

const validarAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const validarRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};

module.exports = {
  gerarAccessToken,
  gerarRefreshToken,
  validarAccessToken,
  validarRefreshToken,
};
