const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const { connectRedis } = require('./config/redis');

// Configuración para producción
const WORKER_COUNT = process.env.WORKER_COUNT || numCPUs;

if (cluster.isMaster) {
  console.log(`🚀 Master process ${process.pid} iniciando...`);
  console.log(`📊 Iniciando ${WORKER_COUNT} workers...`);

  // Crear workers
  for (let i = 0; i < WORKER_COUNT; i++) {
    cluster.fork();
  }

  // Manejar eventos de workers
  cluster.on('exit', (worker, code, signal) => {
    console.log(`❌ Worker ${worker.process.pid} murió. Reiniciando...`);
    cluster.fork();
  });

  cluster.on('online', (worker) => {
    console.log(`✅ Worker ${worker.process.pid} online`);
  });

  // Health check del cluster
  setInterval(() => {
    const workers = Object.keys(cluster.workers);
    console.log(`📈 Workers activos: ${workers.length}`);
  }, 30000);

} else {
  // Código del worker
  console.log(`🔄 Worker ${process.pid} iniciando...`);
  
  // Conectar Redis antes de iniciar el servidor
  connectRedis().then(() => {
    require('./server.js');
  }).catch((error) => {
    console.error('❌ Error al conectar Redis en worker:', error);
    process.exit(1);
  });
} 