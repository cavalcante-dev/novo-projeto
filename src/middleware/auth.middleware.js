const { validarAccessToken } = require('../config/jwt');

module.exports = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) {
        return res.status(401).json({ error: 'Token não fornecido.' });
    }

    try {
        const decode = validarAccessToken(token);
        req.usuarioId = decode.id;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredErro') {
            return res.status(401).json({ error: 'Token expirado.', expired: 'true' });
        }
        return res.status(403).json({ error: 'Token inválido' });
    }
};