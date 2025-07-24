const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ABTest = sequelize.define('ABTest', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Nombre del experimento A/B'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Descripción del experimento'
  },
  section: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Sección donde se aplica el test (hero, services, etc.)'
  },
  elementType: {
    type: DataTypes.ENUM('title', 'button', 'color', 'layout', 'image', 'text'),
    allowNull: false,
    comment: 'Tipo de elemento que se está testeando'
  },
  elementId: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'ID del elemento específico'
  },
  variantA: {
    type: DataTypes.JSONB,
    allowNull: false,
    comment: 'Configuración de la variante A (control)'
  },
  variantB: {
    type: DataTypes.JSONB,
    allowNull: false,
    comment: 'Configuración de la variante B (test)'
  },
  trafficSplit: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 50,
    comment: 'Porcentaje de tráfico para la variante B (0-100)'
  },
  status: {
    type: DataTypes.ENUM('draft', 'active', 'paused', 'completed'),
    allowNull: false,
    defaultValue: 'draft',
    comment: 'Estado del experimento'
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Fecha de inicio del experimento'
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Fecha de finalización del experimento'
  },
  goalMetric: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Métrica objetivo (clicks, conversions, time_on_page)'
  },
  goalElement: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Elemento específico para medir la conversión'
  },
  confidenceLevel: {
    type: DataTypes.FLOAT,
    allowNull: true,
    comment: 'Nivel de confianza estadística'
  },
  winner: {
    type: DataTypes.ENUM('A', 'B', 'tie', 'none'),
    allowNull: true,
    comment: 'Variante ganadora del experimento'
  },
  totalVisitors: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: 'Total de visitantes únicos'
  },
  variantAConversions: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: 'Conversiones de la variante A'
  },
  variantBConversions: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: 'Conversiones de la variante B'
  },
  metadata: {
    type: DataTypes.JSONB,
    allowNull: true,
    comment: 'Datos adicionales del experimento'
  }
}, {
  tableName: 'ab_tests',
  timestamps: true,
  indexes: [
    {
      fields: ['status']
    },
    {
      fields: ['section']
    },
    {
      fields: ['startDate']
    }
  ]
});

module.exports = ABTest; 