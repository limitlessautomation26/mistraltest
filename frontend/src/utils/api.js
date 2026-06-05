import axios from 'axios';

// Configuration de base d'axios
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token d'authentification
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token invalide ou expiré
      localStorage.removeItem('token');
      localStorage.removeItem('client');
      window.location.href = '/connexion';
    }
    return Promise.reject(error);
  }
);

// Fonctions pour l'authentification
export const authApi = {
  // Inscription
  inscription: (data) => api.post('/auth/inscription', data),
  
  // Connexion
  connexion: (data) => api.post('/auth/connexion', data),
  
  // Récupérer le profil
  getProfil: () => api.get('/auth/moi'),
  
  // Déconnexion
  deconnexion: () => api.post('/auth/deconnexion'),
  
  // Modifier le mot de passe
  modifierMotDePasse: (data) => api.patch('/auth/modifier-mot-de-passe', data),
};

// Fonctions pour les services
export const servicesApi = {
  // Récupérer tous les services
  getServices: () => api.get('/services'),
  
  // Récupérer un service
  getService: (id) => api.get(`/services/${id}`),
  
  // Créer un service
  createService: (data) => api.post('/services', data),
  
  // Mettre à jour un service
  updateService: (id, data) => api.put(`/services/${id}`, data),
  
  // Supprimer un service
  deleteService: (id) => api.delete(`/services/${id}`),
  
  // Mettre à jour l'ordre des services
  updateOrder: (services) => api.patch('/services/ordre', { services }),
};

// Fonctions pour les clients (admin)
export const clientsApi = {
  // Récupérer tous les clients
  getClients: () => api.get('/clients'),
  
  // Récupérer un client
  getClient: (id) => api.get(`/clients/${id}`),
  
  // Créer un client
  createClient: (data) => api.post('/clients', data),
  
  // Mettre à jour un client
  updateClient: (id, data) => api.put(`/clients/${id}`, data),
  
  // Supprimer un client
  deleteClient: (id) => api.delete(`/clients/${id}`),
  
  // Récupérer les services d'un client
  getClientServices: (id) => api.get(`/clients/${id}/services`),
  
  // Réinitialiser le mot de passe
  resetMotDePasse: (id, data) => api.patch(`/clients/${id}/reset-mot-de-passe`, data),
};

// Fonction pour gérer le stockage du token
export const setAuthToken = (token, client) => {
  if (token) {
    localStorage.setItem('token', token);
    localStorage.setItem('client', JSON.stringify(client));
    api.defaults.headers.Authorization = `Bearer ${token}`;
  } else {
    localStorage.removeItem('token');
    localStorage.removeItem('client');
    delete api.defaults.headers.Authorization;
  }
};

// Fonction pour récupérer le client stocké
export const getStoredClient = () => {
  const client = localStorage.getItem('client');
  return client ? JSON.parse(client) : null;
};

// Fonction pour vérifier si l'utilisateur est connecté
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

// Fonction pour vérifier si l'utilisateur est admin
export const isAdmin = () => {
  const client = getStoredClient();
  return client?.role === 'admin';
};

export default api;
