@echo off
echo 🔧 Instalando dependencias faltantes...

echo 📦 Instalando express-slow-down...
npm install express-slow-down

echo 📦 Instalando compression...
npm install compression

echo 📦 Instalando redis...
npm install redis

echo 📦 Instalando pm2...
npm install pm2

echo ✅ Todas las dependencias instaladas correctamente
echo 🚀 Ahora puedes ejecutar: npm run dev

pause 