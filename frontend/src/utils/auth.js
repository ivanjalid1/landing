import { safeStorage, safeRedirect } from './browser.js';

// Configuración de la API
const API_BASE_URL = 'http://localhost:5000/api';

// Verificar si el usuario es admin
export async function isAdmin(request) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/verify`, {
      headers: {
        Cookie: request.headers.get('cookie') || ''
      }
    });

    if (!response.ok) return false;

    const data = await response.json();
    return data.role === 'admin';
  } catch (error) {
    console.error('Error al verificar el rol:', error);
    return false;
  }
}

// Función de login
export async function login(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    
    if (data.success) {
      setToken(data.token);
      setTokenExpiry(data.expiresIn || 3600); // 1 hora por defecto
      return { success: true, user: data.user };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    console.error('Error en login:', error);
    return { success: false, message: 'Error de conexión' };
  }
}

// Función de registro
export async function register(email, password, name) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name }),
    });

    const data = await response.json();
    
    if (data.success) {
      return { success: true, user: data.user };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    console.error('Error en registro:', error);
    return { success: false, message: 'Error de conexión' };
  }
}

// Función de logout
export async function logout() {
  try {
    const token = getToken();
    if (token) {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
    }
    
    removeToken();
    return { success: true };
  } catch (error) {
    console.error('Error en logout:', error);
    removeToken();
    return { success: true };
  }
}

// Renovar token
export async function refreshToken() {
  try {
    const token = getToken();
    if (!token) return false;

    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    const data = await response.json();
    
    if (data.success) {
      setToken(data.token);
      setTokenExpiry(data.expiresIn || 3600);
      return true;
    } else {
      removeToken();
      return false;
    }
  } catch (error) {
    console.error('Error al renovar token:', error);
    removeToken();
    return false;
  }
}

// Verificar si el token está próximo a expirar
export function isTokenExpiringSoon() {
  const expiryTime = safeStorage.getItem('tokenExpiry');
  if (!expiryTime) return true;
  
  const now = Date.now();
  const expiry = parseInt(expiryTime);
  const timeUntilExpiry = expiry - now;
  
  // Renovar si expira en menos de 5 minutos
  return timeUntilExpiry < 5 * 60 * 1000;
}

// Guardar token
export function setToken(token) {
  safeStorage.setItem('token', token);
}

// Guardar tiempo de expiración del token
export function setTokenExpiry(expiresIn) {
  const expiryTime = Date.now() + (expiresIn * 1000);
  safeStorage.setItem('tokenExpiry', expiryTime.toString());
}

// Obtener token
export function getToken() {
  return safeStorage.getItem('token');
}

// Eliminar token
export function removeToken() {
  safeStorage.removeItem('token');
  safeStorage.removeItem('tokenExpiry');
}

// Verificar si está autenticado
export function isAuthenticated() {
  const token = getToken();
  if (!token) return false;
  
  // Verificar si el token ha expirado
  const expiryTime = safeStorage.getItem('tokenExpiry');
  if (expiryTime) {
    const now = Date.now();
    const expiry = parseInt(expiryTime);
    if (now >= expiry) {
      removeToken();
      return false;
    }
  }
  
  return true;
}

// Función para hacer requests autenticados
export async function authenticatedFetch(url, options = {}) {
  const token = getToken();
  
  if (!token) {
    throw new Error('No hay token de autenticación');
  }
  
  // Verificar si el token está próximo a expirar
  if (isTokenExpiringSoon()) {
    const refreshed = await refreshToken();
    if (!refreshed) {
      throw new Error('Token expirado y no se pudo renovar');
    }
  }
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...options.headers
  };
  
  const response = await fetch(url, {
    ...options,
    headers
  });
  
  if (response.status === 401) {
    // Token inválido, intentar renovar
    const refreshed = await refreshToken();
    if (refreshed) {
      // Reintentar la request con el nuevo token
      const newToken = getToken();
      headers.Authorization = `Bearer ${newToken}`;
      
      const retryResponse = await fetch(url, {
        ...options,
        headers
      });
      
      if (retryResponse.status === 401) {
        // Token sigue inválido, hacer logout
        removeToken();
        safeRedirect('/login');
        throw new Error('Sesión expirada');
      }
      
      return retryResponse;
    } else {
      // No se pudo renovar, hacer logout
      removeToken();
      safeRedirect('/login');
      throw new Error('Sesión expirada');
    }
  }
  
  return response;
} 