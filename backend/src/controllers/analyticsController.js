const { Analytics } = require('../models');
const { Op } = require('sequelize');
const moment = require('moment');

// Función auxiliar para calcular el crecimiento
const calculateGrowth = (current, previous) => {
  if (!previous || previous === 0) return 0;
  return ((current - previous) / previous * 100).toFixed(1);
};

// Función auxiliar para agrupar datos por período
const groupDataByPeriod = (data, period) => {
  return data.reduce((acc, item) => {
    const key = moment(item.date).format(period === 'monthly' ? 'MMM' : 'DD MMM');
    if (!acc[key]) {
      acc[key] = {
        revenue: 0,
        accounts: 0,
        campaigns: 0,
        conversions: 0
      };
    }
    acc[key].revenue += parseFloat(item.revenue);
    acc[key].accounts += item.accounts;
    acc[key].campaigns += item.activeCampaigns;
    acc[key].conversions += parseFloat(item.conversionRate);
    return acc;
  }, {});
};

exports.getAnalytics = async (req, res) => {
  try {
    const { timeRange = '30d' } = req.query;
    const endDate = moment();
    const startDate = moment().subtract(parseInt(timeRange), 'days');

    // Obtener datos actuales
    const currentData = await Analytics.findAll({
      where: {
        date: {
          [Op.between]: [startDate.toDate(), endDate.toDate()]
        }
      },
      order: [['date', 'ASC']]
    });

    // Obtener datos del período anterior para comparación
    const previousStartDate = moment(startDate).subtract(parseInt(timeRange), 'days');
    const previousData = await Analytics.findAll({
      where: {
        date: {
          [Op.between]: [previousStartDate.toDate(), startDate.toDate()]
        }
      }
    });

    // Calcular totales actuales
    const currentTotals = currentData.reduce((acc, item) => ({
      revenue: acc.revenue + parseFloat(item.revenue),
      accounts: Math.max(acc.accounts, item.accounts),
      campaigns: Math.max(acc.campaigns, item.activeCampaigns),
      conversionRate: parseFloat(item.conversionRate)
    }), { revenue: 0, accounts: 0, campaigns: 0, conversionRate: 0 });

    // Calcular totales anteriores
    const previousTotals = previousData.reduce((acc, item) => ({
      revenue: acc.revenue + parseFloat(item.revenue),
      accounts: Math.max(acc.accounts, item.accounts),
      campaigns: Math.max(acc.campaigns, item.activeCampaigns),
      conversionRate: parseFloat(item.conversionRate)
    }), { revenue: 0, accounts: 0, campaigns: 0, conversionRate: 0 });

    // Calcular crecimientos
    const growth = {
      revenue: calculateGrowth(currentTotals.revenue, previousTotals.revenue),
      accounts: calculateGrowth(currentTotals.accounts, previousTotals.accounts),
      campaigns: calculateGrowth(currentTotals.campaigns, previousTotals.campaigns),
      conversionRate: calculateGrowth(currentTotals.conversionRate, previousTotals.conversionRate)
    };

    // Agrupar datos por período
    const period = parseInt(timeRange) <= 30 ? 'daily' : 'monthly';
    const groupedData = groupDataByPeriod(currentData, period);

    // Obtener últimas métricas
    const latestMetrics = currentData[currentData.length - 1] || {};

    // Formatear respuesta
    const response = {
      overview: {
        totalRevenue: currentTotals.revenue,
        totalAccounts: currentTotals.accounts,
        activeCampaigns: currentTotals.campaigns,
        conversionRate: currentTotals.conversionRate,
        growth
      },
      timeSeriesData: Object.entries(groupedData).map(([date, data]) => ({
        date,
        ...data
      })),
      metrics: {
        campaigns: {
          ctr: latestMetrics.ctr || 0,
          cpc: latestMetrics.cpc || 0,
          roas: latestMetrics.roas || 0
        },
        support: {
          openTickets: latestMetrics.openTickets || 0,
          responseTime: latestMetrics.responseTime || 0,
          satisfaction: latestMetrics.satisfaction || 0
        },
        accounts: {
          available: latestMetrics.availableAccounts || 0,
          verifying: latestMetrics.verifyingAccounts || 0,
          deliveryTime: latestMetrics.deliveryTime || 0
        }
      }
    };

    res.json(response);
  } catch (error) {
    console.error('Error en getAnalytics:', error);
    res.status(500).json({ error: 'Error al obtener analytics' });
  }
};

exports.updateAnalytics = async (req, res) => {
  try {
    const metrics = req.body;
    
    // Validar datos requeridos
    if (!metrics) {
      return res.status(400).json({ error: 'Se requieren métricas para actualizar' });
    }

    // Crear nuevo registro de analytics
    const analytics = await Analytics.create(metrics);

    res.json(analytics);
  } catch (error) {
    console.error('Error en updateAnalytics:', error);
    res.status(500).json({ error: 'Error al actualizar analytics' });
  }
};

exports.getHistoricalAnalytics = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const where = {};
    if (startDate && endDate) {
      where.date = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      };
    }

    const data = await Analytics.findAll({
      where,
      order: [['date', 'ASC']]
    });

    res.json(data);
  } catch (error) {
    console.error('Error en getHistoricalAnalytics:', error);
    res.status(500).json({ error: 'Error al obtener histórico de analytics' });
  }
}; 