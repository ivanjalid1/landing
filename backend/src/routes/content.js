const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');
const authMiddleware = require('../middleware/auth');

// Aplicar middleware de autenticación a todas las rutas
router.use(authMiddleware);

// Obtener todas las secciones disponibles
router.get('/sections', contentController.getSections);

// Obtener todo el contenido
router.get('/', contentController.getAllContent);

// Obtener contenido de una sección específica
router.get('/:section', contentController.getContent);

// Crear o actualizar contenido de una sección
router.put('/:section', contentController.updateContent);

// Eliminar contenido de una sección (soft delete)
router.delete('/:section', contentController.deleteContent);

module.exports = router; 