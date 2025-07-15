const Content = require('../models/Content');
const { validationResult } = require('express-validator');

// Obtener contenido de una sección específica
const getContent = async (req, res) => {
  try {
    const { section } = req.params;
    
    const content = await Content.findOne({
      where: { section, isActive: true }
    });

    if (!content) {
      return res.status(404).json({
        success: false,
        message: `Contenido de la sección '${section}' no encontrado`
      });
    }

    res.json({
      success: true,
      data: content
    });
  } catch (error) {
    console.error('Error al obtener contenido:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Obtener todo el contenido
const getAllContent = async (req, res) => {
  try {
    const contents = await Content.findAll({
      where: { isActive: true },
      order: [['section', 'ASC']]
    });

    res.json({
      success: true,
      data: contents
    });
  } catch (error) {
    console.error('Error al obtener todo el contenido:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Crear o actualizar contenido de una sección
const updateContent = async (req, res) => {
  try {
    const { section } = req.params;
    const { data } = req.body;

    // Validaciones básicas
    if (!data || typeof data !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Los datos son requeridos y deben ser un objeto'
      });
    }

    // Buscar si ya existe contenido para esta sección
    let content = await Content.findOne({
      where: { section }
    });

    if (content) {
      // Actualizar contenido existente
      await content.update({
        data,
        updatedAt: new Date()
      });
    } else {
      // Crear nuevo contenido
      content = await Content.create({
        section,
        data,
        isActive: true
      });
    }

    res.json({
      success: true,
      message: `Contenido de la sección '${section}' actualizado exitosamente`,
      data: content
    });
  } catch (error) {
    console.error('Error al actualizar contenido:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Eliminar contenido de una sección (soft delete)
const deleteContent = async (req, res) => {
  try {
    const { section } = req.params;
    
    const content = await Content.findOne({
      where: { section, isActive: true }
    });

    if (!content) {
      return res.status(404).json({
        success: false,
        message: `Contenido de la sección '${section}' no encontrado`
      });
    }

    await content.update({ isActive: false });

    res.json({
      success: true,
      message: `Contenido de la sección '${section}' eliminado exitosamente`
    });
  } catch (error) {
    console.error('Error al eliminar contenido:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Obtener secciones disponibles
const getSections = async (req, res) => {
  try {
    const sections = [
      {
        name: 'hero',
        title: 'Sección Hero',
        description: 'Título principal, subtítulo, imágenes y botones'
      },
      {
        name: 'services',
        title: 'Servicios',
        description: 'Lista de servicios ofrecidos'
      },
      {
        name: 'accounts',
        title: 'Cuentas Premium',
        description: 'Cuentas premium disponibles'
      },
      {
        name: 'solutions',
        title: 'Soluciones Enterprise',
        description: 'Soluciones técnicas para empresas'
      },
      {
        name: 'faq',
        title: 'Preguntas Frecuentes',
        description: 'Preguntas y respuestas'
      },
      {
        name: 'cta',
        title: 'Call to Action Final',
        description: 'Botón de llamada a la acción'
      },
      {
        name: 'footer',
        title: 'Footer',
        description: 'Información de contacto y enlaces'
      }
    ];

    res.json({
      success: true,
      data: sections
    });
  } catch (error) {
    console.error('Error al obtener secciones:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

module.exports = {
  getContent,
  getAllContent,
  updateContent,
  deleteContent,
  getSections
}; 