const express = require('express');
const router = express.Router();
const { 
  getContent, 
  getAllContent, 
  updateContent, 
  deleteContent,
  getSections
} = require('../controllers/contentController-simple');
const { auth } = require('../middleware/auth');

// Obtener secciones disponibles
router.get('/sections', getSections);

// Obtener contenido de una sección específica (protegido)
router.get('/:section', auth, getContent);

// Obtener todo el contenido (protegido)
router.get('/', auth, getAllContent);

// Crear o actualizar contenido de una sección (protegido)
router.put('/:section', auth, updateContent);

// Eliminar contenido de una sección (protegido)
router.delete('/:section', auth, deleteContent);

module.exports = router; 