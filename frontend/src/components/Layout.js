import React, { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut, 
  Menu,
  X,
  Home,
  UserPlus,
  Grid3X3
} from 'lucide-react';

function Layout() {
  const { client, logout } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isAdmin = client?.role === 'admin';

  // Fermer la sidebar sur mobile
  const closeSidebar = () => setIsSidebarOpen(false);

  // Navigation principale
  const navItems = [
    {
      to: '/',
      label: 'Dashboard',
      icon: LayoutDashboard,
      show: true
    },
    {
      to: '/profil',
      label: 'Mon Profil',
      icon: Settings,
      show: true
    }
  ];

  // Navigation admin
  const adminNavItems = [
    {
      to: '/admin',
      label: 'Tableau de bord',
      icon: Home,
      show: isAdmin
    },
    {
      to: '/admin/clients',
      label: 'Clients',
      icon: Users,
      show: isAdmin
    },
    {
      to: '/admin/services',
      label: 'Services',
      icon: Grid3X3,
      show: isAdmin
    }
  ];

  // Tous les items de navigation
  const allNavItems = [...navItems, ...adminNavItems].filter(item => item.show);

  // Vérifier si la route est active
  const isActive = (path) => {
    return location.pathname === path || 
           (path === '/' && location.pathname.startsWith('/'));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex lg:w-64 lg:h-full lg:bg-white lg:border-r lg:border-gray-200 lg:flex-col lg:fixed lg:z-50">
        <div className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">CD</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Client Dashboard</h1>
              <p className="text-sm text-gray-500">Bienvenue, {client?.nom}</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          {allNavItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => 
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  isActive 
                    ? 'bg-primary-50 text-primary-700 font-medium' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
              onClick={closeSidebar}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={logout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Sidebar - Mobile */}
      <div className={`fixed inset-0 z-50 lg:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}>
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={closeSidebar}
        />
        <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CD</span>
              </div>
              <span className="font-semibold text-gray-900">Menu</span>
            </div>
            <button onClick={closeSidebar} className="p-2 rounded-lg hover:bg-gray-100">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          <nav className="flex-1 p-4 space-y-2">
            {allNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => 
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                    isActive 
                      ? 'bg-primary-50 text-primary-700 font-medium' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`
                }
                onClick={closeSidebar}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-200">
            <button
              onClick={() => {
                logout();
                closeSidebar();
              }}
              className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span>Déconnexion</span>
            </button>
          </div>
        </aside>
      </div>

      {/* Header - Mobile */}
      <header className="lg:hidden sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
            <div>
              <h1 className="font-semibold text-gray-900">Client Dashboard</h1>
              <p className="text-xs text-gray-500">{client?.nom}</p>
            </div>
          </div>
          
          {isAdmin && (
            <NavLink
              to="/admin"
              className="px-3 py-1.5 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
            >
              Admin
            </NavLink>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen">
        {/* Header - Desktop */}
        <header className="hidden lg:flex sticky top-0 z-30 bg-white border-b border-gray-200">
          <div className="flex-1 flex items-center justify-between px-6 py-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {location.pathname === '/' ? 'Dashboard' : 
                 location.pathname.split('/').pop().charAt(0).toUpperCase() + 
                 location.pathname.split('/').pop().slice(1)}
              </h2>
              <p className="text-sm text-gray-500">
                {isAdmin ? 'Mode Administrateur' : 'Mode Client'}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {isAdmin && (
                <NavLink
                  to="/admin"
                  className={({ isActive }) => 
                    `px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-primary-600 text-white' 
                        : 'text-primary-600 hover:bg-primary-50'
                    }`
                  }
                >
                  Espace Admin
                </NavLink>
              )}
              <button
                onClick={logout}
                className="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 lg:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;
