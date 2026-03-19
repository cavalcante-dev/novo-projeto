const express = require('express');

const router = express.Router();
const authController = require('../controllers/auth.controller');

// Rotas públicas
router.post('/registrar', authController.registrar);
router.post('/login', authController.login);
router.post('/refresh', authController.refresh);

module.exports = router;
