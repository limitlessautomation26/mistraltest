import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { servicesApi } from '../utils/api';
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Loader2,
  Calendar,
  Clock,
  Edit2,
  Save,
  X
} from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

function ProfilePage() {
  const { client, changePassword, refreshProfile, isLoading: authLoading } = useAuth();
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Formulaire de modification du mot de passe
  const [passwordForm, setPasswordForm] = useState({
    ancienMotDePasse: '',
    nouveauMotDePasse: '',
    confirmNouveauMotDePasse: ''
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // Charger les services
  useEffect(() => {
    const loadServices = async () => {
      try {
        const response = await servicesApi.getServices();
        setServices(response.data.data || []);
      } catch (err) {
        console.error('Erreur lors du chargement des services:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadServices();
  }, []);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!passwordForm.ancienMotDePasse || !passwordForm.nouveauMotDePasse || !passwordForm.confirmNouveauMotDePasse) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }
    
    if (passwordForm.nouveauMotDePasse !== passwordForm.confirmNouveauMotDePasse) {
      toast.error('Les nouveaux mots de passe ne correspondent pas');
      return;
    }
    
    if (passwordForm.nouveauMotDePasse.length < 6) {
      toast.error('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    setIsSubmitting(true);
    const result = await changePassword(passwordForm.ancienMotDePasse, passwordForm.nouveauMotDePasse);
    setIsSubmitting(false);

    if (result.success) {
      setPasswordForm({
        ancienMotDePasse: '',
        nouveauMotDePasse: '',
        confirmNouveauMotDePasse: ''
      });
      setEditMode(false);
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <LoadingSpinner size="lg" text="Chargement du profil..." />
      </div>
    );
  }

  if (!client) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
        <p>Erreur: Impossible de charger votre profil</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mon Profil</h1>
          <p className="text-gray-500 mt-1">Gérez vos informations personnelles</p>
        </div>
        
        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Edit2 className="w-4 h-4" />
            <span>Modifier le mot de passe</span>
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleSubmitPassword}
              disabled={isSubmitting}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-400 transition-colors"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Enregistrement...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Enregistrer</span>
                </>
              )}
            </button>
            <button
              onClick={() => {
                setEditMode(false);
                setPasswordForm({
                  ancienMotDePasse: '',
                  nouveauMotDePasse: '',
                  confirmNouveauMotDePasse: ''
                });
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              <X className="w-4 h-4" />
              <span>Annuler</span>
            </button>
          </div>
        )}
      </div>

      {/* Informations du profil */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Informations personnelles</h2>
        
        <div className="space-y-4">
          {/* Nom */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Nom complet</p>
              <p className="text-lg font-medium text-gray-900">{client.nom}</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
              <Mail className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-lg font-medium text-gray-900">{client.email}</p>
            </div>
          </div>

          {/* Rôle */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Rôle</p>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                client.role === 'admin' 
                  ? 'bg-purple-100 text-purple-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {client.role === 'admin' ? 'Administrateur' : 'Client'}
              </span>
            </div>
          </div>

          {/* Date de création */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
              <Calendar className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Membre depuis</p>
              <p className="text-lg font-medium text-gray-900">
                {new Date(client.dateCreation).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modification du mot de passe */}
      {editMode && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Modifier le mot de passe</h2>
          
          <form onSubmit={handleSubmitPassword} className="space-y-4">
            {/* Ancien mot de passe */}
            <div className="relative">
              <label htmlFor="ancienMotDePasse" className="block text-sm font-medium text-gray-700 mb-1">
                Ancien mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="ancienMotDePasse"
                  name="ancienMotDePasse"
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={passwordForm.ancienMotDePasse}
                  onChange={handlePasswordChange}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Nouveau mot de passe */}
            <div className="relative">
              <label htmlFor="nouveauMotDePasse" className="block text-sm font-medium text-gray-700 mb-1">
                Nouveau mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="nouveauMotDePasse"
                  name="nouveauMotDePasse"
                  type={showNewPassword ? 'text' : 'password'}
                  value={passwordForm.nouveauMotDePasse}
                  onChange={handlePasswordChange}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Doit contenir au moins 6 caractères</p>
            </div>

            {/* Confirmer le nouveau mot de passe */}
            <div className="relative">
              <label htmlFor="confirmNouveauMotDePasse" className="block text-sm font-medium text-gray-700 mb-1">
                Confirmer le nouveau mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="confirmNouveauMotDePasse"
                  name="confirmNouveauMotDePasse"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={passwordForm.confirmNouveauMotDePasse}
                  onChange={handlePasswordChange}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Statistiques des services */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Mes Services</h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">{services.length}</p>
            <p className="text-sm text-gray-500 mt-1">Total</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">{services.filter(s => s.estActif).length}</p>
            <p className="text-sm text-gray-500 mt-1">Actifs</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-red-600">{services.filter(s => !s.estActif).length}</p>
            <p className="text-sm text-gray-500 mt-1">Inactifs</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-primary-600">{client.services?.length || 0}</p>
            <p className="text-sm text-gray-500 mt-1">Associés</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
