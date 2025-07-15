require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// Configuración de seguridad básica
app.use(helmet());
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:4321',
    'http://localhost:5173',
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true
}));

// Límite de peticiones
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000,
  max: parseInt(process.env.RATE_LIMIT_MAX) || 100
});
app.use(limiter);

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Datos simulados para pruebas
const mockContent = {
  hero: {
    title: "Your #1 agency for advertising assets & solutions!",
    subtitle: "We're proud to support your business and help you overcome obstacles from Facebook bans.",
    buttonText: "🚀 Contact Direct",
    buttonLink: "#contact",
    paymentInfo: "Contact us to pay using VISA, Wise, Payoneer, Bank Transfer, IBAN",
    supportText: "Support"
  },
  services: {
    title: "Nuestros Servicios Premium",
    subtitle: "Soluciones especializadas para escalar tu negocio digital",
    services: [
      {
        title: "Cuentas Premium",
        description: "Acceso a cuentas verificadas con historial limpio",
        icon: "shield-check"
      },
      {
        title: "Gestión de Campañas",
        description: "Optimización profesional de tus campañas publicitarias",
        icon: "chart-line"
      },
      {
        title: "Soporte Técnico",
        description: "Asistencia especializada para resolver cualquier problema",
        icon: "headset"
      }
    ]
  },
  accounts: {
    title: "Cuentas Premium Disponibles",
    subtitle: "Selecciona la opción que mejor se adapte a tus necesidades",
    accounts: [
      {
        name: "Starter Pack",
        price: "$99",
        description: "Ideal para comenzar",
        features: ["1 cuenta verificada", "Soporte básico", "30 días de garantía"],
        popular: false
      },
      {
        name: "Business Pack",
        price: "$299",
        description: "Para negocios en crecimiento",
        features: ["3 cuentas verificadas", "Soporte prioritario", "60 días de garantía"],
        popular: true
      },
      {
        name: "Enterprise Pack",
        price: "$599",
        description: "Para grandes operaciones",
        features: ["5 cuentas verificadas", "Soporte VIP", "90 días de garantía"],
        popular: false
      }
    ]
  },
  solutions: {
    title: "Enterprise Solutions & Business Cases",
    subtitle: "Soluciones especializadas para empresas que necesitan escalar sus operaciones de publicidad digital",
    solutions: [
      {
        title: "Facebook Ads Enterprise",
        description: "Solución completa para grandes volúmenes de publicidad en Facebook",
        features: "Gestión de múltiples cuentas\nOptimización automática\nReportes avanzados\nSoporte dedicado",
        price: "$999/mes",
        isPopular: true
      },
      {
        title: "Google Ads Enterprise",
        description: "Plataforma integral para campañas de búsqueda y display",
        features: "Campañas multicanal\nOptimización por IA\nAnalytics avanzado\nSoporte 24/7",
        price: "$1,299/mes",
        isPopular: false
      },
      {
        title: "TikTok Ads Pro",
        description: "Especialistas en publicidad en TikTok para audiencias jóvenes",
        features: "Campañas virales\nOptimización creativa\nAnalytics de engagement\nSoporte especializado",
        price: "$799/mes",
        isPopular: false
      }
    ]
  },
  faq: {
    title: "Preguntas Frecuentes",
    subtitle: "Resolvemos tus dudas sobre nuestros servicios y procesos",
    questions: [
      {
        question: "¿Cómo funciona el proceso de entrega?",
        answer: "Una vez confirmado el pago, recibirás las credenciales de acceso en un máximo de 24 horas. Incluimos instrucciones detalladas y soporte técnico para la configuración.",
        category: "entrega"
      },
      {
        question: "¿Qué métodos de pago aceptan?",
        answer: "Aceptamos VISA, Mastercard, Wise, Payoneer, transferencias bancarias e IBAN. Todos los pagos son seguros y procesados por plataformas confiables.",
        category: "pago"
      },
      {
        question: "¿Ofrecen garantía en las cuentas?",
        answer: "Sí, todas nuestras cuentas incluyen garantía de 30-90 días dependiendo del paquete. Si hay algún problema, te proporcionamos una cuenta de reemplazo.",
        category: "garantia"
      },
      {
        question: "¿Cómo puedo contactar soporte técnico?",
        answer: "Puedes contactarnos por Telegram @topads_support, WhatsApp o email. Nuestro equipo está disponible 24/7 para resolver cualquier consulta.",
        category: "soporte"
      }
    ]
  },
  footer: {
    companyName: "Top Ads Premium Marketing",
    description: "Tu socio estratégico para el éxito en publicidad digital",
    contact: {
      phone: "+1 (555) 123-4567",
      email: "contact@topads.com",
      telegram: "@topads_support"
    },
    social: {
      telegram: "https://t.me/topads_support",
      whatsapp: "https://wa.me/15551234567"
    }
  }
};

// Rutas de autenticación simuladas
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // Credenciales de prueba
  if (email === 'admin@topads.com' && password === 'admin123') {
    res.json({
      success: true,
      message: 'Login exitoso',
      token: 'mock-jwt-token-for-testing',
      user: {
        id: 1,
        email: 'admin@topads.com',
        name: 'Administrador',
        role: 'admin'
      }
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Credenciales incorrectas'
    });
  }
});

app.post('/api/auth/logout', (req, res) => {
  res.json({
    success: true,
    message: 'Logout exitoso'
  });
});

// Rutas de contenido
app.get('/api/content/:section', (req, res) => {
  const { section } = req.params;
  
  if (mockContent[section]) {
    res.json({
      success: true,
      data: {
        section,
        data: mockContent[section],
        isActive: true
      }
    });
  } else {
    res.status(404).json({
      success: false,
      message: `Sección '${section}' no encontrada`
    });
  }
});

app.put('/api/content/:section', (req, res) => {
  const { section } = req.params;
  const { data } = req.body;
  
  // Simular guardado
  mockContent[section] = data;
  
  res.json({
    success: true,
    message: `Contenido de la sección '${section}' actualizado exitosamente`,
    data: {
      section,
      data: mockContent[section],
      isActive: true
    }
  });
});

app.get('/api/content', (req, res) => {
  const contents = Object.keys(mockContent).map(section => ({
    section,
    data: mockContent[section],
    isActive: true
  }));
  
  res.json({
    success: true,
    data: contents
  });
});

app.get('/api/content/sections', (req, res) => {
  const sections = [
    { name: 'hero', title: 'Sección Hero', description: 'Título principal, subtítulo, imágenes y botones' },
    { name: 'services', title: 'Servicios', description: 'Lista de servicios ofrecidos' },
    { name: 'accounts', title: 'Cuentas Premium', description: 'Cuentas premium disponibles' },
    { name: 'solutions', title: 'Soluciones Enterprise', description: 'Soluciones especializadas para empresas' },
    { name: 'faq', title: 'FAQ', description: 'Preguntas frecuentes y respuestas' },
    { name: 'footer', title: 'Footer', description: 'Información de contacto y enlaces' }
  ];
  
  res.json({
    success: true,
    data: sections
  });
});

// Ruta de salud
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    message: 'Servidor funcionando sin base de datos'
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor'
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor SIMPLE corriendo en el puerto ${PORT}`);
  console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log('🔗 CORS configurado para:', [
    'http://localhost:3000',
    'http://localhost:4321',
    'http://localhost:5173'
  ]);
  console.log('📊 API disponible en: http://localhost:' + PORT + '/api');
  console.log('🔑 Credenciales de prueba: admin@topads.com / admin123');
}); 