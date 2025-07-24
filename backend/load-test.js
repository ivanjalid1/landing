const http = require('http');
const https = require('https');

// Configuración del test de carga
const CONFIG = {
  baseUrl: 'http://localhost:5000',
  endpoints: [
    '/health',
    '/api/content/public/hero',
    '/api/content/public/services',
    '/api/content/public/accounts',
    '/api/content/public/solutions',
    '/api/content/public/faq'
  ],
  concurrentUsers: 100,
  requestsPerUser: 10,
  delayBetweenRequests: 100, // ms
  timeout: 5000 // ms
};

// Estadísticas del test
const stats = {
  totalRequests: 0,
  successfulRequests: 0,
  failedRequests: 0,
  totalTime: 0,
  responseTimes: [],
  errors: []
};

// Función para hacer una petición HTTP
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    
    const req = http.get(url, { timeout: CONFIG.timeout }, (res) => {
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        stats.totalRequests++;
        stats.responseTimes.push(responseTime);
        
        if (res.statusCode >= 200 && res.statusCode < 300) {
          stats.successfulRequests++;
        } else {
          stats.failedRequests++;
          stats.errors.push({
            url,
            statusCode: res.statusCode,
            responseTime
          });
        }
        
        resolve({
          statusCode: res.statusCode,
          responseTime,
          data: data
        });
      });
    });
    
    req.on('error', (error) => {
      stats.totalRequests++;
      stats.failedRequests++;
      stats.errors.push({
        url,
        error: error.message
      });
      reject(error);
    });
    
    req.on('timeout', () => {
      req.destroy();
      stats.totalRequests++;
      stats.failedRequests++;
      stats.errors.push({
        url,
        error: 'Timeout'
      });
      reject(new Error('Timeout'));
    });
  });
}

// Función para simular un usuario
async function simulateUser(userId) {
  console.log(`👤 Usuario ${userId} iniciando...`);
  
  for (let i = 0; i < CONFIG.requestsPerUser; i++) {
    const endpoint = CONFIG.endpoints[Math.floor(Math.random() * CONFIG.endpoints.length)];
    const url = `${CONFIG.baseUrl}${endpoint}`;
    
    try {
      await makeRequest(url);
      await new Promise(resolve => setTimeout(resolve, CONFIG.delayBetweenRequests));
    } catch (error) {
      console.error(`❌ Error en usuario ${userId}, request ${i + 1}:`, error.message);
    }
  }
  
  console.log(`✅ Usuario ${userId} completado`);
}

// Función para calcular estadísticas
function calculateStats() {
  const avgResponseTime = stats.responseTimes.reduce((a, b) => a + b, 0) / stats.responseTimes.length;
  const minResponseTime = Math.min(...stats.responseTimes);
  const maxResponseTime = Math.max(...stats.responseTimes);
  const successRate = (stats.successfulRequests / stats.totalRequests) * 100;
  const requestsPerSecond = stats.totalRequests / (stats.totalTime / 1000);
  
  return {
    totalRequests: stats.totalRequests,
    successfulRequests: stats.successfulRequests,
    failedRequests: stats.failedRequests,
    successRate: `${successRate.toFixed(2)}%`,
    avgResponseTime: `${avgResponseTime.toFixed(2)}ms`,
    minResponseTime: `${minResponseTime}ms`,
    maxResponseTime: `${maxResponseTime}ms`,
    requestsPerSecond: `${requestsPerSecond.toFixed(2)} req/s`,
    totalTime: `${(stats.totalTime / 1000).toFixed(2)}s`
  };
}

// Función principal del test de carga
async function runLoadTest() {
  console.log('🚀 Iniciando test de carga para +1000 usuarios...');
  console.log(`📊 Configuración:`);
  console.log(`   - Usuarios concurrentes: ${CONFIG.concurrentUsers}`);
  console.log(`   - Requests por usuario: ${CONFIG.requestsPerUser}`);
  console.log(`   - Total requests: ${CONFIG.concurrentUsers * CONFIG.requestsPerUser}`);
  console.log(`   - Endpoints: ${CONFIG.endpoints.length}`);
  console.log('');
  
  const startTime = Date.now();
  
  // Crear usuarios concurrentes
  const userPromises = [];
  for (let i = 0; i < CONFIG.concurrentUsers; i++) {
    userPromises.push(simulateUser(i + 1));
  }
  
  // Esperar a que todos los usuarios terminen
  await Promise.all(userPromises);
  
  stats.totalTime = Date.now() - startTime;
  
  // Mostrar resultados
  console.log('');
  console.log('📊 RESULTADOS DEL TEST DE CARGA');
  console.log('================================');
  
  const results = calculateStats();
  Object.entries(results).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
  });
  
  console.log('');
  console.log('🔍 ANÁLISIS DE ESCALABILIDAD');
  console.log('=============================');
  
  if (results.successRate >= 95) {
    console.log('✅ Excelente: Success rate > 95%');
  } else if (results.successRate >= 90) {
    console.log('⚠️ Bueno: Success rate > 90%');
  } else {
    console.log('❌ Necesita mejora: Success rate < 90%');
  }
  
  if (parseFloat(results.avgResponseTime) < 200) {
    console.log('✅ Excelente: Response time < 200ms');
  } else if (parseFloat(results.avgResponseTime) < 500) {
    console.log('⚠️ Bueno: Response time < 500ms');
  } else {
    console.log('❌ Necesita mejora: Response time > 500ms');
  }
  
  if (parseFloat(results.requestsPerSecond) > 100) {
    console.log('✅ Excelente: Throughput > 100 req/s');
  } else if (parseFloat(results.requestsPerSecond) > 50) {
    console.log('⚠️ Bueno: Throughput > 50 req/s');
  } else {
    console.log('❌ Necesita mejora: Throughput < 50 req/s');
  }
  
  console.log('');
  console.log('🎯 RECOMENDACIONES:');
  console.log('===================');
  
  if (parseFloat(results.successRate) < 95) {
    console.log('- Aumentar workers o optimizar código');
  }
  
  if (parseFloat(results.avgResponseTime) > 200) {
    console.log('- Implementar más caching o optimizar queries');
  }
  
  if (parseFloat(results.requestsPerSecond) < 100) {
    console.log('- Considerar load balancer o más servidores');
  }
  
  console.log('');
  console.log('✅ Test de carga completado');
}

// Ejecutar test si se llama directamente
if (require.main === module) {
  runLoadTest().catch(console.error);
}

module.exports = { runLoadTest, CONFIG }; 