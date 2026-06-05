import React from 'react';

function LoadingSpinner({ size = 'md', text = 'Chargement...' }) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-3',
    lg: 'w-8 h-8 border-4',
    xl: 'w-12 h-12 border-6',
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div 
        className={`animate-spin rounded-full border-primary-600 border-t-transparent ${sizeClasses[size]}`}
        role="status"
        aria-label="Chargement"
      />
      {text && <p className="text-sm text-gray-600">{text}</p>}
    </div>
  );
}

export default LoadingSpinner;
