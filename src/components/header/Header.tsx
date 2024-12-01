import React from 'react';
import SearchBar from './SearchBar';
import NotificationDropdown from './NotificationDropdown';
import UserMenu from './UserMenu';
import { useLanguage } from '../../contexts/LanguageContext';

const Header: React.FC = () => {
  const { dir } = useLanguage();
  
  const handleSearch = (query: string) => {
    console.log('Search query:', query);
  };

  return (
    <header className={`bg-white border-b border-gray-200 fixed top-0 ${dir === 'rtl' ? 'right-64' : 'left-64'} right-0 left-0 h-16 z-50`}>
      <div className="h-full px-6 flex items-center justify-between">
        <SearchBar onSearch={handleSearch} />
        
        <div className={`flex items-center space-x-4 ${dir === 'rtl' ? 'space-x-reverse' : ''}`}>
          <NotificationDropdown />
          <div className="h-8 w-px bg-gray-200"></div>
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;