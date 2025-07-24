@echo off
echo 🚀 Iniciando servidor de desarrollo...

echo 📦 Iniciando backend...
start "Backend" cmd /k "cd backend && node src/server-debug.js"

echo ⏳ Esperando 3 segundos para que el backend inicie...
timeout /t 3 /nobreak > nul

echo 🌐 Iniciando frontend...
start "Frontend" cmd /k "cd frontend && npm run dev"

echo ✅ Servidores iniciados:
echo 🔗 Backend: http://localhost:3001
echo 🌐 Frontend: http://localhost:4321
echo 📊 Health check: http://localhost:3001/health

pause 