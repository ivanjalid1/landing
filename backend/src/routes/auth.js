const express = require('express');
const router = express.Router();

// Ruta de prueba
router.get('/', (req, res) => {
  res.json({ message: 'Rutas de autenticación funcionando' });
});

// Ruta de login
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validación básica
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email y contraseña son requeridos'
      });
    }

    // Por ahora, simulamos un login exitoso
    // En producción, aquí verificarías contra la base de datos
    if (email === 'admin@topads.com' && password === 'admin123') {
      return res.json({
        success: true,
        message: 'Login exitoso',
        user: {
          id: 1,
          email: email,
          role: 'admin'
        },
        token: 'fake-jwt-token-for-testing'
      });
    } else {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// Ruta de registro
router.post('/register', (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    // Validación básica
    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son requeridos'
      });
    }

    // Por ahora, simulamos un registro exitoso
    return res.json({
      success: true,
      message: 'Usuario registrado exitosamente',
      user: {
        id: 2,
        email: email,
        name: name,
        role: 'user'
      }
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// Ruta de logout
router.post('/logout', (req, res) => {
  res.json({
    success: true,
    message: 'Logout exitoso'
  });
});

module.exports = router; 