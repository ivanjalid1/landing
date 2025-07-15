const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Analytics = sequelize.define('Analytics', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  sessionId: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'ID único de la sesión del usuario'
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: true,
    comment: 'ID del usuario si está autenticado'
  },
  eventType: {
    type: DataTypes.ENUM('page_view', 'click', 'scroll', 'form_submit', 'conversion', 'heatmap'),
    allowNull: false,
    comment: 'Tipo de evento'
  },
  eventName: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Nombre específico del evento'
  },
  pageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'URL de la página donde ocurrió el evento'
  },
  elementId: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'ID del elemento que disparó el evento'
  },
  elementClass: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Clase CSS del elemento'
  },
  elementText: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Texto del elemento'
  },
  coordinates: {
    type: DataTypes.JSONB,
    allowNull: true,
    comment: 'Coordenadas del clic (x, y)'
  },
  scrollDepth: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Porcentaje de scroll (0-100)'
  },
  timeOnPage: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Tiempo en la página en segundos'
  },
  userAgent: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'User agent del navegador'
  },
  referrer: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Página de origen'
  },
  ipAddress: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Dirección IP del usuario'
  },
  country: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'País del usuario'
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Ciudad del usuario'
  },
  deviceType: {
    type: DataTypes.ENUM('desktop', 'mobile', 'tablet'),
    allowNull: true,
    comment: 'Tipo de dispositivo'
  },
  browser: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Navegador del usuario'
  },
  os: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Sistema operativo'
  },
  screenResolution: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Resolución de pantalla'
  },
  metadata: {
    type: DataTypes.JSONB,
    allowNull: true,
    comment: 'Datos adicionales del evento'
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    comment: 'Timestamp del evento'
  }
}, {
  tableName: 'analytics',
  timestamps: true,
  indexes: [
    {
      fields: ['sessionId']
    },
    {
      fields: ['eventType']
    },
    {
      fields: ['timestamp']
    },
    {
      fields: ['pageUrl']
    }
  ]
});

module.exports = Analytics; 