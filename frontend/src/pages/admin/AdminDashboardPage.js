import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { clientsApi, servicesApi } from '../../utils/api';
import { 
  Users, 
  Grid3X3,
  UserPlus,
  Plus,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock
} from 'lucide-react';
import LoadingSpinner from '../../components/LoadingSpinner';
import EmptyState from '../../components/EmptyState';

function AdminDashboardPage() {
  const [stats, setStats] = useState({
    clients: 0,
    services: 0,
    clientsActifs: 0,
    servicesActifs: 0,
    servicesRecents: [],
    clientsRecents: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Charger les statistiques
  useEffect(() => {
    const loadStats = async () => {
      try {
        setIsLoading(true);
        
        // Charger les clients
        const clientsResponse = await clientsApi.getClients();
        const clients = clientsResponse.data.data || [];
        
        // Charger les services
        const servicesResponse = await servicesApi.getServices();
        const services = servicesResponse.data.data || [];
        
        // Calculer les statistiques
        const clientsActifs = clients.filter(c => c.role === 'client').length;
        const servicesActifs = services.filter(s => s.estActif).length;
        
        // Trier par date de création (les plus récents en premier)
        const servicesRecents = [...services]
          .sort((a, b) => new Date(b.dateCreation) - new Date(a.dateCreation))
          .slice(0, 5);
        
        const clientsRecents = [...clients]
          .sort((a, b) => new Date(b.dateCreation) - new Date(a.dateCreation))
          .slice(0, 5);

        setStats({
          clients: clients.length,
          services: services.length,
          clientsActifs,
          servicesActifs,
          servicesRecents,
          clientsRecents
        });
        
        setError('');
      } catch (err) {
        console.error('Erreur lors du chargement des statistiques:', err);
        setError('Erreur lors du chargement des statistiques');
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <LoadingSpinner size="lg" text="Chargement des statistiques..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord Administrateur</h1>
          <p className="text-gray-500 mt-1">Gérez vos clients et leurs services</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Link
            to="/admin/clients"
            className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            <Users className="w-4 h-4" />
            <span>Gérer les clients</span>
          </Link>
          <Link
            to="/admin/services"
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter un service</span>
          </Link>
        </div>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.clients}</p>
              <p className="text-sm text-gray-500">Clients totaux</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">{stats.clientsActifs}</p>
              <p className="text-sm text-gray-500">Clients actifs</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Grid3X3 className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.services}</p>
              <p className="text-sm text-gray-500">Services totaux</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-600">{stats.servicesActifs}</p>
              <p className="text-sm text-gray-500">Services actifs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Graphiques et listes */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Services récents */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Services récents</h2>
            <Link
              to="/admin/services"
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Voir tous
            </Link>
          </div>
          
          {stats.servicesRecents.length === 0 ? (
            <EmptyState
              title="Aucun service récent"
              description="Aucun service n'a été créé récemment"
              icon={<Grid3X3 className="w-8 h-8 text-gray-400" />}
            />
          ) : (
            <div className="space-y-3">
              {stats.servicesRecents.map((service) => (
                <div 
                  key={service._id}
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: service.couleur || '#3b82f6' }}
                  >
                    <span className="text-white text-sm">{service.icone || '🔗'}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{service.titre}</p>
                    <p className="text-xs text-gray-500 truncate">{service.client?.nom || 'Client inconnu'}</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    service.estActif 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {service.estActif ? 'Actif' : 'Inactif'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Clients récents */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Clients récents</h2>
            <Link
              to="/admin/clients"
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Voir tous
            </Link>
          </div>
          
          {stats.clientsRecents.length === 0 ? (
            <EmptyState
              title="Aucun client récent"
              description="Aucun client n'a été ajouté récemment"
              icon={<Users className="w-8 h-8 text-gray-400" />}
            />
          ) : (
            <div className="space-y-3">
              {stats.clientsRecents.map((client) => (
                <div 
                  key={client._id}
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-600 font-medium text-sm">
                      {client.nom.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{client.nom}</p>
                    <p className="text-xs text-gray-500 truncate">{client.email}</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    client.role === 'admin' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {client.role === 'admin' ? 'Admin' : 'Client'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Actions rapides */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/admin/clients"
            className="flex flex-col items-center space-y-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <span className="font-medium text-gray-900">Gérer les clients</span>
            <span className="text-xs text-gray-500">{stats.clients} clients</span>
          </Link>
          
          <Link
            to="/admin/services"
            className="flex flex-col items-center space-y-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Grid3X3 className="w-6 h-6 text-purple-600" />
            </div>
            <span className="font-medium text-gray-900">Gérer les services</span>
            <span className="text-xs text-gray-500">{stats.services} services</span>
          </Link>
          
          <Link
            to="/admin/clients"
            className="flex flex-col items-center space-y-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center"
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <UserPlus className="w-6 h-6 text-green-600" />
            </div>
            <span className="font-medium text-gray-900">Ajouter un client</span>
            <span className="text-xs text-gray-500">Nouveau client</span>
          </Link>
          
          <Link
            to="/admin/services"
            className="flex flex-col items-center space-y-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center"
          >
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Plus className="w-6 h-6 text-orange-600" />
            </div>
            <span className="font-medium text-gray-900">Ajouter un service</span>
            <span className="text-xs text-gray-500">Nouveau service</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
