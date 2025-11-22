// API Configuration
// Detecta automáticamente si estamos en desarrollo o producción
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 
  (typeof window !== 'undefined' && window.location.hostname === 'localhost' 
    ? 'http://localhost:5000'
    : 'https://backendletsgotravel.onrender.com');

// Helper function para hacer fetch con la URL base
export const apiFetch = (endpoint: string, options?: RequestInit) => {
  return fetch(`${API_BASE_URL}${endpoint}`, options);
};
