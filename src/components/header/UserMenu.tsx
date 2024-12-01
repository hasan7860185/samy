import React, { useState } from 'react';
import { LogOut, Settings, User, HelpCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';

const UserMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const { language } = useLanguage();
  const { logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 space-x-reverse"
      >
        <div className="w-10 h-10 rounded-full overflow-hidden">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.fullName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white font-semibold">
              {user.fullName[0]}
            </div>
          )}
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">{user.fullName}</p>
          <p className="text-xs text-gray-500">{user.email}</p>
        </div>
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="py-1">
            <Link
              to="/profile"
              className="w-full px-4 py-2 text-right text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2 space-x-reverse"
              onClick={() => setIsOpen(false)}
            >
              <User className="w-4 h-4" />
              <span>{language === 'ar' ? 'الملف الشخصي' : 'Profile'}</span>
            </Link>
            <Link
              to="/settings"
              className="w-full px-4 py-2 text-right text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2 space-x-reverse"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="w-4 h-4" />
              <span>{language === 'ar' ? 'الإعدادات' : 'Settings'}</span>
            </Link>
            <Link
              to="/help"
              className="w-full px-4 py-2 text-right text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2 space-x-reverse"
              onClick={() => setIsOpen(false)}
            >
              <HelpCircle className="w-4 h-4" />
              <span>{language === 'ar' ? 'المساعدة' : 'Help'}</span>
            </Link>
            <hr className="my-1" />
            <button 
              onClick={handleLogout}
              className="w-full px-4 py-2 text-right text-sm text-red-600 hover:bg-gray-100 flex items-center space-x-2 space-x-reverse"
            >
              <LogOut className="w-4 h-4" />
              <span>{language === 'ar' ? 'تسجيل الخروج' : 'Logout'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;