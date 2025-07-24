import React, { useState, useEffect, useRef } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [loading, setLoading] = useState(true);
  const canvasRef = useRef(null);
  const graphData = {
    '7d': {
      before: [35, 38, 32, 42, 37, 34, 40],
      after: [65, 72, 68, 85, 78, 75, 88],
      labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
    },
    '14d': {
      before: [38, 42, 36, 45, 40, 37, 43, 39, 41, 38, 44, 41, 43, 45],
      after: [70, 75, 72, 88, 82, 78, 85, 80, 83, 79, 87, 84, 86, 90],
      labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14']
    }
  };

  // Referencias para animación de números
  const roiRef = useRef(null);
  const convRef = useRef(null);
  const ctrRef = useRef(null);
  const campRef = useRef(null);
  const invRef = useRef(null);

  useEffect(() => {
    // Inicializar animaciones y gráfico
    animateNumbers();
    const timer = setTimeout(() => {
      updateGraph();
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [timeRange]);

  useEffect(() => {
    // Manejar resize del gráfico
    const handleResize = () => {
      updateGraph();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const animateNumbers = () => {
    const animateValue = (ref, start, end, duration = 2000) => {
      if (!ref.current) return;
      
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(progress === 1 ? end : (start + (end - start) * easeOutQuart));
        
        if (ref.current) {
          ref.current.textContent = current + (ref === ctrRef ? '%' : '');
        }
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      
      window.requestAnimationFrame(step);
    };

    // Animar cada número
    animateValue(roiRef, 0, 350);
    animateValue(convRef, 0, 127.4);
    animateValue(ctrRef, 0, 4.8);
    animateValue(campRef, 0, 10547);
    animateValue(invRef, 0, 847.5);
  };

  const updateGraph = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const data = graphData[timeRange];
    
    // Obtener dimensiones reales del canvas
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    
    // Limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Configurar estilos
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Dibujar línea optimizada
    ctx.beginPath();
    ctx.strokeStyle = '#f97316';
    ctx.lineWidth = 3;
    ctx.setLineDash([]);
    
    const drawLine = (points, isAfter = true) => {
      const width = rect.width;
      const height = rect.height;
      const maxValue = Math.max(...data.after, ...data.before);
      const padding = 30;

      points.forEach((value, index) => {
        const x = padding + (width - padding * 2) * (index / (points.length - 1));
        const y = height - (padding + (height - padding * 2) * (value / maxValue));
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      if (isAfter) {
        // Agregar glow para la línea optimizada
        ctx.shadowColor = '#f97316';
        ctx.shadowBlur = 10;
        ctx.strokeStyle = '#f97316';
      } else {
        ctx.shadowBlur = 0;
        ctx.strokeStyle = '#475569';
        ctx.setLineDash([5, 5]);
      }
      
      ctx.stroke();
    };

    // Dibujar líneas
    drawLine(data.after, true);
    ctx.beginPath();
    drawLine(data.before, false);

    // Dibujar etiquetas
    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    const padding = 30;
    
    data.labels.forEach((label, index) => {
      const x = padding + (rect.width - padding * 2) * (index / (data.labels.length - 1));
      ctx.fillText(label, x, rect.height - 10);
    });

    // Dibujar puntos de datos
    data.after.forEach((value, index) => {
      const x = padding + (rect.width - padding * 2) * (index / (data.after.length - 1));
      const y = rect.height - (padding + (rect.height - padding * 2) * (value / Math.max(...data.after, ...data.before)));
      
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#f97316';
      ctx.fill();
      
      // Punto de glow
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(249, 115, 22, 0.3)';
      ctx.fill();
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header con filtros */}
      <div className="bg-tech-800/30 backdrop-blur-sm rounded-2xl p-6 border border-tech-700/30">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Analytics & Estadísticas</h1>
            <p className="text-tech-300">Métricas de rendimiento y estadísticas de publicidad</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 bg-tech-800/50 border border-tech-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="7d">Últimos 7 días</option>
              <option value="14d">Últimos 14 días</option>
            </select>
          </div>
        </div>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-tech-800/30 backdrop-blur-sm rounded-2xl p-6 border border-tech-700/30">
          <div className="text-tech-400 text-sm mb-1">ROI Promedio</div>
          <div className="text-xl font-bold text-white mb-1 group-hover:text-primary-400 transition-colors duration-300">
            <span ref={roiRef}>350</span>%
          </div>
          <div className="flex items-center gap-1 text-primary-500 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
            </svg>
            <span>+42%</span>
          </div>
        </div>

        <div className="bg-tech-800/30 backdrop-blur-sm rounded-2xl p-6 border border-tech-700/30">
          <div className="text-tech-400 text-sm mb-1">Conversiones</div>
          <div className="text-xl font-bold text-white mb-1 group-hover:text-primary-400 transition-colors duration-300">
            <span ref={convRef}>127.4</span>%
          </div>
          <div className="flex items-center gap-1 text-primary-500 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
            </svg>
            <span>+23%</span>
          </div>
        </div>

        <div className="bg-tech-800/30 backdrop-blur-sm rounded-2xl p-6 border border-tech-700/30">
          <div className="text-tech-400 text-sm mb-1">CTR</div>
          <div className="text-xl font-bold text-white mb-1 group-hover:text-primary-400 transition-colors duration-300">
            <span ref={ctrRef}>4.8</span>%
          </div>
          <div className="flex items-center gap-1 text-primary-500 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
            </svg>
            <span>+15%</span>
          </div>
        </div>
      </div>

      {/* Gráfico de conversión */}
      <div className="bg-tech-800/30 backdrop-blur-sm rounded-2xl p-6 border border-tech-700/30">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white">Tasa de Conversión</h3>
            <div className="flex items-center gap-1 text-primary-500 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
              <span>+85%</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary-500"></div>
              <span className="text-xs text-tech-300">Optimizado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-tech-600"></div>
              <span className="text-xs text-tech-300">Sin optimizar</span>
            </div>
          </div>
        </div>
        <div className="graph-container">
          <canvas
            ref={canvasRef}
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Métricas adicionales */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-tech-800/30 backdrop-blur-sm rounded-2xl p-6 border border-tech-700/30">
          <div className="flex items-center justify-between mb-1">
            <div className="text-tech-400 text-sm">Campañas Activas</div>
            <div className="text-primary-500 text-sm">+12.5%</div>
          </div>
          <div className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors duration-300">
            <span ref={campRef}>10,547</span>
          </div>
        </div>
        <div className="bg-tech-800/30 backdrop-blur-sm rounded-2xl p-6 border border-tech-700/30">
          <div className="flex items-center justify-between mb-1">
            <div className="text-tech-400 text-sm">Inversión Total</div>
            <div className="text-primary-500 text-sm">+28.4%</div>
          </div>
          <div className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors duration-300">
            $<span ref={invRef}>847.5</span>K
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard; 