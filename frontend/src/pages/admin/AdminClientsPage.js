import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { clientsApi } from '../../utils/api';
import { 
  Users, 
  UserPlus, 
  Search,
  Filter,
  MoreVertical,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  RefreshCw,
  Mail,
  Calendar,
  Shield,
  Loader2
} from 'lucide-react';
import LoadingSpinner from '../../components/LoadingSpinner';
import EmptyState from '../../components/EmptyState';
import toast from 'react-hot-toast';

function AdminClientsPage() {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('tous');
  const [isMenuOpen, setIsMenuOpen] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  
  // Modal pour ajouter/modifier un client
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' ou 'edit'
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    motDePasse: '',
    role: 'client'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Charger les clients
  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      setIsLoading(true);
      const response = await clientsApi.getClients();
      setClients(response.data.data || []);
      setError('');
    } catch (err) {
      console.error('Erreur lors du chargement des clients:', err);
      setError('Erreur lors du chargement des clients');
    } finally {
      setIsLoading(false);
    }
  };

  // Filtrer les clients
  const filteredClients = clients.filter(client => {
    const matchesSearch = client.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filter === 'tous' || 
                        (filter === 'admins' && client.role === 'admin') ||
                        (filter === 'clients' && client.role === 'client');
    
    return matchesSearch && matchesFilter;
  });

  // Ouvrir le modal pour ajouter un client
  const openAddModal = () => {
    setModalMode('add');
    setFormData({
      nom: '',
      email: '',
      motDePasse: '',
      role: 'client'
    });
    setIsModalOpen(true);
  };

  // Ouvrir le modal pour modifier un client
  const openEditModal = (client) => {
    setModalMode('edit');
    setSelectedClient(client);
    setFormData({
      nom: client.nom,
      email: client.email,
      motDePasse: '',
      role: client.role
    });
    setIsModalOpen(true);
  };

  // Fermer le modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedClient(null);
    setFormData({
      nom: '',
      email: '',
      motDePasse: '',
      role: 'client'
    });
  };

  // Gérer les changements du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.nom || !formData.email) {
      toast.error('Veuillez remplir les champs obligatoires');
      return;
    }
    
    if (modalMode === 'add' && !formData.motDePasse) {
      toast.error('Veuillez fournir un mot de passe');
      return;
    }

    setIsSubmitting(true);
    
    try {
      if (modalMode === 'add') {
        // Créer un nouveau client
        await clientsApi.createClient(formData);
        toast.success('Client créé avec succès');
      } else {
        // Mettre à jour le client
        await clientsApi.updateClient(selectedClient._id, formData);
        toast.success('Client mis à jour avec succès');
      }
      
      // Rafraîchir la liste
      await loadClients();
      closeModal();
    } catch (err) {
      const message = err.response?.data?.message || 'Erreur lors de la sauvegarde';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Supprimer un client
  const handleDelete = async (clientId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce client ? Tous ses services seront également supprimés.')) {
      return;
    }
    
    try {
      await clientsApi.deleteClient(clientId);
      toast.success('Client supprimé avec succès');
      await loadClients();
    } catch (err) {
      const message = err.response?.data?.message || 'Erreur lors de la suppression';
      toast.error(message);
    }
  };

  // Réinitialiser le mot de passe
  const handleResetPassword = async (clientId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir réinitialiser le mot de passe de ce client ?')) {
      return;
    }
    
    try {
      await clientsApi.resetMotDePasse(clientId, { nouveauMotDePasse: 'password123' });
      toast.success('Mot de passe réinitialisé avec succès (password123)');
    } catch (err) {
      const message = err.response?.data?.message || 'Erreur lors de la réinitialisation';
      toast.error(message);
    }
  };

  // Toggle menu
  const toggleMenu = (clientId) => {
    setIsMenuOpen(prev => prev === clientId ? null : clientId);
  };

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <LoadingSpinner size="lg" text="Chargement des clients..." />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Clients</h1>
          <p className="text-gray-500 mt-1">Ajoutez, modifiez ou supprimez des clients</p>
        </div>
        
        <button
          onClick={openAddModal}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          <span>Ajouter un client</span>
        </button>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un client..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            >
              <option value="tous">Tous</option>
              <option value="admins">Administrateurs</option>
              <option value="clients">Clients</option>
            </select>
          </div>
          
          <button
            onClick={loadClients}
            className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <RefreshCw className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-2xl font-bold text-gray-900">{clients.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500">Administrateurs</p>
          <p className="text-2xl font-bold text-purple-600">
            {clients.filter(c => c.role === 'admin').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500">Clients</p>
          <p className="text-2xl font-bold text-blue-600">
            {clients.filter(c => c.role === 'client').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500">Services totaux</p>
          <p className="text-2xl font-bold text-green-600">
            {clients.reduce((sum, client) => sum + (client.services?.length || 0), 0)}
          </p>
        </div>
      </div>

      {/* Liste des clients */}
      {filteredClients.length === 0 ? (
        <EmptyState
          title="Aucun client trouvé"
          description={searchQuery 
            ? `Aucun client ne correspond à "${searchQuery}"` 
            : "Aucun client n'a été ajouté pour le moment."
          }
          icon={<Users className="w-12 h-12 text-gray-400" />}
          action={(
            <button
              onClick={openAddModal}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              <span>Ajouter un client</span>
            </button>
          )}
        />
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rôle</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Services</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClients.map((client) => (
                <tr key={client._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-primary-600 font-medium text-sm">
                          {client.nom.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="font-medium text-gray-900">{client.nom}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <a href={`mailto:${client.email}`} className="text-gray-600 hover:text-primary-600">
                      {client.email}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      client.role === 'admin' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {client.role === 'admin' ? 'Administrateur' : 'Client'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-600">{client.services?.length || 0}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-600">
                      {new Date(client.dateCreation).toLocaleDateString('fr-FR')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="relative">
                      <button
                        onClick={() => toggleMenu(client._id)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <MoreVertical className="w-5 h-5 text-gray-400" />
                      </button>
                      
                      {isMenuOpen === client._id && (
                        <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                          <button
                            onClick={() => openEditModal(client)}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                          >
                            <Edit2 className="w-4 h-4" />
                            <span>Modifier</span>
                          </button>
                          <button
                            onClick={() => handleResetPassword(client._id)}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                          >
                            <Shield className="w-4 h-4" />
                            <span>Réinit. mot de passe</span>
                          </button>
                          <button
                            onClick={() => handleDelete(client._id)}
                            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Supprimer</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal pour ajouter/modifier un client */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                {modalMode === 'add' ? 'Ajouter un client' : 'Modifier le client'}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Nom */}
              <div className="relative">
                <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom complet *
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="nom"
                    name="nom"
                    type="text"
                    value={formData.nom}
                    onChange={handleChange}
                    placeholder="Jean Dupont"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="relative">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Mot de passe (uniquement pour l'ajout) */}
              {modalMode === 'add' && (
                <div className="relative">
                  <label htmlFor="motDePasse" className="block text-sm font-medium text-gray-700 mb-1">
                    Mot de passe *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="motDePasse"
                      name="motDePasse"
                      type="password"
                      value={formData.motDePasse}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Doit contenir au moins 6 caractères</p>
                </div>
              )}

              {/* Rôle */}
              <div className="relative">
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                  Rôle *
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  required
                >
                  <option value="client">Client</option>
                  <option value="admin">Administrateur</option>
                </select>
              </div>

              {/* Boutons */}
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-primary-400 transition-colors font-medium flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Enregistrement...</span>
                    </>
                  ) : (
                    <span>{modalMode === 'add' ? 'Ajouter' : 'Enregistrer'}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminClientsPage;
