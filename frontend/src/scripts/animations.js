import { safeDOM, onDOMContentLoaded } from '../utils/browser.js';

// Función para animar elementos al hacer scroll
function setupScrollAnimations() {
  const animatedElements = safeDOM.querySelectorAll('.animate-on-scroll');
  const staggerElements = safeDOM.querySelectorAll('.stagger-children');

  // Configuración del observer
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  // Crear observer para elementos animados
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observar elementos animados
  animatedElements.forEach(el => observer.observe(el));

  // Observar elementos con animación escalonada
  staggerElements.forEach(el => observer.observe(el));
}

// Inicializar animaciones cuando el DOM esté listo
onDOMContentLoaded(() => {
  setupScrollAnimations();
}); 