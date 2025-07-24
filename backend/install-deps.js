const { execSync } = require('child_process');
const fs = require('fs');

console.log('🔧 Instalando dependencias faltantes...');

const missingDeps = [
  'express-slow-down',
  'compression',
  'redis',
  'pm2'
];

try {
  // Instalar dependencias faltantes
  missingDeps.forEach(dep => {
    console.log(`📦 Instalando ${dep}...`);
    execSync(`npm install ${dep}`, { stdio: 'inherit' });
  });

  console.log('✅ Todas las dependencias instaladas correctamente');
  console.log('🚀 Ahora puedes ejecutar: npm run dev');
  
} catch (error) {
  console.error('❌ Error al instalar dependencias:', error.message);
  console.log('💡 Intenta ejecutar manualmente: npm install');
} 