import { defineMiddleware } from 'astro/middleware';
import { getToken } from './utils/auth';

export const onRequest = defineMiddleware(async (context, next) => {
  // Ignorar rutas públicas
  if (context.url.pathname === '/login' || 
      context.url.pathname === '/register' || 
      context.url.pathname.startsWith('/api/') ||
      !context.url.pathname.startsWith('/admin')) {
    return next();
  }

  // Verificar autenticación
  const token = getToken();
  if (!token) {
    return context.redirect('/login');
  }

  // Continuar con la solicitud
  return next();
}); 