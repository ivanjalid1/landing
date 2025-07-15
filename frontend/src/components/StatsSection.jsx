import React from 'react';
import { 
  UserGroupIcon, 
  ChartBarIcon, 
  CurrencyDollarIcon, 
  CheckBadgeIcon 
} from '@heroicons/react/24/outline';

const stats = [
  {
    number: '1,000+',
    label: 'Clientes Activos',
    icon: UserGroupIcon,
  },
  {
    number: '95%',
    label: 'Tasa de Aprobación',
    icon: ChartBarIcon,
  },
  {
    number: '$2M+',
    label: 'En Publicidad Gestionada',
    icon: CurrencyDollarIcon,
  },
  {
    number: '24/7',
    label: 'Soporte Premium',
    icon: CheckBadgeIcon,
  },
];

export default function StatsSection() {
  return (
    <section className="bg-primary-dark py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 transform hover:scale-105 transition-transform duration-300"
            >
              <div className="inline-block">
                <stat.icon className="h-12 w-12 text-secondary-cyan mb-4" />
              </div>
              <div className="text-4xl font-bold text-secondary-cyan">
                {stat.number}
              </div>
              <div className="mt-2 text-sm text-gray-100 opacity-80">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 