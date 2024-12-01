import React, { useState } from 'react';
import { Moon, Sun, Globe, Bell, Shield, Key, Palette } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useUser } from '../contexts/UserContext';
import { useLanguage } from '../contexts/LanguageContext';
import { db } from '../services/db/instance';
import bcrypt from 'bcryptjs';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { user, updateUser } = useUser();
  const [notifications, setNotifications] = useState({
    email: true,
    browser: true,
    mobile: true,
  });

  // Credentials state
  const [showCredentialsForm, setShowCredentialsForm] = useState(false);
  const [credentials, setCredentials] = useState({
    username: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleNotificationChange = (type: keyof typeof notifications) => {
    setNotifications(prev => {
      const updated = { ...prev, [type]: !prev[type] };
      updateUser({ notifications: updated });
      return updated;
    });
  };

  const handleCredentialsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
    setError('');
    setSuccess('');
  };

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Validate inputs
      if (!credentials.username || !credentials.currentPassword || !credentials.newPassword || !credentials.confirmPassword) {
        setError('جميع الحقول مطلوبة');
        return;
      }

      if (credentials.newPassword !== credentials.confirmPassword) {
        setError('كلمة المرور الجديدة غير متطابقة');
        return;
      }

      if (credentials.newPassword.length < 6) {
        setError('كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل');
        return;
      }

      // Validate current user
      const currentUser = await db.users.get('1');
      if (!currentUser) {
        setError('حدث خطأ أثناء التحقق من المستخدم');
        return;
      }

      // Verify current password
      const isValid = await bcrypt.compare(credentials.currentPassword, currentUser.password);
      if (!isValid) {
        setError('كلمة المرور الحالية غير صحيحة');
        return;
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(credentials.newPassword, 10);

      // Update user credentials
      await db.users.update('1', {
        username: credentials.username,
        password: hashedPassword,
      });

      setSuccess('تم تحديث بيانات الدخول بنجاح');
      setCredentials({
        username: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setShowCredentialsForm(false);

    } catch (error) {
      console.error('Error updating credentials:', error);
      setError('حدث خطأ أثناء تحديث بيانات الدخول');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
          {language === 'ar' ? 'الإعدادات' : 'Settings'}
        </h1>

        {/* Theme Settings */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 space-x-reverse mb-4">
            <Palette className="w-5 h-5 text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {language === 'ar' ? 'المظهر' : 'Appearance'}
            </h2>
          </div>
          <div className="flex space-x-4 space-x-reverse">
            <button
              onClick={() => theme === 'dark' && toggleTheme()}
              className={`flex items-center space-x-2 space-x-reverse p-3 rounded-lg border ${
                theme === 'light'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                  : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
              }`}
            >
              <Sun className="w-5 h-5" />
              <span>{language === 'ar' ? 'فاتح' : 'Light'}</span>
            </button>
            <button
              onClick={() => theme === 'light' && toggleTheme()}
              className={`flex items-center space-x-2 space-x-reverse p-3 rounded-lg border ${
                theme === 'dark'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                  : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
              }`}
            >
              <Moon className="w-5 h-5" />
              <span>{language === 'ar' ? 'داكن' : 'Dark'}</span>
            </button>
          </div>
        </div>

        {/* Language Settings */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 space-x-reverse mb-4">
            <Globe className="w-5 h-5 text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {language === 'ar' ? 'اللغة' : 'Language'}
            </h2>
          </div>
          <div className="flex space-x-4 space-x-reverse">
            <button
              onClick={() => setLanguage('ar')}
              className={`flex items-center space-x-2 space-x-reverse p-3 rounded-lg border ${
                language === 'ar'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                  : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
              }`}
            >
              <Globe className="w-5 h-5" />
              <span>العربية</span>
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`flex items-center space-x-2 space-x-reverse p-3 rounded-lg border ${
                language === 'en'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                  : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
              }`}
            >
              <Globe className="w-5 h-5" />
              <span>English</span>
            </button>
          </div>
        </div>

        {/* Security Settings */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 space-x-reverse mb-4">
            <Shield className="w-5 h-5 text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {language === 'ar' ? 'الأمان' : 'Security'}
            </h2>
          </div>

          {showCredentialsForm ? (
            <form onSubmit={handleCredentialsSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                  {error}
                </div>
              )}
              {success && (
                <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm">
                  {success}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'ar' ? 'اسم المستخدم الجديد' : 'New Username'}
                </label>
                <input
                  type="text"
                  name="username"
                  value={credentials.username}
                  onChange={handleCredentialsChange}
                  className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'ar' ? 'كلمة المرور الحالية' : 'Current Password'}
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={credentials.currentPassword}
                  onChange={handleCredentialsChange}
                  className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'ar' ? 'كلمة المرور الجديدة' : 'New Password'}
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={credentials.newPassword}
                  onChange={handleCredentialsChange}
                  className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'ar' ? 'تأكيد كلمة المرور الجديدة' : 'Confirm New Password'}
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={credentials.confirmPassword}
                  onChange={handleCredentialsChange}
                  className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCredentialsForm(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  {language === 'ar' ? 'حفظ التغييرات' : 'Save Changes'}
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setShowCredentialsForm(true)}
              className="flex items-center justify-between w-full p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <div className="flex items-center space-x-3 space-x-reverse">
                <Key className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {language === 'ar' ? 'تغيير بيانات الدخول' : 'Change Login Credentials'}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {language === 'ar'
                      ? 'تحديث اسم المستخدم وكلمة المرور'
                      : 'Update your username and password'}
                  </p>
                </div>
              </div>
            </button>
          )}
        </div>

        {/* Notification Settings */}
        <div>
          <div className="flex items-center space-x-3 space-x-reverse mb-4">
            <Bell className="w-5 h-5 text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {language === 'ar' ? 'الإشعارات' : 'Notifications'}
            </h2>
          </div>
          <div className="space-y-4">
            <label className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3 space-x-reverse">
                <Bell className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {language === 'ar' ? 'إشعارات البريد الإلكتروني' : 'Email Notifications'}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {language === 'ar' 
                      ? 'استلام الإشعارات عبر البريد الإلكتروني'
                      : 'Receive notifications via email'}
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={notifications.email}
                onChange={() => handleNotificationChange('email')}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;