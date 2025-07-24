#!/bin/bash

echo "🚀 Iniciando deployment para +1000 usuarios..."

# Verificar si Redis está instalado
if ! command -v redis-server &> /dev/null; then
    echo "⚠️ Redis no está instalado. Instalando..."
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        sudo apt-get update
        sudo apt-get install -y redis-server
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        brew install redis
    else
        echo "❌ No se pudo instalar Redis automáticamente. Instálalo manualmente."
        exit 1
    fi
fi

# Iniciar Redis si no está corriendo
if ! redis-cli ping &> /dev/null; then
    echo "🔄 Iniciando Redis..."
    redis-server --daemonize yes
    sleep 2
fi

# Verificar conexión a Redis
if redis-cli ping | grep -q "PONG"; then
    echo "✅ Redis conectado correctamente"
else
    echo "❌ Error al conectar Redis"
    exit 1
fi

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

# Verificar variables de entorno
if [ ! -f .env ]; then
    echo "⚠️ Archivo .env no encontrado. Copiando desde env.example..."
    cp env.example .env
    echo "📝 Edita el archivo .env con tus configuraciones"
fi

# Crear directorio de logs
mkdir -p logs

# Verificar base de datos
echo "🗄️ Verificando base de datos..."
node -e "
const { syncDatabase } = require('./src/config/database');
syncDatabase()
  .then(() => {
    console.log('✅ Base de datos verificada');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error en base de datos:', err);
    process.exit(1);
  });
"

# Ejecutar seeder si es necesario
echo "🌱 Ejecutando seeder..."
npm run seed

# Verificar que todo esté funcionando
echo "🔍 Verificando endpoints..."
sleep 3
curl -s http://localhost:5000/health > /dev/null
if [ $? -eq 0 ]; then
    echo "✅ Servidor funcionando correctamente"
else
    echo "❌ Error al verificar servidor"
fi

echo "🎉 Deployment completado!"
echo ""
echo "📊 Configuración para +1000 usuarios:"
echo "   - Workers: $(grep WORKER_COUNT .env | cut -d'=' -f2 || echo '4')"
echo "   - Pool DB: $(grep DB_POOL_MAX .env | cut -d'=' -f2 || echo '20')"
echo "   - Rate Limit: $(grep RATE_LIMIT_MAX .env | cut -d'=' -f2 || echo '1000')"
echo ""
echo "🚀 Para iniciar en modo cluster:"
echo "   npm run cluster"
echo ""
echo "🚀 Para iniciar con PM2:"
echo "   npm run pm2"
echo ""
echo "💚 Health check: http://localhost:5000/health" 