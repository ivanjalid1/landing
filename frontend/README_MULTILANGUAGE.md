# Sistema Multiidioma - Top Ads Landing

## Características Implementadas

### 🌍 Soporte Multiidioma
- **Español** (idioma por defecto) - `/`
- **Inglés** - `/en/`
- **Ruso** - `/ru/`

### 🔍 Detección Automática
- **Detección por navegador**: Detecta automáticamente el idioma del navegador del usuario
- **Detección por país**: Mapea países a idiomas (ej: usuarios de Rusia → Ruso)
- **Preferencias guardadas**: Recuerda la selección del usuario en localStorage

### 🎯 URLs Inteligentes
- **Español**: `https://tudominio.com/` (sin prefijo)
- **Inglés**: `https://tudominio.com/en/`
- **Ruso**: `https://tudominio.com/ru/`

### 🎨 Selector de Idioma
- **Interfaz elegante** con banderas y nombres de idiomas
- **Dropdown animado** con transiciones suaves
- **Indicador visual** del idioma actual

## Estructura de Archivos

```
frontend/src/
├── i18n/
│   └── translations.js          # Traducciones centralizadas
├── middleware/
│   └── i18n.js                 # Lógica de detección de idioma
├── scripts/
│   └── languageDetection.js    # Script de detección del lado cliente
├── components/
│   ├── LanguageSelector.astro  # Componente selector de idioma
│   ├── Header.astro           # Header con selector integrado
│   └── Services.astro         # Componente con traducciones
└── pages/
    ├── index.astro            # Página principal (español)
    ├── en/
    │   └── index.astro        # Página en inglés
    └── ru/
        └── index.astro        # Página en ruso
```

## Cómo Funciona

### 1. Detección Automática
Cuando un usuario visita la página raíz (`/`):
1. Se detecta su idioma del navegador
2. Se verifica si hay una preferencia guardada
3. Si el idioma detectado no es español, se redirige automáticamente

### 2. Navegación Manual
Los usuarios pueden cambiar idioma usando el selector en el header:
1. Hacer clic en el selector de idioma
2. Seleccionar el idioma deseado
3. Se guarda la preferencia y se redirige

### 3. URLs Persistentes
- Las URLs mantienen el prefijo de idioma
- Los enlaces internos funcionan correctamente
- SEO optimizado para cada idioma

## Configuración

### Agregar Nuevos Idiomas

1. **Agregar traducciones** en `src/i18n/translations.js`:
```javascript
export const translations = {
  // ... idiomas existentes
  fr: {
    // Traducciones en francés
  }
};
```

2. **Actualizar configuración**:
```javascript
export const languages = {
  // ... idiomas existentes
  fr: { name: "Français", flag: "🇫🇷" }
};

export const supportedLanguages = ['es', 'en', 'ru', 'fr'];
```

3. **Crear página** en `src/pages/fr/index.astro`

### Personalizar Detección

Editar `src/scripts/languageDetection.js` para:
- Agregar más países
- Cambiar la lógica de detección
- Modificar el comportamiento de redirección

## SEO y Rendimiento

### Meta Tags
- Cada página tiene sus propios meta tags
- `lang` attribute dinámico en el HTML
- Open Graph tags específicos por idioma

### Rendimiento
- Detección del lado cliente (no bloquea la carga)
- Traducciones precargadas
- Caché de preferencias en localStorage

## Mantenimiento

### Agregar Nuevas Traducciones
1. Editar `src/i18n/translations.js`
2. Agregar las nuevas claves de traducción
3. Actualizar los componentes que usan las traducciones

### Actualizar Componentes
Para que un componente use traducciones:
1. Importar las traducciones
2. Detectar el idioma actual
3. Usar las traducciones en lugar de texto hardcodeado

## Ejemplo de Uso

```astro
---
import { translations } from '../i18n/translations.js';
import { extractLanguageFromUrl } from '../middleware/i18n.js';

const currentLang = extractLanguageFromUrl(Astro.url.pathname);
const t = translations[currentLang];
---

<h1>{t.hero.title}</h1>
<p>{t.hero.subtitle}</p>
```

## Notas Importantes

- **Español es el idioma por defecto** (sin prefijo en URL)
- **Las traducciones son fallback** - si no existe una traducción, se usa el texto en español
- **La detección es no intrusiva** - solo redirige si el usuario no está ya en una ruta con idioma
- **Soporte para SSR** - funciona tanto en desarrollo como en producción 