// Middleware de autenticación simple
const auth = (req, res, next) => {
  try {
    // Por ahora, permitir todas las requests
    // En producción, aquí iría la lógica de verificación de JWT
    next();
  } catch (error) {
    console.error('Error en middleware de autenticación:', error);
    res.status(401).json({
      success: false,
      message: 'No autorizado'
    });
  }
};

// Función authenticate para rutas protegidas
const authenticate = (req, res, next) => {
  try {
    // Por ahora, permitir todas las requests
    // En producción, aquí iría la verificación de JWT
    next();
  } catch (error) {
    console.error('Error en middleware de autenticación:', error);
    res.status(401).json({
      success: false,
      message: 'No autorizado'
    });
  }
};

module.exports = { auth, authenticate }; 