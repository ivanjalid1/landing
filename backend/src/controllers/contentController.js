const { Content } = require('../models');
const { validationResult } = require('express-validator');
const { getCache, setCache, deleteCache } = require('../config/redis');

// Obtener contenido público de una sección específica (con cache)
const getPublicContent = async (req, res) => {
  try {
    const { section } = req.params;
    
    // Intentar obtener del cache primero
    const cacheKey = `content:public:${section}`;
    const cachedData = await getCache(cacheKey);
    
    if (cachedData) {
      console.log(`✅ Cache hit para sección: ${section}`);
      return res.json({
        success: true,
        data: cachedData,
        cached: true
      });
    }

    // Si no está en cache, obtener de la base de datos
    const content = await Content.findOne({
      where: { section, isActive: true }
    });

    if (!content) {
      return res.status(404).json({
        success: false,
        message: `Contenido de la sección '${section}' no encontrado`
      });
    }

    // Guardar en cache por 1 hora
    await setCache(cacheKey, content, 3600);

    res.json({
      success: true,
      data: content,
      cached: false
    });
  } catch (error) {
    console.error('Error al obtener contenido público:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Obtener todo el contenido público (con cache)
const getAllPublicContent = async (req, res) => {
  try {
    const cacheKey = 'content:public:all';
    const cachedData = await getCache(cacheKey);
    
    if (cachedData) {
      console.log('✅ Cache hit para todo el contenido público');
      return res.json({
        success: true,
        data: cachedData,
        cached: true
      });
    }

    const contents = await Content.findAll({
      where: { isActive: true },
      order: [['section', 'ASC']]
    });

    // Guardar en cache por 30 minutos
    await setCache(cacheKey, contents, 1800);

    res.json({
      success: true,
      data: contents,
      cached: false
    });
  } catch (error) {
    console.error('Error al obtener todo el contenido público:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Obtener contenido de una sección específica (con cache)
const getContent = async (req, res) => {
  try {
    const { section } = req.params;
    
    const cacheKey = `content:${section}`;
    const cachedData = await getCache(cacheKey);
    
    if (cachedData) {
      console.log(`✅ Cache hit para sección: ${section}`);
      return res.json({
        success: true,
        data: cachedData,
        cached: true
      });
    }

    const content = await Content.findOne({
      where: { section, isActive: true }
    });

    if (!content) {
      return res.status(404).json({
        success: false,
        message: `Contenido de la sección '${section}' no encontrado`
      });
    }

    // Guardar en cache por 1 hora
    await setCache(cacheKey, content, 3600);

    res.json({
      success: true,
      data: content,
      cached: false
    });
  } catch (error) {
    console.error('Error al obtener contenido:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Obtener todo el contenido (con cache)
const getAllContent = async (req, res) => {
  try {
    const cacheKey = 'content:all';
    const cachedData = await getCache(cacheKey);
    
    if (cachedData) {
      console.log('✅ Cache hit para todo el contenido');
      return res.json({
        success: true,
        data: cachedData,
        cached: true
      });
    }

    const contents = await Content.findAll({
      where: { isActive: true },
      order: [['section', 'ASC']]
    });

    // Guardar en cache por 30 minutos
    await setCache(cacheKey, contents, 1800);

    res.json({
      success: true,
      data: contents,
      cached: false
    });
  } catch (error) {
    console.error('Error al obtener todo el contenido:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Crear o actualizar contenido de una sección (invalida cache)
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

    // Invalidar cache relacionado
    await deleteCache(`content:${section}`);
    await deleteCache(`content:public:${section}`);
    await deleteCache('content:all');
    await deleteCache('content:public:all');

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

// Eliminar contenido de una sección (soft delete + invalida cache)
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

    // Invalidar cache relacionado
    await deleteCache(`content:${section}`);
    await deleteCache(`content:public:${section}`);
    await deleteCache('content:all');
    await deleteCache('content:public:all');

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

// Obtener secciones disponibles (con cache)
const getSections = async (req, res) => {
  try {
    const cacheKey = 'sections:list';
    const cachedData = await getCache(cacheKey);
    
    if (cachedData) {
      return res.json({
        success: true,
        data: cachedData,
        cached: true
      });
    }

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

    // Guardar en cache por 1 hora
    await setCache(cacheKey, sections, 3600);

    res.json({
      success: true,
      data: sections,
      cached: false
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
  getPublicContent,
  getAllPublicContent,
  getContent,
  getAllContent,
  updateContent,
  deleteContent,
  getSections
}; 