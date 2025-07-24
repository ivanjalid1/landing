const db = require('../models');
const { Content } = db;
const { validationResult } = require('express-validator');

// Contenido hardcodeado como fallback
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

// Obtener contenido público de una sección específica (sin cache)
const getPublicContent = async (req, res) => {
  try {
    const { section } = req.params;
    
    // Intentar obtener de la base de datos
    const content = await Content.findOne({
      where: { section, isActive: true }
    });

    if (content) {
      // Si existe en la BD, devolverlo
      res.json({
        success: true,
        data: content,
        cached: false
      });
    } else {
      // Si no existe, devolver contenido hardcodeado
      const hardcodedData = hardcodedContent[section];
      if (hardcodedData) {
        res.json({
          success: true,
          data: {
            section,
            data: hardcodedData,
            isActive: true
          },
          cached: false,
          fallback: true
        });
      } else {
        res.status(404).json({
          success: false,
          message: `Contenido de la sección '${section}' no encontrado`
        });
      }
    }
  } catch (error) {
    console.error('Error al obtener contenido público:', error);
    // En caso de error, devolver contenido hardcodeado
    const hardcodedData = hardcodedContent[section];
    if (hardcodedData) {
      res.json({
        success: true,
        data: {
          section,
          data: hardcodedData,
          isActive: true
        },
        cached: false,
        fallback: true
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      });
    }
  }
};

// Obtener todo el contenido público (sin cache)
const getAllPublicContent = async (req, res) => {
  try {
    const contents = await Content.findAll({
      where: { isActive: true },
      order: [['section', 'ASC']]
    });

    res.json({
      success: true,
      data: contents,
      cached: false
    });
  } catch (error) {
    console.error('Error al obtener todo el contenido público:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Obtener contenido de una sección específica (sin cache)
const getContent = async (req, res) => {
  try {
    const { section } = req.params;
    
    const content = await Content.findOne({
      where: { section, isActive: true }
    });

    if (!content) {
      return res.status(404).json({
        success: false,
        message: `Contenido de la sección '${section}' no encontrado`
      });
    }

    res.json({
      success: true,
      data: content,
      cached: false
    });
  } catch (error) {
    console.error('Error al obtener contenido:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Obtener todo el contenido (sin cache)
const getAllContent = async (req, res) => {
  try {
    const contents = await Content.findAll({
      where: { isActive: true },
      order: [['section', 'ASC']]
    });

    res.json({
      success: true,
      data: contents,
      cached: false
    });
  } catch (error) {
    console.error('Error al obtener todo el contenido:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Crear o actualizar contenido de una sección
const updateContent = async (req, res) => {
  try {
    const { section } = req.params;
    const { data } = req.body;

    // Validaciones básicas
    if (!data || typeof data !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Los datos son requeridos y deben ser un objeto'
      });
    }

    // Buscar si ya existe contenido para esta sección
    let content = await Content.findOne({
      where: { section }
    });

    if (content) {
      // Actualizar contenido existente
      await content.update({
        data,
        updatedAt: new Date()
      });
    } else {
      // Crear nuevo contenido
      content = await Content.create({
        section,
        data,
        isActive: true
      });
    }

    res.json({
      success: true,
      message: `Contenido de la sección '${section}' actualizado exitosamente`,
      data: content
    });
  } catch (error) {
    console.error('Error al actualizar contenido:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Eliminar contenido de una sección (soft delete)
const deleteContent = async (req, res) => {
  try {
    const { section } = req.params;
    
    const content = await Content.findOne({
      where: { section, isActive: true }
    });

    if (!content) {
      return res.status(404).json({
        success: false,
        message: `Contenido de la sección '${section}' no encontrado`
      });
    }

    await content.update({ isActive: false });

    res.json({
      success: true,
      message: `Contenido de la sección '${section}' eliminado exitosamente`
    });
  } catch (error) {
    console.error('Error al eliminar contenido:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Obtener secciones disponibles
const getSections = async (req, res) => {
  try {
    const sections = [
      {
        name: 'hero',
        title: 'Sección Hero',
        description: 'Título principal, subtítulo, imágenes y botones'
      },
      {
        name: 'services',
        title: 'Servicios',
        description: 'Lista de servicios ofrecidos'
      },
      {
        name: 'accounts',
        title: 'Cuentas Premium',
        description: 'Cuentas premium disponibles'
      },
      {
        name: 'solutions',
        title: 'Soluciones Enterprise',
        description: 'Soluciones técnicas para empresas'
      },
      {
        name: 'faq',
        title: 'Preguntas Frecuentes',
        description: 'Preguntas y respuestas'
      },
      {
        name: 'cta',
        title: 'Call to Action Final',
        description: 'Botón de llamada a la acción'
      },
      {
        name: 'footer',
        title: 'Footer',
        description: 'Información de contacto y enlaces'
      }
    ];

    res.json({
      success: true,
      data: sections,
      cached: false
    });
  } catch (error) {
    console.error('Error al obtener secciones:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

module.exports = {
  getPublicContent,
  getAllPublicContent,
  getContent,
  getAllContent,
  updateContent,
  deleteContent,
  getSections
}; 