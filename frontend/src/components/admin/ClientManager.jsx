import React, { useState, useEffect } from 'react';

const ClientManager = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      setLoading(true);
      // Simular datos de clientes
      const mockClients = [
        {
          id: 1,
          name: 'Juan Pérez',
          email: 'juan@empresa.com',
          phone: '+1 (555) 123-4567',
          telegram: '@juan_perez',
          status: 'active',
          accounts: [
            { type: 'Facebook Ads', status: 'active', created: '2024-01-15' },
            { type: 'Instagram Business', status: 'active', created: '2024-02-20' }
          ],
          totalSpent: 1250,
          lastActivity: '2024-06-15',
          notes: 'Cliente premium, muy satisfecho con el servicio'
        },
        {
          id: 2,
          name: 'María García',
          email: 'maria@startup.com',
          phone: '+1 (555) 987-6543',
          telegram: '@maria_garcia',
          status: 'pending',
          accounts: [
            { type: 'Google Ads', status: 'verifying', created: '2024-06-10' }
          ],
          totalSpent: 299,
          lastActivity: '2024-06-10',
          notes: 'Nuevo cliente, primera compra'
        },
        {
          id: 3,
          name: 'Carlos López',
          email: 'carlos@agency.com',
          phone: '+1 (555) 456-7890',
          telegram: '@carlos_lopez',
          status: 'active',
          accounts: [
            { type: 'Facebook Ads', status: 'active', created: '2024-03-05' },
            { type: 'TikTok Ads', status: 'active', created: '2024-04-12' },
            { type: 'Google Ads', status: 'active', created: '2024-05-18' }
          ],
          totalSpent: 2100,
          lastActivity: '2024-06-14',
          notes: 'Agencia de marketing, cliente frecuente'
        }
      ];
      
      setClients(mockClients);
    } catch (error) {
      console.error('Error cargando clientes:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-primary-500/20 text-primary-400';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400';
      case 'suspended': return 'bg-red-500/20 text-red-400';
      default: return 'bg-tech-700/50 text-tech-400';
    }
  };

  const getAccountStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-primary-400';
      case 'verifying': return 'text-yellow-400';
      case 'suspended': return 'text-red-400';
      default: return 'text-tech-400';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const filteredClients = clients.filter(client => {
    if (filter === 'all') return true;
    return client.status === filter;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-tech-800/30 backdrop-blur-sm rounded-2xl p-6 border border-tech-700/30">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Gestión de Clientes</h1>
            <p className="text-tech-300">Administra clientes, cuentas y seguimiento</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 bg-tech-800/50 border border-tech-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">Todos los clientes</option>
              <option value="active">Clientes activos</option>
              <option value="pending">Pendientes</option>
              <option value="suspended">Suspendidos</option>
            </select>
            <button 
              onClick={() => setShowModal(true)}
              className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl overflow-hidden shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <i className="fas fa-plus relative"></i>
              <span className="relative font-semibold">Nuevo Cliente</span>
            </button>
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-tech-800/30 backdrop-blur-sm rounded-2xl p-6 border border-tech-700/30">
          <div className="flex items-center">
            <div className="p-3 rounded-xl bg-tech-700/50 text-primary-400">
              <i className="fas fa-users text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-tech-300">Total Clientes</p>
              <p className="text-2xl font-bold text-white">{clients.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-tech-800/30 backdrop-blur-sm rounded-2xl p-6 border border-tech-700/30">
          <div className="flex items-center">
            <div className="p-3 rounded-xl bg-tech-700/50 text-primary-400">
              <i className="fas fa-user-check text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-tech-300">Clientes Activos</p>
              <p className="text-2xl font-bold text-white">
                {clients.filter(c => c.status === 'active').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-tech-800/30 backdrop-blur-sm rounded-2xl p-6 border border-tech-700/30">
          <div className="flex items-center">
            <div className="p-3 rounded-xl bg-tech-700/50 text-primary-400">
              <i className="fas fa-user-shield text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-tech-300">Cuentas Totales</p>
              <p className="text-2xl font-bold text-white">
                {clients.reduce((total, client) => total + client.accounts.length, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-tech-800/30 backdrop-blur-sm rounded-2xl p-6 border border-tech-700/30">
          <div className="flex items-center">
            <div className="p-3 rounded-xl bg-tech-700/50 text-primary-400">
              <i className="fas fa-dollar-sign text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-tech-300">Ingresos Totales</p>
              <p className="text-2xl font-bold text-white">
                {formatCurrency(clients.reduce((total, client) => total + client.totalSpent, 0))}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Clientes */}
      <div className="bg-tech-800/30 backdrop-blur-sm rounded-2xl border border-tech-700/30 overflow-hidden">
        <div className="px-6 py-4 border-b border-tech-700/30">
          <h3 className="text-lg font-semibold text-white">Lista de Clientes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-tech-700/30">
            <thead className="bg-tech-800/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-tech-300 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-tech-300 uppercase tracking-wider">
                  Contacto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-tech-300 uppercase tracking-wider">
                  Cuentas
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-tech-300 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-tech-300 uppercase tracking-wider">
                  Total Gastado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-tech-300 uppercase tracking-wider">
                  Última Actividad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-tech-300 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-tech-700/30">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-tech-800/50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-white">{client.name}</div>
                      <div className="text-sm text-tech-300">{client.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{client.phone}</div>
                    <div className="text-sm text-tech-300">{client.telegram}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      {client.accounts.map((account, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <span className="text-sm text-white">{account.type}</span>
                          <span className={`text-xs ${getAccountStatusColor(account.status)}`}>
                            {account.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(client.status)}`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {formatCurrency(client.totalSpent)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-tech-300">
                    {new Date(client.lastActivity).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => setSelectedClient(client)}
                        className="text-primary-400 hover:text-primary-500 transition-colors duration-200"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="text-primary-400 hover:text-primary-500 transition-colors duration-200">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="text-red-400 hover:text-red-500 transition-colors duration-200">
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Detalles del Cliente */}
      {selectedClient && (
        <div className="fixed inset-0 bg-tech-900/80 backdrop-blur-sm overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-6 border w-[480px] shadow-xl rounded-2xl bg-tech-800/95 border-tech-700/30">
            <div className="mt-3">
              <h3 className="text-xl font-bold text-white mb-6">Detalles del Cliente</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-tech-300">Nombre</label>
                  <p className="text-base text-white mt-1">{selectedClient.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-tech-300">Email</label>
                  <p className="text-base text-white mt-1">{selectedClient.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-tech-300">Teléfono</label>
                  <p className="text-base text-white mt-1">{selectedClient.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-tech-300">Telegram</label>
                  <p className="text-base text-white mt-1">{selectedClient.telegram}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-tech-300">Notas</label>
                  <p className="text-base text-white mt-1">{selectedClient.notes}</p>
                </div>
              </div>
              <div className="mt-8 flex justify-end space-x-4">
                <button
                  onClick={() => setSelectedClient(null)}
                  className="px-4 py-2 bg-tech-700/50 text-white rounded-xl hover:bg-tech-700/70 transition-colors duration-200"
                >
                  Cerrar
                </button>
                <button className="group relative inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl overflow-hidden shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-300 hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative font-semibold">Editar Cliente</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientManager; 