import { getToken, isTokenExpiringSoon, refreshToken, removeToken } from '../utils/auth.js';

export async function handleAuth(request) {
  const token = getToken();
  
  if (!token) {
    return {
      isAuthenticated: false,
      redirect: '/login'
    };
  }

  // Verificar si el token está próximo a expirar
  if (isTokenExpiringSoon()) {
    try {
      const refreshed = await refreshToken();
      if (!refreshed) {
        removeToken();
        return {
          isAuthenticated: false,
          redirect: '/login'
        };
      }
    } catch (error) {
      console.error('Error al renovar token:', error);
      removeToken();
      return {
        isAuthenticated: false,
        redirect: '/login'
      };
    }
  }

  return {
    isAuthenticated: true
  };
} 