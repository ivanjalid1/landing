const express = require('express');
const cors = require('cors');

const app = express();

// CORS básico
app.use(cors());

// Parsers
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    message: 'Servidor funcionando'
  });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'API funcionando'
  });
});

// Contenido público de ejemplo
app.get('/api/content/public/hero', (req, res) => {
  res.json({
    success: true,
    data: {
      section: 'hero',
      data: {
        title: 'Agencia #1 en Marketing Digital',
        subtitle: 'Transformamos tu negocio con estrategias digitales innovadoras',
        buttonText: 'Contacto Directo',
        buttonLink: '#contact'
      }
    }
  });
});

app.get('/api/content/public/services', (req, res) => {
  res.json({
    success: true,
    data: {
      section: 'services',
      data: {
        title: 'Servicios Premium',
        services: [
          {
            title: 'Facebook Business',
            description: 'Gestión completa de campañas',
            price: 'Desde $500/mes'
          }
        ]
      }
    }
  });
});

app.get('/api/content/public/accounts', (req, res) => {
  res.json({
    success: true,
    data: {
      section: 'accounts',
      data: {
        title: 'Cuentas Premium',
        accounts: [
          {
            title: 'Facebook Business Manager',
            price: '$299',
            popular: true
          }
        ]
      }
    }
  });
});

app.get('/api/content/public/solutions', (req, res) => {
  res.json({
    success: true,
    data: {
      section: 'solutions',
      data: {
        title: 'Soluciones Enterprise',
        solutions: [
          {
            title: 'Machine Learning',
            description: 'Algoritmos de IA para optimización'
          }
        ]
      }
    }
  });
});

app.get('/api/content/public/faq', (req, res) => {
  res.json({
    success: true,
    data: {
      section: 'faq',
      data: {
        title: 'Preguntas Frecuentes',
        questions: [
          {
            question: '¿Cómo funciona el proceso?',
            answer: 'Proceso simple y rápido'
          }
        ]
      }
    }
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor'
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Servidor debug corriendo en puerto ${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`📡 API: http://localhost:${PORT}/api`);
}); 