require('dotenv').config();
const { syncDatabase } = require('../config/database');
const { seedContent } = require('../seeders/contentSeeder');

async function setupProduction() {
  try {
    console.log('🚀 Configurando base de datos para producción...');
    
    // Sincronizar modelos
    await syncDatabase();
    
    // Poblar con datos iniciales
    await seedContent();
    
    console.log('✅ Configuración completada exitosamente');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error en la configuración:', error);
    process.exit(1);
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  setupProduction();
}

module.exports = { setupProduction }; 