import React from 'react';
import { ShieldCheckIcon } from '@heroicons/react/24/solid';

export default function AccountCard({
  platform,
  price,
  availability,
  features,
  ctaText = 'Solicitar Cuenta',
  onCtaClick
}) {
  return (
    <div 
      className="relative bg-gradient-card rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-card-hover"
      style={{ opacity: '1 !important', visibility: 'visible !important' }}
    >
      {/* Barra superior decorativa */}
      <div className="h-1 bg-gradient-primary" style={{ opacity: '1 !important' }} />

      <div className="p-6" style={{ opacity: '1 !important' }}>
        {/* Encabezado */}
        <div className="flex justify-between items-start mb-6" style={{ opacity: '1 !important' }}>
          <div style={{ opacity: '1 !important' }}>
            <span className="text-secondary-cyan font-semibold uppercase text-sm" style={{ opacity: '1 !important' }}>
              {platform}
            </span>
            <div className="mt-2 text-2xl font-bold text-primary-blue" style={{ opacity: '1 !important' }}>
              ${price}
            </div>
          </div>
          <span className={`
            px-3 py-1 rounded-full text-xs font-semibold
            ${availability > 5 
              ? 'bg-success/10 text-success' 
              : 'bg-danger/10 text-danger'}
          `} style={{ opacity: '1 !important' }}>
            {availability} disponibles
          </span>
        </div>

        {/* Características */}
        <ul className="space-y-3 mb-6" style={{ opacity: '1 !important' }}>
          {Array.isArray(features) && features.map((feature, index) => (
            <li key={index} className="flex items-center text-gray-600" style={{ opacity: '1 !important' }}>
              <ShieldCheckIcon className="h-5 w-5 text-secondary-cyan mr-2" />
              {feature}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          onClick={onCtaClick}
          className="w-full bg-primary-blue text-white py-3 px-4 rounded-lg font-semibold 
                   transition-all duration-300 hover:bg-primary-blue/90 hover:shadow-lg 
                   hover:-translate-y-1"
          style={{ opacity: '1 !important' }}
        >
          {ctaText}
        </button>

        {/* Trust Badge */}
        <div className="mt-4 flex items-center justify-center text-sm text-gray-600" style={{ opacity: '1 !important' }}>
          <ShieldCheckIcon className="h-4 w-4 text-success mr-1" />
          Cuenta Verificada
        </div>
      </div>
    </div>
  );
} 