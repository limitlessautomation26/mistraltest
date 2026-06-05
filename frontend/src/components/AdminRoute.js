import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

function AdminRoute({ children }) {
  const { isAuthenticated, isLoading, client } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated || client?.role !== 'admin') {
    // Rediriger vers le dashboard principal
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AdminRoute;
