const jwt = require('jsonwebtoken');

// Configuración
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = '24h';

// Usuario de prueba (en producción usar base de datos)
const ADMIN_USER = {
  id: 1,
  email: 'admin@topads.agency',
  password: 'admin123',
  role: 'admin'
};

const authController = {
  // Login
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Validación básica
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Email y contraseña son requeridos'
        });
      }

      // Verificar credenciales
      if (email === ADMIN_USER.email && password === ADMIN_USER.password) {
        // Generar token
        const token = jwt.sign(
          { userId: ADMIN_USER.id, email: ADMIN_USER.email, role: ADMIN_USER.role },
          JWT_SECRET,
          { expiresIn: JWT_EXPIRES_IN }
        );

        // Enviar respuesta
        res.cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 24 * 60 * 60 * 1000 // 24 horas
        });

        res.json({
          success: true,
          message: 'Login exitoso',
          user: {
            email: ADMIN_USER.email,
            role: ADMIN_USER.role
          },
          token
        });
      } else {
        res.status(401).json({
          success: false,
          message: 'Credenciales incorrectas'
        });
      }
    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      });
    }
  },

  // Verificar token
  verify: async (req, res) => {
    try {
      const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
      
      if (!token) {
        return res.status(401).json({
          success: false,
          message: 'No autorizado'
        });
      }

      const decoded = jwt.verify(token, JWT_SECRET);
      res.json({
        success: true,
        user: {
          email: decoded.email,
          role: decoded.role
        }
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: 'Token inválido'
      });
    }
  },

  // Logout
  logout: async (req, res) => {
    res.clearCookie('token');
    res.json({
      success: true,
      message: 'Logout exitoso'
    });
  }
};

module.exports = authController; 