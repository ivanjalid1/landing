const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const contentRoutes = require('./content');
const publicContentRoutes = require('./publicContent');

// Rutas de autenticación
router.use('/auth', authRoutes);

// Rutas de contenido público (sin autenticación)
router.use('/content/public', publicContentRoutes);

// Rutas de contenido protegido
router.use('/content', contentRoutes);

// Ruta de estado de la API
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

module.exports = router; 