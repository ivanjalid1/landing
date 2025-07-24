const { Content } = require('../models');

const seedContent = async () => {
  try {
    console.log('🌱 Poblando base de datos con contenido de ejemplo...');

    // Datos de ejemplo para cada sección
    const contentData = [
      {
        section: 'hero',
        data: {
          title: '¡Tu agencia #1 en activos y soluciones publicitarias!',
          subtitle: 'Transformamos tu negocio con estrategias digitales innovadoras. Somos tu partner estratégico para escalar tu negocio digital con cuentas premium verificadas y gestión completa de campañas.',
          description: 'Somos la agencia líder en marketing digital, especializada en Facebook Ads, Google Ads y estrategias de crecimiento. Nuestro equipo de expertos te ayuda a alcanzar tus objetivos de negocio con soluciones personalizadas y resultados medibles.',
          buttonText: '🚀 Contacto Directo',
          buttonLink: '#contact',
          paymentInfo: 'Contáctanos para pagar usando VISA, Wise, Payoneer, Transferencia Bancaria, IBAN',
          supportText: 'Soporte 24/7',
          image: '/img/hero-bg.jpg',
          badges: [
            { text: 'Entrega Instantánea', icon: '⚡' },
            { text: 'Mejor Soporte', icon: '🎯' },
            { text: '100% Seguro', icon: '🔒' }
          ]
        }
      },
      {
        section: 'services',
        data: {
          title: 'Servicios Premium',
          subtitle: 'Soluciones integrales para tu crecimiento digital',
          services: [
            {
              id: 1,
              title: 'Facebook Business',
              description: 'Gestión completa de campañas publicitarias en Facebook e Instagram con optimización automática y reportes detallados',
              icon: '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>',
              features: [
                'Configuración de píxeles',
                'Optimización automática',
                'Reportes detallados',
                'A/B testing',
                'Audiencias personalizadas',
                'Soporte 24/7'
              ],
              stats: {
                label: 'ROI Promedio',
                value: 'Premium',
                detail: 'Premium'
              },
              price: '$500/mes',
              popular: true
            },
            {
              id: 2,
              title: 'Google Ads',
              description: 'Campañas de búsqueda y display optimizadas para máximo ROI con gestión avanzada de presupuesto y remarketing',
              icon: '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>',
              features: [
                'Keyword research',
                'Optimización de calidad',
                'Remarketing',
                'Analytics avanzado',
                'Gestión de presupuesto',
                'Reportes semanales'
              ],
              stats: {
                label: 'CTR Promedio',
                value: 'Premium',
                detail: 'Premium'
              },
              price: '$400/mes',
              popular: false
            },
            {
              id: 3,
              title: 'Advanced Analytics',
              description: 'Análisis profundo de datos con dashboards personalizados y tracking avanzado para decisiones estratégicas',
              icon: '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>',
              features: [
                'Dashboard personalizado',
                'Tracking avanzado',
                'Conversiones optimizadas',
                'ROI tracking',
                'Integración multi-canal',
                'Consultoría mensual'
              ],
              stats: {
                label: 'Precisión',
                value: 'Premium',
                detail: 'Premium'
              },
              price: '$300/mes',
              popular: false
            }
          ]
        }
      },
      {
        section: 'accounts',
        data: {
          title: 'Cuentas Premium',
          subtitle: 'Acceso a las mejores herramientas del mercado',
          accounts: [
            {
              id: 1,
              title: 'Facebook Business Manager',
              description: 'Cuenta verificada con historial limpio',
              icon: '<svg class="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
              features: [
                'Verificación completa',
                'Sin restricciones',
                'Soporte técnico',
                'Backup automático',
                'Monitoreo 24/7',
                'Garantía de reemplazo'
              ],
              price: '$299',
              popular: true,
              badge: 'Más Popular'
            },
            {
              id: 2,
              title: 'Google Ads Manager',
              description: 'Cuenta optimizada para máximo rendimiento',
              icon: '<svg class="w-10 h-10 text-red-600" fill="currentColor" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>',
              features: [
                'Configuración avanzada',
                'Historial positivo',
                'Soporte prioritario',
                'Optimización automática',
                'Reportes detallados',
                'Garantía extendida'
              ],
              price: '$249'
            },
            {
              id: 3,
              title: 'TikTok Ads',
              description: 'Cuenta para publicidad en TikTok',
              icon: '<svg class="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>',
              features: [
                'Verificación completa',
                'Sin límites',
                'Soporte especializado',
                'Optimización manual',
                'Analytics avanzado',
                'Garantía de funcionamiento'
              ],
              price: '$199'
            }
          ]
        }
      },
      {
        section: 'solutions',
        data: {
          title: 'Soluciones Enterprise',
          subtitle: 'Tecnología avanzada para empresas',
          solutions: [
            {
              id: 1,
              title: 'API Integration',
              description: 'Acceso directo a APIs de Facebook, Instagram y TikTok para automatización completa de campañas y gestión programática.',
              icon: '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>',
              features: [
                'Webhooks en tiempo real',
                'Rate limiting inteligente',
                'Bulk operations',
                'Custom audiences automáticas',
                'Cross-platform sync',
                'Real-time analytics',
                'Automated bidding',
                'Creative optimization',
                'Multi-account management',
                'Advanced reporting'
              ],
              specs: {
                label: 'Uptime',
                value: '99.9%',
                detail: 'SLA garantizado'
              },
              color: 'from-blue-500 to-cyan-500'
            },
            {
              id: 2,
              title: 'White Label Solution',
              description: 'Infraestructura completa para agencias que quieren escalar sin límites con su propia marca.',
              icon: '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"/></svg>',
              features: [
                'Custom domains',
                'Branded interfaces',
                'Multi-tenant architecture',
                'Revenue sharing',
                'White label support',
                'Custom integrations',
                'Dedicated infrastructure',
                'API access',
                'Analytics dashboard',
                'Client management'
              ],
              specs: {
                label: 'Agencias',
                value: '50+',
                detail: 'Activas'
              },
              color: 'from-purple-500 to-pink-500'
            },
            {
              id: 3,
              title: 'Enterprise Security',
              description: 'Infraestructura enterprise-grade con encriptación end-to-end, compliance GDPR y auditorías de seguridad.',
              icon: '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>',
              features: [
                'SOC 2 Type II',
                'GDPR compliance',
                'End-to-end encryption',
                'Vulnerability scanning',
                'Penetration testing',
                'Data encryption',
                'Access controls',
                'Audit logging',
                'Backup systems',
                'Disaster recovery'
              ],
              specs: {
                label: 'Security Score',
                value: 'A+',
                detail: 'SSL Labs'
              },
              color: 'from-red-500 to-orange-500'
            },
            {
              id: 4,
              title: 'Advanced Analytics',
              description: 'Dashboard empresarial con métricas avanzadas, predicciones de ROI y optimización automática con IA.',
              icon: '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>',
              features: [
                'Predictive analytics',
                'Custom attribution models',
                'Real-time reporting',
                'A/B testing automático',
                'ROI forecasting',
                'Machine learning',
                'Custom metrics',
                'Data visualization',
                'Export capabilities',
                'Alert system'
              ],
              specs: {
                label: 'Precisión',
                value: '95%',
                detail: 'Predictions'
              },
              color: 'from-blue-500 to-cyan-500'
            },
            {
              id: 5,
              title: 'Scalable Infrastructure',
              description: 'Arquitectura cloud-native que maneja millones de requests con auto-scaling y redundancia geográfica.',
              icon: '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>',
              features: [
                'Auto-scaling clusters',
                'Geographic redundancy',
                'Load balancing',
                'CDN global',
                '99.99% uptime',
                'Microservices',
                'Container orchestration',
                'Database clustering',
                'Cache layers',
                'Monitoring tools'
              ],
              specs: {
                label: 'Throughput',
                value: '1M+',
                detail: 'req/sec'
              },
              color: 'from-indigo-500 to-purple-500'
            },
            {
              id: 6,
              title: 'Custom Development',
              description: 'Desarrollo a medida de integraciones, automatizaciones y herramientas específicas para tu workflow.',
              icon: '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/></svg><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>',
              features: [
                'Custom integrations',
                'Workflow automation',
                'Third-party APIs',
                'Custom reporting',
                'Dedicated support',
                'API development',
                'Webhook setup',
                'Data migration',
                'System integration',
                'Maintenance services'
              ],
              specs: {
                label: 'Projects',
                value: '200+',
                detail: 'Delivered'
              },
              color: 'from-yellow-500 to-orange-500'
            }
          ]
        }
      },
      {
        section: 'faq',
        data: {
          title: 'Preguntas Frecuentes',
          subtitle: 'Resolvemos tus dudas más comunes',
          questions: [
            {
              id: 1,
              question: '¿Cuánto tiempo toma ver resultados?',
              answer: 'Los primeros resultados suelen verse en 2-4 semanas, dependiendo del tipo de campaña y el mercado objetivo.'
            },
            {
              id: 2,
              question: '¿Qué presupuesto mínimo necesito?',
              answer: 'Recomendamos un presupuesto mínimo de $500/mes para campañas efectivas, pero podemos adaptarnos a diferentes presupuestos.'
            },
            {
              id: 3,
              question: '¿Ofrecen garantía de resultados?',
              answer: 'Sí, ofrecemos garantía de mejora en métricas clave. Si no alcanzamos los objetivos acordados, ajustamos la estrategia sin costo adicional.'
            },
            {
              id: 4,
              question: '¿Cómo miden el ROI?',
              answer: 'Utilizamos herramientas avanzadas de tracking y analytics para medir conversiones, costos y retorno de inversión en tiempo real.'
            },
            {
              id: 5,
              question: '¿Trabajan con empresas pequeñas?',
              answer: 'Sí, tenemos planes adaptados para empresas de todos los tamaños, desde startups hasta corporaciones.'
            },
            {
              id: 6,
              question: '¿Qué incluye el soporte técnico?',
              answer: 'Incluye consultoría estratégica, optimización de campañas, reportes semanales y soporte por WhatsApp 24/7.'
            }
          ]
        }
      },
      {
        section: 'cta',
        data: {
          title: '¿Listo para comenzar?',
          subtitle: 'Únete a cientos de empresas que ya confían en nosotros',
          buttonText: 'Contactar Ahora',
          buttonLink: '#contact',
          description: 'Obtén una consulta gratuita y descubre cómo podemos transformar tu negocio digital'
        }
      },
      {
        section: 'footer',
        data: {
          company: {
            name: 'TopAds Agency',
            description: 'Agencia líder en marketing digital especializada en Facebook Ads, Google Ads y estrategias de crecimiento.',
            email: 'contacto@topads.com',
            phone: '+1 (555) 123-4567',
            address: '123 Digital Street, Marketing City, MC 12345'
          },
          links: {
            services: [
              { name: 'Facebook Ads', url: '#services' },
              { name: 'Google Ads', url: '#services' },
              { name: 'Analytics', url: '#services' }
            ],
            company: [
              { name: 'Sobre Nosotros', url: '#about' },
              { name: 'Nuestro Equipo', url: '#team' },
              { name: 'Casos de Éxito', url: '#cases' }
            ],
            support: [
              { name: 'Centro de Ayuda', url: '#help' },
              { name: 'Contacto', url: '#contact' },
              { name: 'FAQ', url: '#faq' }
            ]
          },
          social: [
            { name: 'Facebook', url: '#', icon: 'facebook' },
            { name: 'Instagram', url: '#', icon: 'instagram' },
            { name: 'LinkedIn', url: '#', icon: 'linkedin' }
          ]
        }
      }
    ];

    // Crear o actualizar cada sección
    for (const content of contentData) {
      const existingContent = await Content.findOne({
        where: { section: content.section }
      });

      if (existingContent) {
        await existingContent.update(content);
        console.log(`✅ Sección '${content.section}' actualizada`);
      } else {
        await Content.create(content);
        console.log(`✅ Sección '${content.section}' creada`);
      }
    }

    console.log('🎉 Base de datos poblada exitosamente');
  } catch (error) {
    console.error('❌ Error al poblar la base de datos:', error);
    throw error;
  }
};

module.exports = { seedContent }; 