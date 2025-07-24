const redis = require('redis');
require('dotenv').config();

// Configuración de Redis
const redisClient = redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
  socket: {
    connectTimeout: 10000,
    lazyConnect: true
  }
});

// Manejo de errores de Redis
redisClient.on('error', (err) => {
  console.error('❌ Error de Redis:', err);
});

redisClient.on('connect', () => {
  console.log('✅ Redis conectado correctamente');
});

redisClient.on('ready', () => {
  console.log('✅ Redis listo para operaciones');
});

// Función para conectar Redis
const connectRedis = async () => {
  try {
    await redisClient.connect();
    return true;
  } catch (error) {
    console.error('❌ Error al conectar Redis:', error);
    return false;
  }
};

// Función para obtener datos del cache
const getCache = async (key) => {
  try {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('❌ Error al obtener cache:', error);
    return null;
  }
};

// Función para guardar datos en cache
const setCache = async (key, data, expireTime = 3600) => {
  try {
    await redisClient.setEx(key, expireTime, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('❌ Error al guardar cache:', error);
    return false;
  }
};

// Función para eliminar cache
const deleteCache = async (key) => {
  try {
    await redisClient.del(key);
    return true;
  } catch (error) {
    console.error('❌ Error al eliminar cache:', error);
    return false;
  }
};

// Función para limpiar todo el cache
const clearCache = async () => {
  try {
    await redisClient.flushAll();
    return true;
  } catch (error) {
    console.error('❌ Error al limpiar cache:', error);
    return false;
  }
};

module.exports = {
  redisClient,
  connectRedis,
  getCache,
  setCache,
  deleteCache,
  clearCache
}; 