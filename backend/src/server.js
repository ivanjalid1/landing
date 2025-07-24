require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');
const compression = require('compression');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const { syncDatabase } = require('./config/database');
const { connectRedis } = require('./config/redis');

const app = express();

// Configuración de seguridad básica
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// Compresión gzip para reducir tamaño de respuestas
app.use(compression());

// CORS configurado para múltiples orígenes
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:4321',
    'http://localhost:4322',
    'http://localhost:5173',
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting mejorado para +1000 usuarios
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000, // 15 minutos
  max: parseInt(process.env.RATE_LIMIT_MAX) || 1000, // 1000 requests por ventana
  message: {
    error: 'Demasiadas peticiones desde esta IP, intenta de nuevo más tarde'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Slow down para prevenir spam (configuración corregida)
const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutos
  delayAfter: 100, // Permitir 100 requests sin delay
  delayMs: () => 500, // Configuración corregida para v2
  validate: { delayMs: false } // Deshabilitar validación
});

// Aplicar rate limiting
app.use('/api/', limiter);
app.use('/api/', speedLimiter);

// Parsers optimizados
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Middleware de logging para monitoreo
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`);
  });
  next();
});

// Rutas
app.use('/api', routes);

// Health check mejorado
app.get('/health', async (req, res) => {
  try {
    const redisStatus = await require('./config/redis').redisClient.ping();
    res.json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      redis: redisStatus === 'PONG' ? 'connected' : 'disconnected',
      workers: process.env.WORKER_COUNT || require('os').cpus().length
    });
  } catch (error) {
    res.json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      redis: 'disconnected',
      workers: process.env.WORKER_COUNT || require('os').cpus().length
    });
  }
});

// Manejo de errores
app.use(errorHandler);

// Iniciar servidor
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    console.log('🚀 Iniciando servidor optimizado para +1000 usuarios...');
    
    // Conectar Redis (opcional)
    try {
      const redisConnected = await connectRedis();
      if (redisConnected) {
        console.log('✅ Redis conectado correctamente');
      } else {
        console.log('⚠️ Redis no disponible, continuando sin cache');
      }
    } catch (error) {
      console.log('⚠️ Redis no disponible, continuando sin cache');
    }
    
    // Sincronizar base de datos
    await syncDatabase();
    
    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
      console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
      console.log(`📊 Workers: ${process.env.WORKER_COUNT || require('os').cpus().length}`);
      console.log(`🔗 API disponible en: http://localhost:${PORT}/api`);
      console.log(`💚 Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
}

startServer(); 