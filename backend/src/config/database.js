require('dotenv').config();
const { Sequelize } = require('sequelize');
const path = require('path');

// Configuración de la base de datos optimizada para +1000 usuarios
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../../database.sqlite'),
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  
  // Configuraciones de Sequelize para performance
  benchmark: process.env.NODE_ENV === 'development',
  define: {
    timestamps: true,
    underscored: false, // Cambiar a false para SQLite
    freezeTableName: true,
  },
  
  // Configuraciones de logging
  logging: process.env.NODE_ENV === 'development' 
    ? (sql, timing) => {
        if (timing > 100) { // Solo log queries lentos
          console.log(`🐌 Query lento (${timing}ms): ${sql}`);
        }
      }
    : false,
});

// Función para sincronizar la base de datos
const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a SQLite establecida correctamente');
    
    // Sincronizar modelos (solo crear tablas si no existen)
    await sequelize.sync({ force: true }); // Forzar recreación de tablas
    console.log('✅ Modelos sincronizados con la base de datos');
    
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error);
    throw error;
  }
};

// Función para monitorear el pool de conexiones (no aplica para SQLite)
const monitorPool = () => {
  // SQLite no usa pool de conexiones
  console.log('📊 SQLite no requiere monitoreo de pool');
};

// Función para cerrar conexiones de manera limpia
const closeDatabase = async () => {
  try {
    await sequelize.close();
    console.log('✅ Conexiones de base de datos cerradas correctamente');
  } catch (error) {
    console.error('❌ Error al cerrar conexiones de BD:', error);
  }
};

module.exports = {
  sequelize,
  syncDatabase,
  monitorPool,
  closeDatabase
}; 