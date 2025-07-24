import { defineMiddleware } from 'astro/middleware';
import { verifyToken } from './utils/auth';

export const onRequest = defineMiddleware(async ({ request, redirect }) => {
  const url = new URL(request.url);
  const isLoginPage = url.pathname === '/login';
  const isAdminPage = url.pathname.startsWith('/admin');

  // Si es página de admin, verificar autenticación
  if (isAdminPage) {
    const isAuthenticated = await verifyToken();
    if (!isAuthenticated) {
      return redirect('/login');
    }
  }

  // Si es página de login y está autenticado, redirigir a admin
  if (isLoginPage) {
    const isAuthenticated = await verifyToken();
    if (isAuthenticated) {
      return redirect('/admin');
    }
  }
}); 