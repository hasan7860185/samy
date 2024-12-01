import React, { useState } from 'react';
import { Bell, CheckCircle, Clock, AlertTriangle, Calendar, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Notification {
  id: string;
  title: string;
  titleEn: string;
  message: string;
  messageEn: string;
  type: 'info' | 'success' | 'warning' | 'reminder';
  date: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'موعد مع عميل',
    titleEn: 'Client Appointment',
    message: 'لديك موعد مع العميل أحمد محمد غداً الساعة 10 صباحاً',
    messageEn: 'You have an appointment with Ahmed Mohammed tomorrow at 10 AM',
    type: 'reminder',
    date: '2024-03-22T10:00:00',
    read: false,
  },
  {
    id: '2',
    title: 'تم إضافة عقار جديد',
    titleEn: 'New Property Added',
    message: 'تم إضافة فيلا جديدة في حي النرجس بنجاح',
    messageEn: 'New villa in Al Narjis district has been added successfully',
    type: 'success',
    date: '2024-03-21T15:30:00',
    read: false,
  },
  {
    id: '3',
    title: 'تحديث حالة عميل',
    titleEn: 'Client Status Update',
    message: 'تم تحديث حالة العميل سارة أحمد إلى "مهتم"',
    messageEn: 'Client Sarah Ahmed status has been updated to "Interested"',
    type: 'info',
    date: '2024-03-21T13:45:00',
    read: true,
  },
  {
    id: '4',
    title: 'تنبيه متابعة',
    titleEn: 'Follow-up Alert',
    message: 'يجب متابعة العميل محمد علي - لم يتم الرد منذ 3 أيام',
    messageEn: 'Follow up needed with Mohammed Ali - No response for 3 days',
    type: 'warning',
    date: '2024-03-21T09:15:00',
    read: true,
  },
];

const NotificationItem: React.FC<{
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
  language: string;
}> = ({ notification, onMarkAsRead, onDelete, language }) => {
  const typeIcons = {
    info: <Bell className="w-6 h-6 text-blue-500" />,
    success: <CheckCircle className="w-6 h-6 text-green-500" />,
    warning: <AlertTriangle className="w-6 h-6 text-yellow-500" />,
    reminder: <Calendar className="w-6 h-6 text-purple-500" />,
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={`p-4 border-b ${notification.read ? 'bg-white' : 'bg-blue-50'}`}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">{typeIcons[notification.type]}</div>
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-gray-900">
            {language === 'ar' ? notification.title : notification.titleEn}
          </h3>
          <p className="text-gray-600 mt-1">
            {language === 'ar' ? notification.message : notification.messageEn}
          </p>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {formatDate(notification.date)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!notification.read && (
            <button
              onClick={() => onMarkAsRead(notification.id)}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              {language === 'ar' ? 'تحديد كمقروء' : 'Mark as Read'}
            </button>
          )}
          <button
            onClick={() => onDelete(notification.id)}
            className="text-gray-400 hover:text-red-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

const Notifications = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const { language } = useLanguage();

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => !n.read);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3 space-x-reverse">
          <Bell className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {language === 'ar' ? 'الإشعارات' : 'Notifications'}
            </h1>
            <p className="text-gray-500">
              {language === 'ar' 
                ? `لديك ${unreadCount} إشعارات غير مقروءة`
                : `You have ${unreadCount} unread notifications`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'all' | 'unread')}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="all">
              {language === 'ar' ? 'جميع الإشعارات' : 'All Notifications'}
            </option>
            <option value="unread">
              {language === 'ar' ? 'غير المقروءة' : 'Unread'}
            </option>
          </select>
          <button
            onClick={handleMarkAllAsRead}
            className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            {language === 'ar' ? 'تحديد الكل كمقروء' : 'Mark All as Read'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm divide-y">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkAsRead={handleMarkAsRead}
              onDelete={handleDelete}
              language={language}
            />
          ))
        ) : (
          <div className="p-8 text-center text-gray-500">
            {language === 'ar' 
              ? `لا توجد إشعارات ${filter === 'unread' ? 'غير مقروءة' : ''}`
              : `No ${filter === 'unread' ? 'unread ' : ''}notifications`}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;