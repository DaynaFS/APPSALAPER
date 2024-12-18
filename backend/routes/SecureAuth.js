const express = require('express');
const validateJWT = require('../middlewares/authMiddleware');
//const { getUserProfile, updateUserProfile } = require('../controllers/SecureAuthController');
//const { verifyToken } = require('../middleware/MiddlewareAuth');
const checkJwt = require('../middleware/MiddlewareAuth');

const router = express.Router();

router.get('/profile', checkJwt, (req, res) => {
  // Si el token es válido, puedes acceder a los datos del usuario
  const user = req.user; // Contiene los claims del token JWT decodificado
  res.status(200).json({ message: 'Acceso autorizado', user });
});

// Ruta protegida de ejemplo
router.get('/profile', validateJWT, (req, res) => {
  res.json({ message: 'Acceso permitido', user: req.user });
});

module.exports = router;
