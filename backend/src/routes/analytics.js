const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const { authMiddleware } = require('../middleware/auth');

// Rutas protegidas (requieren autenticación)
router.use(authMiddleware);

// Obtener analytics
router.get('/', analyticsController.getAnalytics);

// Actualizar analytics
router.post('/', analyticsController.updateAnalytics);

// Obtener histórico de analytics
router.get('/historical', analyticsController.getHistoricalAnalytics);

module.exports = router; 