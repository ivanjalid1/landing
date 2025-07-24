import React, { useState, useEffect } from 'react';

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Simular notificaciones en tiempo real
    const mockNotifications = [
      {
        id: 1,
        type: 'sale',
        title: 'Nueva Venta',
        message: 'Facebook Ads Premium vendido por $299',
        time: '2 minutos',
        read: false
      },
      {
        id: 2,
        type: 'support',
        title: 'Ticket de Soporte',
        message: 'Nuevo ticket de soporte de Juan Pérez',
        time: '15 minutos',
        read: false
      },
      {
        id: 3,
        type: 'account',
        title: 'Cuenta Verificada',
        message: 'Cuenta Instagram Business verificada exitosamente',
        time: '1 hora',
        read: true
      },
      {
        id: 4,
        type: 'system',
        title: 'Mantenimiento',
        message: 'Sistema actualizado correctamente',
        time: '2 horas',
        read: true
      }
    ];

    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read).length);
  }, []);

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    setUnreadCount(0);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'sale': return 'fas fa-shopping-cart text-primary-400';
      case 'support': return 'fas fa-headset text-primary-400';
      case 'account': return 'fas fa-user-check text-primary-400';
      case 'system': return 'fas fa-cog text-primary-400';
      default: return 'fas fa-info-circle text-primary-400';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'sale': return 'border-l-primary-500 bg-tech-800/50';
      case 'support': return 'border-l-primary-500 bg-tech-800/50';
      case 'account': return 'border-l-primary-500 bg-tech-800/50';
      case 'system': return 'border-l-primary-500 bg-tech-800/50';
      default: return 'border-l-primary-500 bg-tech-800/50';
    }
  };

  return (
    <div className="relative">
      {/* Botón de notificaciones */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-tech-300 hover:text-white transition-colors"
      >
        <i className="fas fa-bell text-xl"></i>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Panel de notificaciones */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-tech-800/95 backdrop-blur-sm rounded-2xl shadow-xl border border-tech-700/30 z-50">
          <div className="p-4 border-b border-tech-700/30">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Notificaciones</h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-primary-400 hover:text-primary-500 transition-colors duration-200"
                >
                  Marcar todas como leídas
                </button>
              )}
            </div>
          </div>

          <div className="max-h-[480px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-tech-300">
                <i className="fas fa-bell-slash text-3xl mb-3"></i>
                <p>No hay notificaciones</p>
              </div>
            ) : (
              <div className="divide-y divide-tech-700/30">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-l-4 ${getNotificationColor(notification.type)} ${
                      !notification.read ? 'bg-tech-700/30' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="p-2 rounded-xl bg-tech-900/50 border border-tech-700/50">
                        <i className={`${getNotificationIcon(notification.type)}`}></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-white">
                            {notification.title}
                          </p>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-tech-300">
                              {notification.time}
                            </span>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-tech-300 mt-1">
                          {notification.message}
                        </p>
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-xs text-primary-400 hover:text-primary-500 transition-colors duration-200 mt-2"
                          >
                            Marcar como leída
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {notifications.length > 0 && (
            <div className="p-4 border-t border-tech-700/30">
              <a
                href="/admin/notifications"
                className="text-sm text-primary-400 hover:text-primary-500 transition-colors duration-200 text-center block"
              >
                Ver todas las notificaciones
              </a>
            </div>
          )}
        </div>
      )}

      {/* Overlay para cerrar al hacer clic fuera */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-tech-900/20 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default NotificationCenter; 