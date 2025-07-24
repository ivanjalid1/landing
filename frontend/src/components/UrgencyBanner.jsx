import React, { useState, useEffect } from 'react';
import { ClockIcon } from '@heroicons/react/24/solid';

export default function UrgencyBanner({
  message = "¡Oferta especial por tiempo limitado!",
  discountCode = "TOP30",
  endTime // Timestamp de fin de la oferta
}) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = new Date(endTime) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutos: Math.floor((difference / 1000 / 60) % 60),
        segundos: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <div className="relative overflow-hidden" id="urgency-banner" style={{ opacity: '1 !important', visibility: 'visible !important' }}>
      {/* Banner principal */}
      <div className="bg-gradient-cta text-white py-4 px-4 text-center relative overflow-hidden" style={{ opacity: '1 !important' }}>
        {/* Efecto de brillo */}
        <div className="absolute inset-0 overflow-hidden" style={{ opacity: '1 !important' }}>
          <div className="absolute inset-0 transform -skew-x-12 animate-shine bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        {/* Contenido */}
        <div className="relative z-10" style={{ opacity: '1 !important' }}>
          <p className="text-lg font-semibold mb-2" style={{ opacity: '1 !important' }}>{message}</p>
          
          {/* Contador */}
          {Object.keys(timeLeft).length > 0 && (
            <div className="flex justify-center items-center space-x-4 mb-3" style={{ opacity: '1 !important' }}>
              <ClockIcon className="h-5 w-5" />
              <div className="bg-gray-900 text-warning border-2 border-warning rounded-lg px-4 py-2 font-mono font-bold" style={{ opacity: '1 !important' }}>
                {`${timeLeft.horas.toString().padStart(2, '0')}:${timeLeft.minutos.toString().padStart(2, '0')}:${timeLeft.segundos.toString().padStart(2, '0')}`}
              </div>
            </div>
          )}

          {/* Código de descuento */}
          <div className="inline-block bg-success px-4 py-2 rounded-md font-bold tracking-wider" style={{ opacity: '1 !important' }}>
            {discountCode}
          </div>
        </div>
      </div>
    </div>
  );
} 