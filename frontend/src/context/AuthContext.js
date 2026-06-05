import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi, setAuthToken, getStoredClient, isAuthenticated as checkAuth } from '../utils/api';
import toast from 'react-hot-toast';

// Créer le contexte
const AuthContext = createContext();

// Hook personnalisé pour utiliser le contexte
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
};

// Fournisseur du contexte
export const AuthProvider = ({ children }) => {
  const [client, setClient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Charger le client au démarrage
  useEffect(() => {
    const loadClient = async () => {
      try {
        if (checkAuth()) {
          const storedClient = getStoredClient();
          if (storedClient) {
            setClient(storedClient);
            setIsAuthenticated(true);
            
            // Rafraîchir les données du client
            try {
              const response = await authApi.getProfil();
              setClient(response.data.data.client);
            } catch (err) {
              console.error('Erreur lors du rafraîchissement du profil:', err);
            }
          }
        }
      } catch (err) {
        console.error('Erreur lors du chargement du client:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadClient();
  }, []);

  // Connexion
  const login = async (email, motDePasse) => {
    try {
      setIsLoading(true);
      const response = await authApi.connexion({ email, motDePasse });
      
      const { token, client: clientData } = response.data.data;
      
      // Stocker le token et le client
      setAuthToken(token, clientData);
      setClient(clientData);
      setIsAuthenticated(true);
      
      toast.success(`Bonjour, ${clientData.nom}!`);
      
      return { success: true, client: clientData };
    } catch (err) {
      const message = err.response?.data?.message || 'Erreur de connexion';
      toast.error(message);
      return { success: false, message };
    } finally {
      setIsLoading(false);
    }
  };

  // Inscription
  const register = async (nom, email, motDePasse) => {
    try {
      setIsLoading(true);
      const response = await authApi.inscription({ nom, email, motDePasse });
      
      const { token, client: clientData } = response.data.data;
      
      // Stocker le token et le client
      setAuthToken(token, clientData);
      setClient(clientData);
      setIsAuthenticated(true);
      
      toast.success(`Compte créé avec succès, ${clientData.nom}!`);
      
      return { success: true, client: clientData };
    } catch (err) {
      const message = err.response?.data?.message || 'Erreur d\'inscription';
      toast.error(message);
      return { success: false, message };
    } finally {
      setIsLoading(false);
    }
  };

  // Déconnexion
  const logout = async () => {
    try {
      await authApi.deconnexion();
    } catch (err) {
      console.error('Erreur lors de la déconnexion:', err);
    } finally {
      // Supprimer le token et le client
      setAuthToken(null, null);
      setClient(null);
      setIsAuthenticated(false);
      toast.success('Déconnexion réussie');
    }
  };

  // Modifier le mot de passe
  const changePassword = async (ancienMotDePasse, nouveauMotDePasse) => {
    try {
      setIsLoading(true);
      await authApi.modifierMotDePasse({ ancienMotDePasse, nouveauMotDePasse });
      toast.success('Mot de passe modifié avec succès');
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Erreur de modification';
      toast.error(message);
      return { success: false, message };
    } finally {
      setIsLoading(false);
    }
  };

  // Rafraîchir le profil
  const refreshProfile = async () => {
    try {
      const response = await authApi.getProfil();
      setClient(response.data.data.client);
      return response.data.data.client;
    } catch (err) {
      console.error('Erreur lors du rafraîchissement du profil:', err);
      toast.error('Erreur lors du chargement du profil');
      return null;
    }
  };

  const value = {
    client,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    changePassword,
    refreshProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
