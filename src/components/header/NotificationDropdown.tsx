import React, { useState } from 'react';
import { Bell, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface Notification {
  id: string;
  title: string;
  titleEn: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'تم تحديد موعد مع العميل أحمد محمد',
    titleEn: 'Appointment set with client Ahmed Mohammed',
    time: 'منذ 5 دقائق',
    read: false,
  },
  {
    id: '2',
    title: 'تم إضافة عقار جديد في الرياض',
    titleEn: 'New property added in Riyadh',
    time: 'منذ 30 دقيقة',
    read: false,
  },
  {
    id: '3',
    title: 'موعد متابعة مع العميل سارة أحمد',
    titleEn: 'Follow-up appointment with client Sarah Ahmed',
    time: 'منذ ساعة',
    read: true,
  },
];

const NotificationDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const { language } = useLanguage();
  
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-900">
                {language === 'ar' ? 'الإشعارات' : 'Notifications'}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                  !notification.read ? 'bg-blue-50' : ''
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex justify-between items-start">
                  <p className="text-sm text-gray-900">
                    {language === 'ar' ? notification.title : notification.titleEn}
                  </p>
                  {!notification.read && (
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
              </div>
            ))}
          </div>
          <div className="p-4 text-center border-t border-gray-200">
            <button className="text-sm text-blue-600 hover:text-blue-800">
              {language === 'ar' ? 'عرض كل الإشعارات' : 'View All Notifications'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;