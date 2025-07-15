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
    await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    removeToken();
    return { success: true };
  } catch (error) {
    console.error('Error en logout:', error);
    removeToken();
    return { success: true };
  }
}

// Guardar token
export function setToken(token) {
  localStorage.setItem('token', token);
}

// Obtener token
export function getToken() {
  return localStorage.getItem('token');
}

// Eliminar token
export function removeToken() {
  localStorage.removeItem('token');
}

// Verificar si está autenticado
export function isAuthenticated() {
  return !!getToken();
} 