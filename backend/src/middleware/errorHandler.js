const { ValidationError } = require('sequelize');
const { ValidationError: YupValidationError } = require('yup');

// Middleware de manejo de errores centralizado
module.exports = (err, req, res, next) => {
  console.error(err);

  // Errores de validación de Sequelize
  if (err instanceof ValidationError) {
    return res.status(400).json({
      error: 'Error de validación',
      details: err.errors.map(e => ({
        message: e.message,
        field: e.path,
        value: e.value
      }))
    });
  }

  // Errores de validación de Yup
  if (err instanceof YupValidationError) {
    return res.status(400).json({
      error: 'Error de validación',
      details: err.errors
    });
  }

  // Error personalizado con status
  if (err.status) {
    return res.status(err.status).json({
      error: err.message
    });
  }

  // Error de base de datos
  if (err.name === 'SequelizeConnectionError') {
    return res.status(503).json({
      error: 'Error de conexión con la base de datos'
    });
  }

  // Error de archivo
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      error: 'El archivo excede el tamaño máximo permitido'
    });
  }

  // Error por defecto
  return res.status(500).json({
    error: process.env.NODE_ENV === 'production' 
      ? 'Error interno del servidor'
      : err.message
  });
}; 