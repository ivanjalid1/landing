# 🚀 Setup Backend - Top Ads

## Requisitos Previos

- Node.js 16+ 
- PostgreSQL 12+
- npm o yarn

## Instalación Rápida

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar base de datos
# Asegúrate de que PostgreSQL esté corriendo y crear la base de datos:
# createdb topads_db

# 3. Ejecutar seeder
npm run seed

# 4. Iniciar servidor
npm run dev
```

## Variables de Entorno

El archivo `.env` se crea automáticamente con valores por defecto.
Modifica según tu configuración:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=topads_db
DB_USER=postgres
DB_PASSWORD=admin
PORT=5000
```

## Scripts Disponibles

- `npm run dev`: Servidor de desarrollo
- `npm run seed`: Ejecutar seeder de datos
- `npm start`: Servidor de producción
- `./start.sh`: Script de inicio completo

## Estructura del Proyecto

```
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
```

## API Endpoints

- `GET /api/health`: Estado del servidor
- `GET /api/content/public/:section`: Contenido público
- `GET /api/content/:section`: Contenido protegido
- `POST /api/content/:section`: Actualizar contenido

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
