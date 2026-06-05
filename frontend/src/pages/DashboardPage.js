import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { servicesApi } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { 
  ExternalLink, 
  Plus, 
  Search,
  Filter,
  RefreshCw,
  Grid3X3,
  List,
  MoreVertical
} from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import ServiceCard from '../components/ServiceCard';
import EmptyState from '../components/EmptyState';

function DashboardPage() {
  const { client, refreshProfile } = useAuth();
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' ou 'list'
  const [filter, setFilter] = useState('tous'); // 'tous', 'actifs', 'inactifs'

  // Charger les services
  useEffect(() => {
    const loadServices = async () => {
      try {
        setIsLoading(true);
        const response = await servicesApi.getServices();
        setServices(response.data.data || []);
        setError('');
      } catch (err) {
        console.error('Erreur lors du chargement des services:', err);
        setError('Erreur lors du chargement des services');
      } finally {
        setIsLoading(false);
      }
    };

    loadServices();
  }, []);

  // Filtrer les services
  const filteredServices = services.filter(service => {
    // Filtre par recherche
    const matchesSearch = service.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filtre par statut
    const matchesFilter = filter === 'tous' || 
                        (filter === 'actifs' && service.estActif) ||
                        (filter === 'inactifs' && !service.estActif);
    
    return matchesSearch && matchesFilter;
  });

  // Rafraîchir les services
  const handleRefresh = async () => {
    try {
      setIsLoading(true);
      const response = await servicesApi.getServices();
      setServices(response.data.data || []);
      await refreshProfile();
    } catch (err) {
      console.error('Erreur lors du rafraîchissement:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Changer le mode d'affichage
  const toggleViewMode = () => {
    setViewMode(prev => prev === 'grid' ? 'list' : 'grid');
  };

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <LoadingSpinner size="lg" text="Chargement des services..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
        <p>{error}</p>
        <button
          onClick={handleRefresh}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mes Services</h1>
          <p className="text-gray-500 mt-1">
            Accédez rapidement à tous vos services en un seul endroit
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2 text-sm"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Rafraîchir</span>
          </button>
          <button
            onClick={toggleViewMode}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2 text-sm"
          >
            {viewMode === 'grid' ? <Grid3X3 className="w-4 h-4" /> : <List className="w-4 h-4" />}
            <span>{viewMode === 'grid' ? 'Grille' : 'Liste'}</span>
          </button>
        </div>
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
          <p className="text-2xl font-bold text-green-600">
            {services.filter(s => s.estActif).length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500">Inactifs</p>
          <p className="text-2xl font-bold text-red-600">
            {services.filter(s => !s.estActif).length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500">Dernier ajouté</p>
          <p className="text-sm font-medium text-gray-900 truncate">
            {services.length > 0 
              ? new Date(services[0].dateCreation).toLocaleDateString('fr-FR')
              : 'Aucun'}
          </p>
        </div>
      </div>

      {/* Liste des services */}
      {filteredServices.length === 0 ? (
        <EmptyState
          title="Aucun service trouvé"
          description={searchQuery 
            ? `Aucun service ne correspond à "${searchQuery}"` 
            : "Vous n'avez pas encore de services. Contactez votre administrateur pour en ajouter."
          }
          icon={<Grid3X3 className="w-12 h-12 text-gray-400" />}
          action={(
            <Link
              to="/profil"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span>Gérer mon profil</span>
            </Link>
          )}
        />
      ) : (
        <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : ''}`}>
          {filteredServices.map((service) => (
            <ServiceCard
              key={service._id}
              service={service}
              viewMode={viewMode}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
