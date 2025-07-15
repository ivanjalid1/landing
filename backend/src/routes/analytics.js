const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const authMiddleware = require('../middleware/auth');

// Rutas públicas (sin autenticación)
router.post('/track', analyticsController.trackEvent);
router.post('/heatmap', analyticsController.trackHeatmap);
router.get('/variant/:testId/:sessionId', analyticsController.getVariant);

// Rutas protegidas (requieren autenticación)
router.use(authMiddleware);

// Métricas y reportes
router.get('/metrics', analyticsController.getMetrics);
router.get('/heatmap', analyticsController.getHeatmapData);

// Gestión de experimentos A/B
router.get('/ab-tests', analyticsController.getABTests);
router.post('/ab-tests', analyticsController.createABTest);
router.put('/ab-tests/:id', analyticsController.updateABTest);

module.exports = router; 