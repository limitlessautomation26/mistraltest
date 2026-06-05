import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, MoreVertical, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import { servicesApi } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

function ServiceCard({ service, viewMode = 'grid', onUpdate, onDelete }) {
  const { client } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isAdmin = client?.role === 'admin';
  const isOwner = client?._id === service.client?._id || isAdmin;

  // Toggle statut du service
  const toggleStatus = async () => {
    try {
      await servicesApi.updateService(service._id, {
        estActif: !service.estActif
      });
      toast.success(`Service ${service.estActif ? 'désactivé' : 'activé'} avec succès`);
      if (onUpdate) onUpdate();
    } catch (err) {
      toast.error('Erreur lors de la mise à jour du service');
    }
  };

  // Supprimer le service
  const handleDelete = async () => {
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer "${service.titre}" ?`)) {
      return;
    }
    
    try {
      await servicesApi.deleteService(service._id);
      toast.success('Service supprimé avec succès');
      if (onDelete) onDelete();
    } catch (err) {
      toast.error('Erreur lors de la suppression du service');
    }
  };

  // Ouvrir l'URL dans un nouvel onglet
  const openService = () => {
    window.open(service.url, '_blank', 'noopener,noreferrer');
  };

  // Couleur de fond par défaut
  const getBackgroundColor = () => {
    if (service.couleur) {
      return service.couleur;
    }
    const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#ef4444', '#f59e0b', '#10b981'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-slide-in">
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: getBackgroundColor() }}
              >
                <span className="text-white text-xl">{service.icone || '🔗'}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">{service.titre}</h3>
                  {!service.estActif && (
                    <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs font-medium rounded-full">
                      Inactif
                    </span>
                  )}
                </div>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">{service.description}</p>
                <div className="flex items-center space-x-4 mt-3 text-xs text-gray-400">
                  <span>{new Date(service.dateCreation).toLocaleDateString('fr-FR')}</span>
                  <span className="text-gray-300">|</span>
                  <a 
                    href={service.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 truncate max-w-[200px] inline-flex items-center"
                  >
                    {service.url.replace(/^https?:\/\//, '')}
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>
              </div>
            </div>
            
            {isOwner && (
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>
                
                {isMenuOpen && (
                  <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <button
                      onClick={openService}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Ouvrir</span>
                    </button>
                    <button
                      onClick={toggleStatus}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                    >
                      {service.estActif ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      <span>{service.estActif ? 'Désactiver' : 'Activer'}</span>
                    </button>
                    <button
                      onClick={handleDelete}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Supprimer</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Mode grille (par défaut)
  return (
    <div
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden card-hover animate-slide-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image ou couleur de fond */}
      {service.imageUrl && service.imageUrl !== '/default-service.png' ? (
        <div className="h-40 overflow-hidden">
          <img 
            src={service.imageUrl} 
            alt={service.titre}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div 
          className="h-40 flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${getBackgroundColor()} 0%, ${getBackgroundColor()}dd 100%)` }}
        >
          <span className="text-white text-4xl">{service.icone || '🔗'}</span>
        </div>
      )}

      {/* Contenu */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold text-gray-900 truncate">{service.titre}</h3>
              {!service.estActif && (
                <span className="px-2 py-0.5 bg-gray-200 text-gray-600 text-xs font-medium rounded-full">
                  Inactif
                </span>
              )}
            </div>
            <p className="text-gray-500 text-sm mt-1 line-clamp-2">{service.description}</p>
          </div>
          
          {isOwner && (
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-lg transition-colors ${isHovered ? 'bg-gray-100' : 'bg-transparent'}`}
              >
                <MoreVertical className="w-5 h-5 text-gray-400" />
              </button>
              
              {isMenuOpen && (
                <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <button
                    onClick={openService}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Ouvrir</span>
                  </button>
                  <button
                    onClick={toggleStatus}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                  >
                    {service.estActif ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    <span>{service.estActif ? 'Désactiver' : 'Activer'}</span>
                  </button>
                  <button
                    onClick={handleDelete}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Supprimer</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Lien vers le service */}
        <a
          href={service.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 text-sm text-primary-600 hover:text-primary-700 font-medium group"
          onClick={(e) => {
            if (!service.estActif) {
              e.preventDefault();
              toast.error('Ce service est désactivé');
            }
          }}
        >
          <span className="truncate">{service.url.replace(/^https?:\/\//, '')}</span>
          <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );
}

export default ServiceCard;
