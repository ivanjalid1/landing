const express = require('express');
const router = express.Router();
const { 
  getPublicContent, 
  getAllPublicContent 
} = require('../controllers/contentController-simple');

// Obtener contenido público de una sección específica
router.get('/:section', getPublicContent);

// Obtener todo el contenido público
router.get('/', getAllPublicContent);

module.exports = router; 