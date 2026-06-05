import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { servicesApi, clientsApi } from '../../utils/api';
import { 
  Grid3X3, 
  Plus, 
  Search,
  Filter,
  MoreVertical,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  RefreshCw,
  Link2,
  Image as ImageIcon,
  Palette,
  Type,
  Loader2
} from 'lucide-react';
import LoadingSpinner from '../../components/LoadingSpinner';
import EmptyState from '../../components/EmptyState';
import toast from 'react-hot-toast';

function AdminServicesPage() {
  const [services, setServices] = useState([]);
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('tous');
  const [clientFilter, setClientFilter] = useState('tous');
  const [isMenuOpen, setIsMenuOpen] = useState(null);
  
  // Modal pour ajouter/modifier un service
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedService, setSelectedService] = useState(null);
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    url: '',
    imageUrl: '',
    icone: '🔗',
    couleur: '#3b82f6',
    ordre: 0,
    estActif: true,
    clientId: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Charger les services et clients
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      
      // Charger les services
      const servicesResponse = await servicesApi.getServices();
      setServices(servicesResponse.data.data || []);
      
      // Charger les clients
      const clientsResponse = await clientsApi.getClients();
      setClients(clientsResponse.data.data || []);
      
      setError('');
    } catch (err) {
      console.error('Erreur lors du chargement des données:', err);
      setError('Erreur lors du chargement des données');
    } finally {
      setIsLoading(false);
    }
  };

  // Filtrer les services
  const filteredServices = services.filter(service => {
    const matchesSearch = service.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.url.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filter === 'tous' || 
                        (filter === 'actifs' && service.estActif) ||
                        (filter === 'inactifs' && !service.estActif);
    
    const matchesClientFilter = clientFilter === 'tous' || 
                               service.client?._id === clientFilter;
    
    return matchesSearch && matchesFilter && matchesClientFilter;
  });

  // Ouvrir le modal pour ajouter un service
  const openAddModal = () => {
    setModalMode('add');
    setSelectedService(null);
    setFormData({
      titre: '',
      description: '',
      url: '',
      imageUrl: '',
      icone: '🔗',
      couleur: '#3b82f6',
      ordre: 0,
      estActif: true,
      clientId: ''
    });
    setIsModalOpen(true);
  };

  // Ouvrir le modal pour modifier un service
  const openEditModal = (service) => {
    setModalMode('edit');
    setSelectedService(service);
    setFormData({
      titre: service.titre,
      description: service.description,
      url: service.url,
      imageUrl: service.imageUrl || '',
      icone: service.icone || '🔗',
      couleur: service.couleur || '#3b82f6',
      ordre: service.ordre || 0,
      estActif: service.estActif || true,
      clientId: service.client?._id || ''
    });
    setIsModalOpen(true);
  };

  // Fermer le modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
    setFormData({
      titre: '',
      description: '',
      url: '',
      imageUrl: '',
      icone: '🔗',
      couleur: '#3b82f6',
      ordre: 0,
      estActif: true,
      clientId: ''
    });
  };

  // Gérer les changements du formulaire
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.titre || !formData.description || !formData.url || !formData.clientId) {
      toast.error('Veuillez remplir les champs obligatoires');
      return;
    }
    
    // Validation de l'URL
    if (!formData.url.match(/^https?:\/\/.+/)) {
      toast.error('Veuillez entrer une URL valide (http:// ou https://)');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const serviceData = {
        titre: formData.titre,
        description: formData.description,
        url: formData.url,
        imageUrl: formData.imageUrl || undefined,
        icone: formData.icone,
        couleur: formData.couleur,
        ordre: formData.ordre,
        estActif: formData.estActif,
        clientId: formData.clientId
      };
      
      if (modalMode === 'add') {
        // Créer un nouveau service
        await servicesApi.createService(serviceData);
        toast.success('Service créé avec succès');
      } else {
        // Mettre à jour le service
        await servicesApi.updateService(selectedService._id, serviceData);
        toast.success('Service mis à jour avec succès');
      }
      
      // Rafraîchir la liste
      await loadData();
      closeModal();
    } catch (err) {
      const message = err.response?.data?.message || 'Erreur lors de la sauvegarde';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Supprimer un service
  const handleDelete = async (serviceId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) {
      return;
    }
    
    try {
      await servicesApi.deleteService(serviceId);
      toast.success('Service supprimé avec succès');
      await loadData();
    } catch (err) {
      const message = err.response?.data?.message || 'Erreur lors de la suppression';
      toast.error(message);
    }
  };

  // Toggle statut du service
  const toggleStatus = async (serviceId, currentStatus) => {
    try {
      await servicesApi.updateService(serviceId, {
        estActif: !currentStatus
      });
      toast.success(`Service ${currentStatus ? 'désactivé' : 'activé'} avec succès`);
      await loadData();
    } catch (err) {
      toast.error('Erreur lors de la mise à jour du service');
    }
  };

  // Toggle menu
  const toggleMenu = (serviceId) => {
    setIsMenuOpen(prev => prev === serviceId ? null : serviceId);
  };

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <LoadingSpinner size="lg" text="Chargement des services..." />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Services</h1>
          <p className="text-gray-500 mt-1">Ajoutez, modifiez ou supprimez des services pour vos clients</p>
        </div>
        
        <button
          onClick={openAddModal}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Ajouter un service</span>
        </button>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un service..."
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
              <option value="actifs">Actifs</option>
              <option value="inactifs">Inactifs</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-gray-400" />
            <select
              value={clientFilter}
              onChange={(e) => setClientFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            >
              <option value="tous">Tous les clients</option>
              {clients.map(client => (
                <option key={client._id} value={client._id}>{client.nom}</option>
              ))}
            </select>
          </div>
          
          <button
            onClick={loadData}
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
          <p className="text-2xl font-bold text-gray-900">{services.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500">Actifs</p>
          <p className="text-2xl font-bold text-green-600">{services.filter(s => s.estActif).length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500">Inactifs</p>
          <p className="text-2xl font-bold text-red-600">{services.filter(s => !s.estActif).length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500">Clients</p>
          <p className="text-2xl font-bold text-blue-600">{clients.length}</p>
        </div>
      </div>

      {/* Liste des services */}
      {filteredServices.length === 0 ? (
        <EmptyState
          title="Aucun service trouvé"
          description={searchQuery 
            ? `Aucun service ne correspond à "${searchQuery}"` 
            : "Aucun service n'a été ajouté pour le moment."
          }
          icon={<Grid3X3 className="w-12 h-12 text-gray-400" />}
          action={(
            <button
              onClick={openAddModal}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Ajouter un service</span>
            </button>
          )}
        />
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredServices.map((service) => (
                <tr key={service._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: service.couleur || '#3b82f6' }}
                      >
                        <span className="text-white text-sm">{service.icone || '🔗'}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{service.titre}</p>
                        <p className="text-xs text-gray-500 truncate max-w-[200px]">{service.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-600">{service.client?.nom || 'Client inconnu'}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <a 
                      href={service.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 truncate max-w-[150px] inline-flex items-center"
                    >
                      {service.url.replace(/^https?:\/\//, '')}
                      <Link2 className="w-3 h-3 ml-1" />
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      service.estActif 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {service.estActif ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-600">
                      {new Date(service.dateCreation).toLocaleDateString('fr-FR')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="relative">
                      <button
                        onClick={() => toggleMenu(service._id)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <MoreVertical className="w-5 h-5 text-gray-400" />
                      </button>
                      
                      {isMenuOpen === service._id && (
                        <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                          <button
                            onClick={() => openEditModal(service)}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                          >
                            <Edit2 className="w-4 h-4" />
                            <span>Modifier</span>
                          </button>
                          <button
                            onClick={() => toggleStatus(service._id, service.estActif)}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                          >
                            {service.estActif ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            <span>{service.estActif ? 'Désactiver' : 'Activer'}</span>
                          </button>
                          <button
                            onClick={() => handleDelete(service._id)}
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

      {/* Modal pour ajouter/modifier un service */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                {modalMode === 'add' ? 'Ajouter un service' : 'Modifier le service'}
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
              {/* Client */}
              <div className="relative">
                <label htmlFor="clientId" className="block text-sm font-medium text-gray-700 mb-1">
                  Client *
                </label>
                <select
                  id="clientId"
                  name="clientId"
                  value={formData.clientId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  required
                >
                  <option value="">Sélectionnez un client</option>
                  {clients.map(client => (
                    <option key={client._id} value={client._id}>{client.nom}</option>
                  ))}
                </select>
              </div>

              {/* Titre */}
              <div className="relative">
                <label htmlFor="titre" className="block text-sm font-medium text-gray-700 mb-1">
                  Titre *
                </label>
                <div className="relative">
                  <Type className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="titre"
                    name="titre"
                    type="text"
                    value={formData.titre}
                    onChange={handleChange}
                    placeholder="Agent Vocal"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div className="relative">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description du service..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none"
                  required
                />
              </div>

              {/* URL */}
              <div className="relative">
                <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                  URL *
                </label>
                <div className="relative">
                  <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="url"
                    name="url"
                    type="url"
                    value={formData.url}
                    onChange={handleChange}
                    placeholder="https://exemple.com"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Image URL */}
              <div className="relative">
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  URL de l'image (optionnel)
                </label>
                <div className="relative">
                  <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="imageUrl"
                    name="imageUrl"
                    type="url"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    placeholder="https://exemple.com/image.png"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  />
                </div>
              </div>

              {/* Icône et Couleur */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <label htmlFor="icone" className="block text-sm font-medium text-gray-700 mb-1">
                    Icône
                  </label>
                  <input
                    id="icone"
                    name="icone"
                    type="text"
                    value={formData.icone}
                    onChange={handleChange}
                    placeholder="🔗"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  />
                </div>
                
                <div className="relative">
                  <label htmlFor="couleur" className="block text-sm font-medium text-gray-700 mb-1">
                    Couleur
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      id="couleur"
                      name="couleur"
                      type="color"
                      value={formData.couleur}
                      onChange={handleChange}
                      className="w-8 h-8 rounded-lg border border-gray-300 cursor-pointer"
                    />
                    <span className="text-sm text-gray-600">{formData.couleur}</span>
                  </div>
                </div>
              </div>

              {/* Ordre et Statut */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <label htmlFor="ordre" className="block text-sm font-medium text-gray-700 mb-1">
                    Ordre
                  </label>
                  <input
                    id="ordre"
                    name="ordre"
                    type="number"
                    value={formData.ordre}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="estActif"
                      checked={formData.estActif}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    <span className="ml-3 text-sm font-medium text-gray-900">
                      {formData.estActif ? 'Actif' : 'Inactif'}
                    </span>
                  </label>
                </div>
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

export default AdminServicesPage;
