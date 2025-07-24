// Sistema de cache para el frontend
class FrontendCache {
  constructor() {
    this.cache = new Map();
    this.maxAge = 5 * 60 * 1000; // 5 minutos por defecto
  }

  // Generar clave única para el cache
  generateKey(url, params = {}) {
    const paramString = JSON.stringify(params);
    return `${url}:${paramString}`;
  }

  // Obtener datos del cache
  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;

    // Verificar si el cache ha expirado
    if (Date.now() > item.expires) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  // Guardar datos en cache
  set(key, data, maxAge = this.maxAge) {
    this.cache.set(key, {
      data,
      expires: Date.now() + maxAge
    });
  }

  // Limpiar cache expirado
  cleanup() {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expires) {
        this.cache.delete(key);
      }
    }
  }

  // Limpiar todo el cache
  clear() {
    this.cache.clear();
  }

  // Obtener estadísticas del cache
  getStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }
}

// Crear instancia global del cache
const frontendCache = new FrontendCache();

// Limpiar cache expirado cada 5 minutos
setInterval(() => {
  frontendCache.cleanup();
}, 5 * 60 * 1000);

// Función mejorada para obtener contenido con cache
export async function fetchServerContentWithCache(section, options = {}) {
  const cacheKey = frontendCache.generateKey(`content:${section}`, options);
  
  // Intentar obtener del cache primero
  const cachedData = frontendCache.get(cacheKey);
  if (cachedData) {
    console.log(`✅ Cache hit para ${section}`);
    return cachedData;
  }

  try {
    // Timeout de 3 segundos para evitar que se quede colgado
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    
    const res = await fetch(`http://localhost:5000/api/content/public/${section}`, {
      signal: controller.signal,
      headers: {
        'Cache-Control': 'max-age=300', // 5 minutos
        'Accept': 'application/json'
      }
    });
    
    clearTimeout(timeoutId);
    
    if (!res.ok) {
      console.warn(`❌ Error al obtener contenido de ${section}: ${res.status} ${res.statusText}`);
      return null;
    }
    
    const json = await res.json();
    if (json.success && json.data && json.data.data) {
      console.log(`✅ Contenido de ${section} obtenido correctamente desde la API`);
      
      // Guardar en cache por 5 minutos
      frontendCache.set(cacheKey, json.data.data, 5 * 60 * 1000);
      
      return json.data.data;
    }
    
    console.warn(`⚠️ Respuesta inesperada para ${section}:`, json);
    return null;
  } catch (e) {
    if (e.name === 'AbortError') {
      console.warn(`⏰ Timeout al obtener contenido de ${section} - usando contenido hardcodeado`);
    } else {
      console.warn(`❌ Error al obtener contenido de ${section}:`, e.message);
    }
    return null;
  }
}

// Función para limpiar cache específico
export function clearContentCache(section) {
  const keys = frontendCache.getStats().keys;
  keys.forEach(key => {
    if (key.includes(`content:${section}`)) {
      frontendCache.cache.delete(key);
    }
  });
}

// Función para obtener estadísticas del cache
export function getCacheStats() {
  return frontendCache.getStats();
}

// Exportar la función original para compatibilidad
export { fetchServerContentWithCache as fetchServerContent }; 