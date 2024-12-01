import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import Sidebar from '../Sidebar';
import Header from '../header/Header';
import AppRoutes from '../../routes';

const Layout = () => {
  const { isAuthenticated } = useAuth();
  const { dir } = useLanguage();
  const location = useLocation();
  
  // Don't show sidebar/header on login page
  if (location.pathname === '/login') {
    return <AppRoutes />;
  }

  if (!isAuthenticated) {
    return <AppRoutes />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <Sidebar />
      <div className={`flex-1 ${dir === 'rtl' ? 'mr-64' : 'ml-64'}`}>
        <Header />
        <main className="p-8 mt-16">
          <AppRoutes />
        </main>
      </div>
    </div>
  );
};

export default Layout;