import { supportedLanguages, defaultLanguage } from '../i18n/translations.js';

// Mapeo de países a idiomas
const countryLanguageMap = {
  // Países de habla hispana
  'ES': 'es', // España
  'MX': 'es', // México
  'AR': 'es', // Argentina
  'CO': 'es', // Colombia
  'PE': 'es', // Perú
  'VE': 'es', // Venezuela
  'CL': 'es', // Chile
  'EC': 'es', // Ecuador
  'GT': 'es', // Guatemala
  'CU': 'es', // Cuba
  'BO': 'es', // Bolivia
  'DO': 'es', // República Dominicana
  'HN': 'es', // Honduras
  'PY': 'es', // Paraguay
  'SV': 'es', // El Salvador
  'NI': 'es', // Nicaragua
  'CR': 'es', // Costa Rica
  'PA': 'es', // Panamá
  'UY': 'es', // Uruguay
  'GQ': 'es', // Guinea Ecuatorial
  
  // Países de habla inglesa
  'US': 'en', // Estados Unidos
  'GB': 'en', // Reino Unido
  'CA': 'en', // Canadá
  'AU': 'en', // Australia
  'NZ': 'en', // Nueva Zelanda
  'IE': 'en', // Irlanda
  'ZA': 'en', // Sudáfrica
  'IN': 'en', // India
  'PK': 'en', // Pakistán
  'NG': 'en', // Nigeria
  'KE': 'en', // Kenia
  'UG': 'en', // Uganda
  'TZ': 'en', // Tanzania
  'ZW': 'en', // Zimbabue
  'BW': 'en', // Botsuana
  'ZM': 'en', // Zambia
  'MW': 'en', // Malawi
  'LS': 'en', // Lesoto
  'SZ': 'en', // Suazilandia
  'NA': 'en', // Namibia
  
  // Países de habla rusa
  'RU': 'ru', // Rusia
  'BY': 'ru', // Bielorrusia
  'KZ': 'ru', // Kazajistán
  'KG': 'ru', // Kirguistán
  'TJ': 'ru', // Tayikistán
  'UZ': 'ru', // Uzbekistán
  'TM': 'ru', // Turkmenistán
  'MD': 'ru', // Moldavia
  'GE': 'ru', // Georgia
  'AM': 'ru', // Armenia
  'AZ': 'ru', // Azerbaiyán
  'UA': 'ru', // Ucrania
  'EE': 'ru', // Estonia
  'LV': 'ru', // Letonia
  'LT': 'ru', // Lituania
};

// Función para detectar el idioma preferido del usuario
export function detectUserLanguage(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  // Si ya hay un prefijo de idioma en la URL, usarlo
  const pathSegments = pathname.split('/').filter(Boolean);
  if (pathSegments.length > 0 && supportedLanguages.includes(pathSegments[0])) {
    return pathSegments[0];
  }
  
  // Detectar por Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const languages = acceptLanguage.split(',').map(lang => {
      const [code, quality = '1'] = lang.trim().split(';q=');
      return { code: code.split('-')[0], quality: parseFloat(quality) };
    }).sort((a, b) => b.quality - a.quality);
    
    for (const lang of languages) {
      if (supportedLanguages.includes(lang.code)) {
        return lang.code;
      }
    }
  }
  
  // Detectar por país usando Cloudflare (si está disponible)
  const country = request.headers.get('cf-ipcountry') || 
                  request.headers.get('x-forwarded-for-country') ||
                  request.headers.get('x-country');
  
  if (country && countryLanguageMap[country]) {
    return countryLanguageMap[country];
  }
  
  // Detectar por IP geográfica (fallback)
  const clientIP = request.headers.get('cf-connecting-ip') || 
                   request.headers.get('x-forwarded-for') ||
                   request.headers.get('x-real-ip');
  
  if (clientIP) {
    // Aquí podrías implementar una API de geolocalización
    // Por ahora, usamos el idioma por defecto
    return defaultLanguage;
  }
  
  return defaultLanguage;
}

// Función para obtener la URL correcta según el idioma
export function getLocalizedUrl(pathname, language) {
  if (language === defaultLanguage) {
    return pathname;
  }
  
  // Remover cualquier prefijo de idioma existente
  const cleanPath = pathname.replace(/^\/(es|en|ru)/, '');
  return `/${language}${cleanPath}`;
}

// Función para extraer el idioma de la URL
export function extractLanguageFromUrl(pathname) {
  const pathSegments = pathname.split('/').filter(Boolean);
  if (pathSegments.length > 0 && supportedLanguages.includes(pathSegments[0])) {
    return pathSegments[0];
  }
  return defaultLanguage;
}

// Función para obtener la ruta sin el prefijo de idioma
export function getPathWithoutLanguage(pathname) {
  const pathSegments = pathname.split('/').filter(Boolean);
  if (pathSegments.length > 0 && supportedLanguages.includes(pathSegments[0])) {
    return '/' + pathSegments.slice(1).join('/');
  }
  return pathname;
} 