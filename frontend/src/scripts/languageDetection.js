import { safeStorage, getBrowserLanguage, safeRedirect, getCurrentPath } from '../utils/browser.js';

// Detección de idioma en el lado del cliente
export function detectUserLanguage() {
  // Obtener idioma del navegador
  const browserLang = getBrowserLanguage();
  const langCode = browserLang.split('-')[0];
  
  // Mapeo de países a idiomas (simplificado)
  const countryLanguageMap = {
    'es': 'es', // Español
    'en': 'en', // Inglés
    'ru': 'ru', // Ruso
    'uk': 'ru', // Ucraniano -> Ruso
    'be': 'ru', // Bielorruso -> Ruso
    'kk': 'ru', // Kazajo -> Ruso
    'ky': 'ru', // Kirguís -> Ruso
    'tg': 'ru', // Tayiko -> Ruso
    'uz': 'ru', // Uzbeko -> Ruso
    'tk': 'ru', // Turcomano -> Ruso
    'md': 'ru', // Moldavo -> Ruso
    'ka': 'ru', // Georgiano -> Ruso
    'hy': 'ru', // Armenio -> Ruso
    'az': 'ru', // Azerbaiyano -> Ruso
    'et': 'ru', // Estonio -> Ruso
    'lv': 'ru', // Letón -> Ruso
    'lt': 'ru', // Lituano -> Ruso
  };
  
  // Detectar idioma preferido
  let detectedLang = 'es'; // Por defecto español
  
  // Verificar si el idioma del navegador está soportado
  if (countryLanguageMap[langCode]) {
    detectedLang = countryLanguageMap[langCode];
  }
  
  // Verificar si ya hay un idioma guardado en localStorage
  const savedLang = safeStorage.getItem('preferred-language');
  if (savedLang && ['es', 'en', 'ru'].includes(savedLang)) {
    detectedLang = savedLang;
  }
  
  return detectedLang;
}

// Función para redirigir según el idioma
export function redirectToLanguage() {
  const currentPath = getCurrentPath();
  const detectedLang = detectUserLanguage();
  
  // Si estamos en la página raíz y el idioma detectado no es español
  if (currentPath === '/' && detectedLang !== 'es') {
    const newUrl = `/${detectedLang}${currentPath}`;
    safeRedirect(newUrl);
  }
}

// Función para cambiar idioma
export function changeLanguage(lang) {
  const currentPath = getCurrentPath();
  const pathSegments = currentPath.split('/').filter(Boolean);
  
  // Remover prefijo de idioma existente si existe
  let cleanPath = currentPath;
  if (['es', 'en', 'ru'].includes(pathSegments[0])) {
    cleanPath = '/' + pathSegments.slice(1).join('/');
  }
  
  // Construir nueva URL
  let newUrl;
  if (lang === 'es') {
    newUrl = cleanPath;
  } else {
    newUrl = `/${lang}${cleanPath}`;
  }
  
  // Guardar preferencia
  safeStorage.setItem('preferred-language', lang);
  
  // Redirigir
  safeRedirect(newUrl);
}

// Ejecutar detección al cargar la página
if (typeof window !== 'undefined') {
  // Solo ejecutar si no estamos ya en una ruta con idioma
  const currentPath = getCurrentPath();
  const pathSegments = currentPath.split('/').filter(Boolean);
  
  if (currentPath === '/' || !['es', 'en', 'ru'].includes(pathSegments[0])) {
    redirectToLanguage();
  }
} 