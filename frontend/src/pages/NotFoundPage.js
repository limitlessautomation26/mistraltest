import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
          {/* Code d'erreur */}
          <div className="mb-6">
            <h1 className="text-6xl font-bold text-primary-600">404</h1>
            <p className="text-xl font-semibold text-gray-900 mt-2">Page non trouvée</p>
          </div>

          {/* Message */}
          <div className="mb-8">
            <p className="text-gray-500">
              Désolé, la page que vous cherchez n'existe pas ou a été supprimée.
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <Link
              to="/"
              className="inline-flex items-center space-x-2 w-full justify-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Home className="w-5 h-5" />
              <span>Retour à l'accueil</span>
            </Link>
            
            <Link
              to="/connexion"
              className="inline-flex items-center space-x-2 w-full justify-center px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Se connecter</span>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Client Dashboard. Tous droits réservés.
          </p>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
