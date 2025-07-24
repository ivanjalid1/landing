// Verificar si estamos en el navegador
export const isBrowser = typeof window !== 'undefined';

// Funciones seguras para el DOM
export const safeDOM = {
  getElementById: (id) => {
    if (typeof document !== 'undefined') {
      return document.getElementById(id);
    }
    return null;
  },
  addEventListener: (element, event, handler) => {
    if (element) {
      element.addEventListener(event, handler);
    }
  }
};

// Redirección segura
export const safeRedirect = (url) => {
  if (typeof window !== 'undefined') {
    window.location.href = url;
  }
};

// Almacenamiento seguro
export const safeStorage = {
  getItem: (key) => {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  },
  setItem: (key, value) => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, value);
    }
  },
  removeItem: (key) => {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(key);
    }
  }
};

// Toast notifications
let toastTimeout;

export const showToast = (message, type = 'info') => {
  if (typeof document === 'undefined') return;

  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
  const toastIcon = document.getElementById('toastIcon');
  
  if (!toast || !toastMessage || !toastIcon) return;

  // Clear existing timeout
  if (toastTimeout) {
    clearTimeout(toastTimeout);
  }

  // Set icon and colors
  const config = {
    success: {
      icon: 'fa-check-circle',
      color: 'text-primary-400'
    },
    error: {
      icon: 'fa-exclamation-circle',
      color: 'text-red-400'
    },
    info: {
      icon: 'fa-info-circle',
      color: 'text-blue-400'
    }
  };

  // Update toast content
  toastMessage.textContent = message;
  toastIcon.className = `fas ${config[type].icon} ${config[type].color}`;

  // Show toast
  toast.classList.remove('hidden');
  toast.classList.add('animate-fade-in');

  // Hide after 3 seconds
  toastTimeout = setTimeout(() => {
    hideToast();
  }, 3000);
};

export const hideToast = () => {
  if (typeof document === 'undefined') return;

  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.classList.add('hidden');
  toast.classList.remove('animate-fade-in');
};

// Función segura para obtener el idioma del navegador
export function getBrowserLanguage() {
  if (isBrowser) {
    return navigator.language || navigator.userLanguage;
  }
  return 'es'; // Idioma por defecto
}

// Función segura para obtener la ruta actual
export function getCurrentPath() {
  if (isBrowser) {
    return window.location.pathname;
  }
  return '/';
}

// Función segura para scroll
export function getScrollY() {
  if (isBrowser) {
    return window.scrollY;
  }
  return 0;
}

// Función segura para DOMContentLoaded
export function onDOMContentLoaded(callback) {
  if (isBrowser) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      callback();
    }
  }
}

// Función segura para window load
export function onWindowLoad(callback) {
  if (isBrowser) {
    if (document.readyState === 'complete') {
      callback();
    } else {
      window.addEventListener('load', callback);
    }
  }
}

// Función segura para scroll
export function onScroll(callback) {
  if (isBrowser) {
    window.addEventListener('scroll', callback);
  }
}

// Función segura para click fuera de un elemento
export function onClickOutside(element, callback) {
  if (isBrowser) {
    document.addEventListener('click', (event) => {
      if (element && !element.contains(event.target)) {
        callback(event);
      }
    });
  }
} 