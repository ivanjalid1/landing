import React, { useState, useEffect } from 'react';

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState({
    overview: {
      totalRevenue: 0,
      totalAccounts: 0,
      activeCampaigns: 0,
      conversionRate: 0
    },
    monthlyStats: [],
    topPerforming: [],
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30d');

  useEffect(() => {
    loadAnalytics();
  }, [timeRange]);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      // Simular datos de analytics (en producción vendría de la API)
      const mockData = {
        overview: {
          totalRevenue: 15420,
          totalAccounts: 47,
          activeCampaigns: 12,
          conversionRate: 23.5
        },
        monthlyStats: [
          { month: 'Ene', revenue: 3200, accounts: 8, campaigns: 3 },
          { month: 'Feb', revenue: 4100, accounts: 12, campaigns: 4 },
          { month: 'Mar', revenue: 3800, accounts: 10, campaigns: 3 },
          { month: 'Abr', revenue: 5200, accounts: 15, campaigns: 5 },
          { month: 'May', revenue: 6100, accounts: 18, campaigns: 6 },
          { month: 'Jun', revenue: 7200, accounts: 22, campaigns: 7 }
        ],
        topPerforming: [
          { name: 'Facebook Ads Premium', revenue: 4200, growth: 15.2 },
          { name: 'Instagram Business', revenue: 3800, growth: 12.8 },
          { name: 'Google Ads Enterprise', revenue: 3200, growth: 8.5 },
          { name: 'TikTok Ads Pro', revenue: 2800, growth: 22.1 }
        ],
        recentActivity: [
          { type: 'sale', message: 'Nueva venta: Facebook Ads Premium', amount: 299, time: '2h' },
          { type: 'support', message: 'Soporte técnico resuelto', time: '4h' },
          { type: 'account', message: 'Cuenta verificada entregada', time: '6h' },
          { type: 'campaign', message: 'Campaña optimizada', time: '8h' }
        ]
      };
      
      setAnalytics(mockData);
    } catch (error) {
      console.error('Error cargando analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'sale': return 'fas fa-shopping-cart text-green-600';
      case 'support': return 'fas fa-headset text-blue-600';
      case 'account': return 'fas fa-user-check text-purple-600';
      case 'campaign': return 'fas fa-chart-line text-orange-600';
      default: return 'fas fa-info-circle text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header con filtros */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics & Estadísticas</h1>
            <p className="text-gray-600">Métricas de rendimiento y estadísticas de publicidad</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="7d">Últimos 7 días</option>
              <option value="30d">Últimos 30 días</option>
              <option value="90d">Últimos 90 días</option>
              <option value="1y">Último año</option>
            </select>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              <i className="fas fa-download mr-2"></i>
              Exportar
            </button>
          </div>
        </div>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <i className="fas fa-dollar-sign text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Ingresos Totales</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(analytics.overview.totalRevenue)}</p>
              <p className="text-sm text-green-600">+12.5% vs mes anterior</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <i className="fas fa-user-shield text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Cuentas Activas</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.overview.totalAccounts}</p>
              <p className="text-sm text-blue-600">+8 nuevas este mes</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <i className="fas fa-chart-line text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Campañas Activas</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.overview.activeCampaigns}</p>
              <p className="text-sm text-purple-600">+3 nuevas campañas</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-orange-100 text-orange-600">
              <i className="fas fa-percentage text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tasa de Conversión</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.overview.conversionRate}%</p>
              <p className="text-sm text-orange-600">+2.1% vs mes anterior</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos y estadísticas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de ingresos mensuales */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ingresos Mensuales</h3>
          <div className="space-y-4">
            {analytics.monthlyStats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">{stat.month}</span>
                <div className="flex items-center space-x-4">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(stat.revenue / 8000) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{formatCurrency(stat.revenue)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Productos mejor rendimiento */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Mejor Rendimiento</h3>
          <div className="space-y-4">
            {analytics.topPerforming.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-600">+{product.growth}% crecimiento</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{formatCurrency(product.revenue)}</p>
                  <p className="text-sm text-green-600">+{product.growth}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Actividad reciente */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Actividad Reciente</h3>
        <div className="space-y-3">
          {analytics.recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className={`p-2 rounded-full bg-white`}>
                <i className={`${getActivityIcon(activity.type)}`}></i>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                <p className="text-xs text-gray-600">Hace {activity.time}</p>
              </div>
              {activity.amount && (
                <span className="text-sm font-semibold text-green-600">
                  {formatCurrency(activity.amount)}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Métricas adicionales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="font-semibold text-gray-900 mb-3">Métricas de Campañas</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">CTR Promedio</span>
              <span className="text-sm font-medium">2.4%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">CPC Promedio</span>
              <span className="text-sm font-medium">$0.85</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">ROAS Promedio</span>
              <span className="text-sm font-medium">3.2x</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="font-semibold text-gray-900 mb-3">Soporte Técnico</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Tickets Abiertos</span>
              <span className="text-sm font-medium">5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Tiempo Respuesta</span>
              <span className="text-sm font-medium">2.3h</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Satisfacción</span>
              <span className="text-sm font-medium">4.8/5</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="font-semibold text-gray-900 mb-3">Cuentas Premium</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Disponibles</span>
              <span className="text-sm font-medium">23</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">En Verificación</span>
              <span className="text-sm font-medium">8</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Tiempo Entrega</span>
              <span className="text-sm font-medium">2.1h</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard; 