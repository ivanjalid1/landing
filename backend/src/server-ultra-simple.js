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

// Contenido hardcodeado
const hardcodedContent = {
  hero: {
    title: "¡Tu agencia #1 para activos publicitarios y soluciones!",
    subtitle: "Nos enorgullece apoyar tu negocio y ayudarte a superar obstáculos de baneos de Facebook. Nuestra dedicación asegura soluciones efectivas para escalar tus anuncios y tu negocio.",
    buttonText: "🚀 Contacto Directo",
    buttonLink: "#contact",
    paymentInfo: "Contáctanos para pagar usando VISA, Wise, Payoneer, Transferencia Bancaria, IBAN",
    supportText: "Soporte"
  },
  services: {
    title: "Servicios Premium",
    subtitle: "Soluciones integrales para tu crecimiento digital",
    services: [
      {
        id: 1,
        title: "Facebook Business",
        description: "Gestión completa de campañas publicitarias en Facebook e Instagram",
        icon: "📱",
        features: [
          "Configuración de píxeles",
          "Optimización automática",
          "Reportes detallados",
          "A/B testing",
          "Audiencias personalizadas",
          "Soporte 24/7"
        ],
        price: "Desde $500/mes",
        popular: true
      },
      {
        id: 2,
        title: "Google Ads",
        description: "Campañas de búsqueda y display para máximo ROI",
        icon: "🔍",
        features: [
          "Keyword research",
          "Optimización de calidad",
          "Remarketing",
          "Analytics avanzado",
          "Gestión de presupuesto",
          "Reportes semanales"
        ],
        price: "Desde $400/mes"
      },
      {
        id: 3,
        title: "Advanced Analytics",
        description: "Análisis profundo de datos para decisiones estratégicas",
        icon: "📊",
        features: [
          "Dashboard personalizado",
          "Tracking avanzado",
          "Conversiones optimizadas",
          "ROI tracking",
          "Integración multi-canal",
          "Consultoría mensual"
        ],
        price: "Desde $300/mes"
      }
    ]
  },
  accounts: {
    title: "Cuentas Premium",
    subtitle: "Acceso a las mejores herramientas del mercado",
    accounts: [
      {
        id: 1,
        title: "Facebook Business Manager",
        description: "Cuenta verificada con historial limpio",
        features: [
          "Verificación completa",
          "Sin restricciones",
          "Soporte técnico",
          "Backup automático",
          "Monitoreo 24/7",
          "Garantía de reemplazo"
        ],
        price: "$299",
        popular: true,
        badge: "Más Popular"
      },
      {
        id: 2,
        title: "Google Ads Manager",
        description: "Cuenta optimizada para máximo rendimiento",
        features: [
          "Configuración avanzada",
          "Historial positivo",
          "Soporte prioritario",
          "Optimización automática",
          "Reportes detallados",
          "Garantía extendida"
        ],
        price: "$249"
      },
      {
        id: 3,
        title: "TikTok Ads",
        description: "Cuenta para publicidad en TikTok",
        features: [
          "Verificación completa",
          "Sin límites",
          "Soporte especializado",
          "Optimización manual",
          "Analytics avanzado",
          "Garantía de funcionamiento"
        ],
        price: "$199"
      }
    ]
  },
  solutions: {
    title: "Soluciones Enterprise",
    subtitle: "Tecnología avanzada para empresas",
    solutions: [
      {
        id: 1,
        title: "Machine Learning",
        description: "Algoritmos de IA para optimización automática",
        icon: "🤖",
        features: [
          "Optimización automática",
          "Predicción de resultados",
          "Aprendizaje continuo",
          "Integración API",
          "Dashboard en tiempo real",
          "Soporte técnico"
        ]
      },
      {
        id: 2,
        title: "Big Data Analytics",
        description: "Análisis de grandes volúmenes de datos",
        icon: "📈",
        features: [
          "Procesamiento masivo",
          "Visualización avanzada",
          "Reportes automáticos",
          "Alertas inteligentes",
          "Integración multi-fuente",
          "Consultoría especializada"
        ]
      },
      {
        id: 3,
        title: "Cloud Infrastructure",
        description: "Infraestructura escalable en la nube",
        icon: "☁️",
        features: [
          "Escalabilidad automática",
          "Alta disponibilidad",
          "Seguridad avanzada",
          "Backup automático",
          "Monitoreo 24/7",
          "Soporte enterprise"
        ]
      }
    ]
  },
  faq: {
    title: "Preguntas Frecuentes",
    subtitle: "Resolvemos tus dudas más comunes",
    questions: [
      {
        id: 1,
        question: "¿Cuánto tiempo toma ver resultados?",
        answer: "Los primeros resultados suelen verse en 2-4 semanas, dependiendo del tipo de campaña y el mercado objetivo."
      },
      {
        id: 2,
        question: "¿Qué presupuesto mínimo necesito?",
        answer: "Recomendamos un presupuesto mínimo de $500/mes para campañas efectivas, pero podemos adaptarnos a diferentes presupuestos."
      },
      {
        id: 3,
        question: "¿Ofrecen garantía de resultados?",
        answer: "Sí, ofrecemos garantía de mejora en métricas clave. Si no alcanzamos los objetivos acordados, ajustamos la estrategia sin costo adicional."
      },
      {
        id: 4,
        question: "¿Cómo miden el ROI?",
        answer: "Utilizamos herramientas avanzadas de tracking y analytics para medir conversiones, costos y retorno de inversión en tiempo real."
      },
      {
        id: 5,
        question: "¿Trabajan con empresas pequeñas?",
        answer: "Sí, tenemos planes adaptados para empresas de todos los tamaños, desde startups hasta corporaciones."
      },
      {
        id: 6,
        question: "¿Qué incluye el soporte técnico?",
        answer: "Incluye consultoría estratégica, optimización de campañas, reportes semanales y soporte por WhatsApp 24/7."
      }
    ]
  }
};

// Endpoints de contenido público
app.get('/api/content/public/:section', (req, res) => {
  const { section } = req.params;
  const content = hardcodedContent[section];
  
  if (content) {
    res.json({
      success: true,
      data: {
        section,
        data: content,
        isActive: true
      },
      cached: false
    });
  } else {
    res.status(404).json({
      success: false,
      message: `Contenido de la sección '${section}' no encontrado`
    });
  }
});

// Endpoint para todas las secciones
app.get('/api/content/public', (req, res) => {
  const sections = Object.keys(hardcodedContent).map(section => ({
    section,
    data: hardcodedContent[section],
    isActive: true
  }));
  
  res.json({
    success: true,
    data: sections,
    cached: false
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor ultra-simple corriendo en puerto ${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`📡 API: http://localhost:${PORT}/api`);
}); 