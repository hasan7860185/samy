import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Home,
  Users,
  Building2,
  CheckSquare,
  Bell,
  BarChart2,
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
  ChevronUp,
  UserCog,
  Building,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = () => {
  const [showClientStatuses, setShowClientStatuses] = useState(false);
  const { dir, language } = useLanguage();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Client status menu items
  const clientStatusItems = [
    { label: language === 'ar' ? 'العملاء الجدد' : 'New Clients', path: '/clients/status/new' },
    { label: language === 'ar' ? 'العملاء المحتملون' : 'Potential Clients', path: '/clients/status/potential' },
    { label: language === 'ar' ? 'العملاء المهتمون' : 'Interested Clients', path: '/clients/status/interested' },
    { label: language === 'ar' ? 'تم الرد' : 'Responded', path: '/clients/status/responded' },
    { label: language === 'ar' ? 'لم يتم الرد' : 'Not Responded', path: '/clients/status/not-responded' },
    { label: language === 'ar' ? 'مواعيد محددة' : 'Appointments Set', path: '/clients/status/appointment-set' },
    { label: language === 'ar' ? 'ما بعد الاجتماع' : 'Post Meeting', path: '/clients/status/post-meeting' },
    { label: language === 'ar' ? 'حجوزات' : 'Reserved', path: '/clients/status/reserved' },
    { label: language === 'ar' ? 'ملغية' : 'Cancelled', path: '/clients/status/cancelled' },
    { label: language === 'ar' ? 'مبيعات تامة' : 'Sold', path: '/clients/status/sold' },
    { label: language === 'ar' ? 'مؤجلة' : 'Postponed', path: '/clients/status/postponed' },
    { label: language === 'ar' ? 'إعادة بيع' : 'Resale', path: '/clients/status/resale' },
  ];

  // Main navigation items
  const mainNavItems = [
    { icon: Home, label: language === 'ar' ? 'لوحة التحكم' : 'Dashboard', path: '/' },
    { icon: Building2, label: language === 'ar' ? 'العقارات' : 'Properties', path: '/properties' },
    { icon: Building, label: language === 'ar' ? 'الشركات المطورة' : 'Development Companies', path: '/developers' },
    { icon: CheckSquare, label: language === 'ar' ? 'المهام' : 'Tasks', path: '/tasks' },
    { icon: Bell, label: language === 'ar' ? 'الإشعارات' : 'Notifications', path: '/notifications' },
    { icon: BarChart2, label: language === 'ar' ? 'التقارير' : 'Reports', path: '/reports' },
    { icon: UserCog, label: language === 'ar' ? 'المستخدمون' : 'Users', path: '/users' },
    { icon: Settings, label: language === 'ar' ? 'الإعدادات' : 'Settings', path: '/settings' },
    { icon: HelpCircle, label: language === 'ar' ? 'المساعدة' : 'Help', path: '/help' },
  ];

  return (
    <aside className={`bg-white h-screen w-64 fixed ${dir === 'rtl' ? 'right-0' : 'left-0'} border-l shadow-sm p-4 overflow-y-auto`}>
      <div className="flex flex-col h-full">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            {language === 'ar' ? 'نظام إدارة العقارات' : 'Real Estate Management'}
          </h1>
        </div>
        
        <nav className="flex-1">
          <ul className="space-y-2">
            {/* Clients Section */}
            <li>
              <button
                onClick={() => setShowClientStatuses(!showClientStatuses)}
                className={`w-full flex items-center justify-between p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors`}
              >
                <div className={`flex items-center space-x-3 ${dir === 'rtl' ? 'space-x-reverse' : ''}`}>
                  <Users className="w-5 h-5" />
                  <span>{language === 'ar' ? 'العملاء' : 'Clients'}</span>
                </div>
                {showClientStatuses ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              {showClientStatuses && (
                <ul className={`mt-2 ${dir === 'rtl' ? 'mr-4' : 'ml-4'} space-y-1`}>
                  <li>
                    <NavLink
                      to="/clients"
                      className={({ isActive }) =>
                        `block p-2 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`
                      }
                    >
                      {language === 'ar' ? 'كل العملاء' : 'All Clients'}
                    </NavLink>
                  </li>
                  {clientStatusItems.map((item, index) => (
                    <li key={index}>
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          `block p-2 rounded-lg transition-colors ${
                            isActive
                              ? 'bg-blue-50 text-blue-600'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`
                        }
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* Other Navigation Items */}
            {mainNavItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 ${dir === 'rtl' ? 'space-x-reverse' : ''} p-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`
                  }
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          onClick={handleLogout}
          className={`flex items-center space-x-3 ${dir === 'rtl' ? 'space-x-reverse' : ''} p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-auto`}
        >
          <LogOut className="w-5 h-5" />
          <span>{language === 'ar' ? 'تسجيل الخروج' : 'Logout'}</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;