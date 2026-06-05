import React from 'react';

function EmptyState({ 
  title = 'Aucune donnée disponible', 
  description = 'Il n\'y a rien à afficher pour le moment.',
  icon = null,
  action = null
}) {
  return (
    <div className="text-center py-12 px-4">
      <div className="max-w-md mx-auto">
        {/* Icône */}
        <div className="flex justify-center mb-4">
          {icon && (
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              {icon}
            </div>
          )}
        </div>

        {/* Titre */}
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        
        {/* Description */}
        <p className="text-gray-500 mb-6">{description}</p>
        
        {/* Action */}
        {action && <div className="flex justify-center">{action}</div>}
      </div>
    </div>
  );
}

export default EmptyState;
