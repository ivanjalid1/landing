import React from 'react';
import { CheckIcon } from '@heroicons/react/24/solid';

export default function ServiceCard({ 
  title, 
  price, 
  period = 'mes', 
  features, 
  isPopular = false,
  ctaText = 'Empezar Ahora',
  onCtaClick
}) {
  return (
    <div className={`
      relative p-8 bg-gradient-card rounded-xl border transition-all duration-300 hover:shadow-card-hover
      ${isPopular ? 'border-primary-orange scale-105 shadow-card' : 'border-gray-200'}
    `}>
      {/* Badge Popular */}
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-gradient-cta text-white px-4 py-1 rounded-full text-sm font-semibold">
            Más Popular
          </span>
        </div>
      )}

      {/* Encabezado */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-primary-dark mb-4">{title}</h3>
        <div className="flex items-end justify-center">
          <span className="text-4xl font-bold text-primary-blue">${price}</span>
          <span className="text-gray-600 ml-2">/{period}</span>
        </div>
      </div>

      {/* Características */}
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckIcon className="h-6 w-6 text-success flex-shrink-0" />
            <span className="ml-3 text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={onCtaClick}
        className={`
          w-full py-4 px-6 rounded-lg font-semibold transition-all duration-300
          ${isPopular 
            ? 'bg-gradient-cta text-white hover:shadow-cta transform hover:-translate-y-1' 
            : 'bg-primary-blue text-white hover:bg-primary-blue/90'}
        `}
      >
        {ctaText}
      </button>
    </div>
  );
} 