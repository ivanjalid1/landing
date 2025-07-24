@echo off
echo 🔧 Instalando Redis para Windows...

echo 📦 Descargando Redis...
powershell -Command "Invoke-WebRequest -Uri 'https://github.com/microsoftarchive/redis/releases/download/win-3.0.504/Redis-x64-3.0.504.msi' -OutFile 'redis-installer.msi'"

echo 📦 Instalando Redis...
msiexec /i redis-installer.msi /quiet

echo 🔄 Iniciando Redis...
redis-server --daemonize yes

echo ✅ Redis instalado y iniciado correctamente
echo 🚀 El servidor ahora puede usar Redis para caching

pause 