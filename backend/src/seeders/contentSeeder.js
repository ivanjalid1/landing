const Content = require('../models/Content');

const initialContent = [
  {
    section: 'hero',
    data: {
      title: "Your #1 agency for advertising assets & solutions!",
      subtitle: "We're proud to support your business and help you overcome obstacles from Facebook bans. Our dedication ensures effective solutions to scale your ads and business.",
      buttonText: "🚀 Contact Direct",
      buttonLink: "#contact",
      paymentInfo: "Contact us to pay using VISA, Wise, Payoneer, Bank Transfer, IBAN",
      supportText: "Support"
    }
  },
  {
    section: 'services',
    data: {
      title: "Nuestros Servicios Premium",
      subtitle: "Soluciones especializadas para escalar tu negocio digital",
      services: [
        {
          title: "Cuentas Premium",
          description: "Acceso a cuentas verificadas con historial limpio",
          icon: "shield-check",
          features: ["Verificación completa", "Soporte 24/7", "Garantía de reemplazo"]
        },
        {
          title: "Gestión de Campañas",
          description: "Optimización profesional de tus campañas publicitarias",
          icon: "chart-line",
          features: ["Análisis avanzado", "Optimización automática", "Reportes detallados"]
        },
        {
          title: "Soporte Técnico",
          description: "Asistencia especializada para resolver cualquier problema",
          icon: "headset",
          features: ["Respuesta inmediata", "Solución garantizada", "Seguimiento continuo"]
        }
      ]
    }
  },
  {
    section: 'accounts',
    data: {
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
    }
  },
  {
    section: 'solutions',
    data: {
      title: "Soluciones Enterprise",
      subtitle: "Tecnología avanzada para empresas que buscan escalar",
      description: "Implementamos soluciones técnicas de vanguardia que transforman la forma en que las empresas gestionan sus campañas publicitarias.",
      metrics: [
        { value: "99.9%", label: "Uptime Garantizado" },
        { value: "24/7", label: "Soporte Técnico" },
        { value: "500+", label: "Clientes Satisfechos" },
        { value: "50M+", label: "Impresiones Gestionadas" }
      ],
      solutions: [
        {
          title: "API Integration",
          description: "Integración directa con tus sistemas existentes",
          icon: "api"
        },
        {
          title: "White Label",
          description: "Solución personalizada con tu marca",
          icon: "paint-brush"
        },
        {
          title: "Custom Analytics",
          description: "Dashboard personalizado con métricas específicas",
          icon: "chart-bar"
        }
      ]
    }
  },
  {
    section: 'faq',
    data: {
      title: "Preguntas Frecuentes",
      subtitle: "Resolvemos tus dudas más comunes",
      questions: [
        {
          question: "¿Cómo funciona el proceso de verificación?",
          answer: "Nuestras cuentas pasan por un riguroso proceso de verificación que incluye verificación de identidad, historial de actividad y cumplimiento de políticas de plataforma."
        },
        {
          question: "¿Qué pasa si mi cuenta es suspendida?",
          answer: "Ofrecemos garantía de reemplazo. Si tu cuenta es suspendida por razones técnicas, te proporcionamos una nueva cuenta sin costo adicional."
        },
        {
          question: "¿Ofrecen soporte técnico?",
          answer: "Sí, proporcionamos soporte técnico 24/7 a través de Telegram y email para resolver cualquier problema que puedas tener."
        },
        {
          question: "¿Cuáles son los métodos de pago?",
          answer: "Aceptamos VISA, Wise, Payoneer, transferencias bancarias e IBAN. Todos los pagos son seguros y procesados de forma confidencial."
        }
      ]
    }
  },
  {
    section: 'cta',
    data: {
      title: "¿Listo para escalar tu negocio?",
      subtitle: "Únete a cientos de empresas que ya confían en nosotros",
      buttonText: "🚀 Conectar Ahora",
      buttonLink: "#contact",
      urgencyText: "Oferta limitada - ¡No te quedes sin tu cuenta!"
    }
  },
  {
    section: 'footer',
    data: {
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
      },
      links: [
        { name: "Servicios", url: "#services" },
        { name: "Cuentas Premium", url: "#accounts" },
        { name: "Soluciones", url: "#solutions" },
        { name: "FAQ", url: "#faq" }
      ]
    }
  }
];

const seedContent = async () => {
  try {
    console.log('🌱 Iniciando seeder de contenido...');
    
    for (const contentData of initialContent) {
      const existingContent = await Content.findOne({
        where: { section: contentData.section }
      });
      
      if (existingContent) {
        console.log(`📝 Actualizando contenido de sección: ${contentData.section}`);
        await existingContent.update({
          data: contentData.data,
          isActive: true
        });
      } else {
        console.log(`✨ Creando contenido de sección: ${contentData.section}`);
        await Content.create(contentData);
      }
    }
    
    console.log('✅ Seeder de contenido completado exitosamente');
  } catch (error) {
    console.error('❌ Error en el seeder de contenido:', error);
    throw error;
  }
};

module.exports = { seedContent }; 