#!/bin/bash
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
