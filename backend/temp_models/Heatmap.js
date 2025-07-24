const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Heatmap = sequelize.define('Heatmap', {
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
  pageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'URL de la página'
  },
  heatmapType: {
    type: DataTypes.ENUM('click', 'move', 'scroll'),
    allowNull: false,
    comment: 'Tipo de mapa de calor'
  },
  coordinates: {
    type: DataTypes.JSONB,
    allowNull: false,
    comment: 'Array de coordenadas [{x, y, intensity}]'
  },
  screenResolution: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Resolución de pantalla'
  },
  deviceType: {
    type: DataTypes.ENUM('desktop', 'mobile', 'tablet'),
    allowNull: true,
    comment: 'Tipo de dispositivo'
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    comment: 'Timestamp del evento'
  }
}, {
  tableName: 'heatmaps',
  timestamps: true,
  indexes: [
    {
      fields: ['sessionId']
    },
    {
      fields: ['pageUrl']
    },
    {
      fields: ['heatmapType']
    },
    {
      fields: ['timestamp']
    }
  ]
});

module.exports = Heatmap; 