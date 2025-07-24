const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Analytics = sequelize.define('Analytics', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    // Métricas principales
    revenue: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0
    },
    accounts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    activeCampaigns: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    conversionRate: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      defaultValue: 0
    },
    // Métricas de campañas
    ctr: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      defaultValue: 0
    },
    cpc: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0
    },
    roas: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      defaultValue: 0
    },
    // Métricas de soporte
    openTickets: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    responseTime: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      defaultValue: 0
    },
    satisfaction: {
      type: DataTypes.DECIMAL(3, 2),
      allowNull: false,
      defaultValue: 0
    },
    // Métricas de cuentas
    availableAccounts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    verifyingAccounts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    deliveryTime: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      defaultValue: 0
    }
  }, {
    timestamps: true,
    indexes: [
      {
        fields: ['date']
      }
    ]
  });

  return Analytics;
}; 