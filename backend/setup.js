#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Configurando Backend de Top Ads...\n');

// Verificar si existe .env
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.log('📝 Creando archivo .env...');
  
  const envContent = `# Configuración de Base de Datos
DB_HOST=localhost
DB_PORT=5432
DB_NAME=topads_db
DB_USER=postgres
DB_PASSWORD=admin

# Configuración del Servidor
PORT=5000
NODE_ENV=development

# Configuración de Seguridad
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100

# Configuración de CORS
FRONTEND_URL=http://localhost:4321

# JWT Secret (cambiar en producción)
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# Configuración de Logging
LOG_LEVEL=info
`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ Archivo .env creado');
} else {
  console.log('✅ Archivo .env ya existe');
}

// Verificar dependencias
console.log('\n📦 Verificando dependencias...');
try {
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
  console.log('✅ package.json encontrado');
  
  // Verificar si node_modules existe
  const nodeModulesPath = path.join(__dirname, 'node_modules');
  if (!fs.existsSync(nodeModulesPath)) {
    console.log('📦 Instalando dependencias...');
    execSync('npm install', { stdio: 'inherit', cwd: __dirname });
    console.log('✅ Dependencias instaladas');
  } else {
    console.log('✅ node_modules ya existe');
  }
} catch (error) {
  console.error('❌ Error verificando dependencias:', error.message);
  process.exit(1);
}

// Verificar estructura de directorios
console.log('\n📁 Verificando estructura de directorios...');
const requiredDirs = [
  'src',
  'src/models',
  'src/controllers',
  'src/routes',
  'src/middleware',
  'src/config',
  'src/seeders',
  'src/validators'
];

requiredDirs.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✅ Directorio ${dir} creado`);
  } else {
    console.log(`✅ Directorio ${dir} ya existe`);
  }
});

// Verificar archivos críticos
console.log('\n📄 Verificando archivos críticos...');
const criticalFiles = [
  'src/server.js',
  'src/config/database.js',
  'src/models/Content.js',
  'src/models/User.js',
  'src/seeders/contentSeeder.js'
];

criticalFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} existe`);
  } else {
    console.log(`❌ ${file} NO existe`);
  }
});

// Crear script de inicio rápido
console.log('\n⚡ Creando script de inicio rápido...');
const startScript = `#!/bin/bash
echo "🚀 Iniciando Backend de Top Ads..."

# Verificar si PostgreSQL está corriendo
if ! pg_isready -h localhost -p 5432 > /dev/null 2>&1; then
  echo "❌ PostgreSQL no está corriendo. Por favor inicia PostgreSQL primero."
  exit 1
fi

# Ejecutar seeder
echo "🌱 Ejecutando seeder..."
npm run seed

# Iniciar servidor
echo "🚀 Iniciando servidor..."
npm run dev
`;

const startScriptPath = path.join(__dirname, 'start.sh');
fs.writeFileSync(startScriptPath, startScript);
fs.chmodSync(startScriptPath, '755');
console.log('✅ Script start.sh creado');

// Crear README de setup
console.log('\n📖 Creando README de setup...');
const setupReadme = `# 🚀 Setup Backend - Top Ads

## Requisitos Previos

- Node.js 16+ 
- PostgreSQL 12+
- npm o yarn

## Instalación Rápida

\`\`\`bash
# 1. Instalar dependencias
npm install

# 2. Configurar base de datos
# Asegúrate de que PostgreSQL esté corriendo y crear la base de datos:
# createdb topads_db

# 3. Ejecutar seeder
npm run seed

# 4. Iniciar servidor
npm run dev
\`\`\`

## Variables de Entorno

El archivo \`.env\` se crea automáticamente con valores por defecto.
Modifica según tu configuración:

\`\`\`env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=topads_db
DB_USER=postgres
DB_PASSWORD=admin
PORT=5000
\`\`\`

## Scripts Disponibles

- \`npm run dev\`: Servidor de desarrollo
- \`npm run seed\`: Ejecutar seeder de datos
- \`npm start\`: Servidor de producción
- \`./start.sh\`: Script de inicio completo

## Estructura del Proyecto

\`\`\`
backend/
├── src/
│   ├── config/      # Configuración de BD
│   ├── controllers/ # Controladores de API
│   ├── models/      # Modelos de Sequelize
│   ├── routes/      # Rutas de Express
│   ├── middleware/  # Middleware personalizado
│   ├── seeders/     # Datos iniciales
│   └── validators/  # Validación de entrada
├── .env             # Variables de entorno
└── package.json     # Dependencias
\`\`\`

## API Endpoints

- \`GET /api/health\`: Estado del servidor
- \`GET /api/content/public/:section\`: Contenido público
- \`GET /api/content/:section\`: Contenido protegido
- \`POST /api/content/:section\`: Actualizar contenido

## Base de Datos

- **Motor**: PostgreSQL
- **ORM**: Sequelize
- **Migraciones**: Automáticas
- **Seeder**: Datos de prueba incluidos

## Seguridad

- Rate limiting implementado
- CORS configurado
- Helmet headers
- Input validation
- Error handling centralizado

---

**Estado**: ✅ Listo para desarrollo
**Última actualización**: $(date)
`;

const readmePath = path.join(__dirname, 'SETUP_README.md');
fs.writeFileSync(readmePath, setupReadme);
console.log('✅ SETUP_README.md creado');

console.log('\n🎉 ¡Setup completado exitosamente!');
console.log('\n📋 Próximos pasos:');
console.log('1. Configura PostgreSQL y crea la base de datos');
console.log('2. Ejecuta: npm run seed');
console.log('3. Ejecuta: npm run dev');
console.log('4. El servidor estará disponible en http://localhost:5000');
console.log('\n📖 Revisa SETUP_README.md para más detalles'); 