const Analytics = require('../models/Analytics');
const ABTest = require('../models/ABTest');
const Heatmap = require('../models/Heatmap');
const { Op } = require('sequelize');
const moment = require('moment');

// Registrar evento de analytics
const trackEvent = async (req, res) => {
  try {
    const {
      sessionId,
      eventType,
      eventName,
      pageUrl,
      elementId,
      elementClass,
      elementText,
      coordinates,
      scrollDepth,
      timeOnPage,
      metadata
    } = req.body;

    // Obtener información del usuario
    const userAgent = req.headers['user-agent'];
    const referrer = req.headers.referer;
    const ipAddress = req.ip || req.connection.remoteAddress;

    // Determinar tipo de dispositivo
    let deviceType = 'desktop';
    if (userAgent) {
      if (/Mobile|Android|iPhone|iPad/.test(userAgent)) {
        deviceType = /iPad/.test(userAgent) ? 'tablet' : 'mobile';
      }
    }

    // Determinar navegador y OS
    let browser = 'Unknown';
    let os = 'Unknown';
    if (userAgent) {
      if (userAgent.includes('Chrome')) browser = 'Chrome';
      else if (userAgent.includes('Firefox')) browser = 'Firefox';
      else if (userAgent.includes('Safari')) browser = 'Safari';
      else if (userAgent.includes('Edge')) browser = 'Edge';

      if (userAgent.includes('Windows')) os = 'Windows';
      else if (userAgent.includes('Mac')) os = 'macOS';
      else if (userAgent.includes('Linux')) os = 'Linux';
      else if (userAgent.includes('Android')) os = 'Android';
      else if (userAgent.includes('iOS')) os = 'iOS';
    }

    const analyticsEvent = await Analytics.create({
      sessionId,
      userId: req.user?.id,
      eventType,
      eventName,
      pageUrl,
      elementId,
      elementClass,
      elementText,
      coordinates,
      scrollDepth,
      timeOnPage,
      userAgent,
      referrer,
      ipAddress,
      deviceType,
      browser,
      os,
      metadata,
      timestamp: new Date()
    });

    res.json({
      success: true,
      message: 'Evento registrado exitosamente',
      data: analyticsEvent
    });
  } catch (error) {
    console.error('Error al registrar evento:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Obtener métricas de analytics
const getMetrics = async (req, res) => {
  try {
    const { startDate, endDate, pageUrl, eventType } = req.query;
    
    const whereClause = {};
    
    if (startDate && endDate) {
      whereClause.timestamp = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      };
    }
    
    if (pageUrl) {
      whereClause.pageUrl = pageUrl;
    }
    
    if (eventType) {
      whereClause.eventType = eventType;
    }

    // Métricas básicas
    const totalEvents = await Analytics.count({ where: whereClause });
    const uniqueSessions = await Analytics.count({
      where: whereClause,
      distinct: true,
      col: 'sessionId'
    });

    // Eventos por tipo
    const eventsByType = await Analytics.findAll({
      where: whereClause,
      attributes: [
        'eventType',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      group: ['eventType']
    });

    // Páginas más visitadas
    const topPages = await Analytics.findAll({
      where: { ...whereClause, eventType: 'page_view' },
      attributes: [
        'pageUrl',
        [sequelize.fn('COUNT', sequelize.col('id')), 'views']
      ],
      group: ['pageUrl'],
      order: [[sequelize.fn('COUNT', sequelize.col('id')), 'DESC']],
      limit: 10
    });

    // Dispositivos
    const devices = await Analytics.findAll({
      where: whereClause,
      attributes: [
        'deviceType',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      group: ['deviceType']
    });

    // Conversiones (clicks en botones de contacto)
    const conversions = await Analytics.count({
      where: {
        ...whereClause,
        eventType: 'click',
        eventName: {
          [Op.or]: ['contact_button', 'cta_button', 'hero_button']
        }
      }
    });

    // Tiempo promedio en página
    const avgTimeOnPage = await Analytics.findOne({
      where: {
        ...whereClause,
        eventType: 'page_view',
        timeOnPage: { [Op.ne]: null }
      },
      attributes: [
        [sequelize.fn('AVG', sequelize.col('timeOnPage')), 'avgTime']
      ]
    });

    res.json({
      success: true,
      data: {
        totalEvents,
        uniqueSessions,
        eventsByType,
        topPages,
        devices,
        conversions,
        avgTimeOnPage: avgTimeOnPage?.dataValues?.avgTime || 0
      }
    });
  } catch (error) {
    console.error('Error al obtener métricas:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Obtener datos para mapas de calor
const getHeatmapData = async (req, res) => {
  try {
    const { pageUrl, heatmapType, startDate, endDate } = req.query;
    
    const whereClause = {};
    
    if (pageUrl) {
      whereClause.pageUrl = pageUrl;
    }
    
    if (heatmapType) {
      whereClause.heatmapType = heatmapType;
    }
    
    if (startDate && endDate) {
      whereClause.timestamp = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      };
    }

    const heatmapData = await Heatmap.findAll({
      where: whereClause,
      order: [['timestamp', 'DESC']],
      limit: 1000
    });

    // Agrupar coordenadas por intensidad
    const coordinates = {};
    heatmapData.forEach(point => {
      point.coordinates.forEach(coord => {
        const key = `${coord.x},${coord.y}`;
        if (!coordinates[key]) {
          coordinates[key] = {
            x: coord.x,
            y: coord.y,
            intensity: 0
          };
        }
        coordinates[key].intensity += coord.intensity || 1;
      });
    });

    res.json({
      success: true,
      data: {
        coordinates: Object.values(coordinates),
        totalPoints: heatmapData.length
      }
    });
  } catch (error) {
    console.error('Error al obtener datos de heatmap:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Registrar datos de heatmap
const trackHeatmap = async (req, res) => {
  try {
    const {
      sessionId,
      pageUrl,
      heatmapType,
      coordinates,
      screenResolution,
      deviceType
    } = req.body;

    const heatmapData = await Heatmap.create({
      sessionId,
      pageUrl,
      heatmapType,
      coordinates,
      screenResolution,
      deviceType,
      timestamp: new Date()
    });

    res.json({
      success: true,
      message: 'Datos de heatmap registrados exitosamente',
      data: heatmapData
    });
  } catch (error) {
    console.error('Error al registrar heatmap:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Obtener experimentos A/B
const getABTests = async (req, res) => {
  try {
    const { status, section } = req.query;
    
    const whereClause = {};
    if (status) whereClause.status = status;
    if (section) whereClause.section = section;

    const abTests = await ABTest.findAll({
      where: whereClause,
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: abTests
    });
  } catch (error) {
    console.error('Error al obtener experimentos A/B:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Crear experimento A/B
const createABTest = async (req, res) => {
  try {
    const {
      name,
      description,
      section,
      elementType,
      elementId,
      variantA,
      variantB,
      trafficSplit,
      goalMetric,
      goalElement
    } = req.body;

    const abTest = await ABTest.create({
      name,
      description,
      section,
      elementType,
      elementId,
      variantA,
      variantB,
      trafficSplit,
      goalMetric,
      goalElement,
      status: 'draft'
    });

    res.json({
      success: true,
      message: 'Experimento A/B creado exitosamente',
      data: abTest
    });
  } catch (error) {
    console.error('Error al crear experimento A/B:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Actualizar experimento A/B
const updateABTest = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const abTest = await ABTest.findByPk(id);
    if (!abTest) {
      return res.status(404).json({
        success: false,
        message: 'Experimento A/B no encontrado'
      });
    }

    await abTest.update(updateData);

    res.json({
      success: true,
      message: 'Experimento A/B actualizado exitosamente',
      data: abTest
    });
  } catch (error) {
    console.error('Error al actualizar experimento A/B:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Obtener variante para un usuario
const getVariant = async (req, res) => {
  try {
    const { testId, sessionId } = req.params;

    const abTest = await ABTest.findByPk(testId);
    if (!abTest || abTest.status !== 'active') {
      return res.status(404).json({
        success: false,
        message: 'Experimento no encontrado o inactivo'
      });
    }

    // Determinar variante basado en sessionId
    const hash = sessionId.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    const variant = Math.abs(hash) % 100 < abTest.trafficSplit ? 'B' : 'A';

    res.json({
      success: true,
      data: {
        testId: abTest.id,
        variant,
        config: variant === 'A' ? abTest.variantA : abTest.variantB
      }
    });
  } catch (error) {
    console.error('Error al obtener variante:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

module.exports = {
  trackEvent,
  getMetrics,
  getHeatmapData,
  trackHeatmap,
  getABTests,
  createABTest,
  updateABTest,
  getVariant
}; 