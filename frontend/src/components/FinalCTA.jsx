import React from 'react';
import { ShieldCheckIcon } from '@heroicons/react/24/solid';

export default function FinalCTA({
  title = "¿Listo para impulsar tu marketing digital?",
  subtitle = "Únete a más de 1,000 empresas que confían en nuestras cuentas premium",
  primaryCta = "Comenzar Ahora",
  secondaryCta = "Agendar Demo",
  onPrimaryClick,
  onSecondaryClick
}) {
  return (
    <section className="bg-gradient-hero text-center py-16 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <h2 className="text-4xl font-bold text-white mb-4">
          {title}
        </h2>
        <p className="text-xl text-gray-100/90 mb-8">
          {subtitle}
        </p>

        {/* Botones CTA */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <button
            onClick={onPrimaryClick}
            className="btn-hover-effect bg-gradient-cta text-white px-8 py-4 rounded-lg 
                     font-semibold text-lg transition-all duration-300 
                     hover:shadow-cta transform hover:-translate-y-1"
          >
            {primaryCta}
          </button>
          
          <button
            onClick={onSecondaryClick}
            className="btn-hover-effect border-2 border-white text-white px-8 py-4 
                     rounded-lg font-semibold text-lg transition-all duration-300 
                     hover:bg-white hover:text-primary-dark"
          >
            {secondaryCta}
          </button>
        </div>

        {/* Garantía */}
        <div className="flex justify-center items-center text-success font-semibold">
          <ShieldCheckIcon className="h-5 w-5 mr-2" />
          <span>Garantía de reembolso de 30 días</span>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <span className="bg-success/10 text-success px-4 py-1 rounded-full text-sm font-semibold">
            Soporte 24/7
          </span>
          <span className="bg-secondary-purple/10 text-secondary-purple px-4 py-1 rounded-full text-sm font-semibold">
            Cuentas Premium
          </span>
          <span className="bg-secondary-cyan/10 text-secondary-cyan px-4 py-1 rounded-full text-sm font-semibold">
            Facturación Legal
          </span>
        </div>
      </div>
    </section>
  );
} 