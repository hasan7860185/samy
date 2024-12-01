import React, { useState } from 'react';
import { Book, MessageCircle, Phone, Mail, Edit, Check, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSupport } from '../contexts/SupportContext';
import { useUser } from '../contexts/UserContext';

const Help = () => {
  const { language } = useLanguage();
  const { settings, updateSettings, isEditing, setIsEditing } = useSupport();
  const { user } = useUser();
  const [editedSettings, setEditedSettings] = useState(settings);

  const handleEdit = () => {
    setEditedSettings(settings);
    setIsEditing(true);
  };

  const handleSave = () => {
    updateSettings(editedSettings);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedSettings(settings);
    setIsEditing(false);
  };

  const handleChange = (field: string, value: string) => {
    setEditedSettings(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleWorkingHoursChange = (lang: 'ar' | 'en', value: string) => {
    setEditedSettings(prev => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [lang]: value,
      },
    }));
  };

  const handleResponseTimeChange = (lang: 'ar' | 'en', value: string) => {
    setEditedSettings(prev => ({
      ...prev,
      responseTime: {
        ...prev.responseTime,
        [lang]: value,
      },
    }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            {language === 'ar' ? 'المساعدة والدعم' : 'Help & Support'}
          </h1>
          {user?.role === 'admin' && (
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
                  >
                    <Check className="w-4 h-4" />
                    {language === 'ar' ? 'حفظ' : 'Save'}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    <X className="w-4 h-4" />
                    {language === 'ar' ? 'إلغاء' : 'Cancel'}
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  <Edit className="w-4 h-4" />
                  {language === 'ar' ? 'تعديل' : 'Edit'}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Quick Help Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 bg-blue-50 rounded-lg">
            <Book className="w-8 h-8 text-blue-600 mb-4" />
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              {language === 'ar' ? 'دليل المستخدم' : 'User Guide'}
            </h2>
            <p className="text-gray-600 mb-4">
              {language === 'ar'
                ? 'اطلع على دليل المستخدم الشامل للتعرف على جميع مميزات النظام'
                : 'Check out our comprehensive user guide to learn about all system features'}
            </p>
            <button className="text-blue-600 font-medium hover:text-blue-700">
              {language === 'ar' ? 'قراءة الدليل' : 'Read Guide'}
            </button>
          </div>
          <div className="p-6 bg-green-50 rounded-lg">
            <MessageCircle className="w-8 h-8 text-green-600 mb-4" />
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              {language === 'ar' ? 'الأسئلة الشائعة' : 'FAQ'}
            </h2>
            <p className="text-gray-600 mb-4">
              {language === 'ar'
                ? 'اعثر على إجابات للأسئلة المتكررة حول استخدام النظام'
                : 'Find answers to frequently asked questions about using the system'}
            </p>
            <button className="text-green-600 font-medium hover:text-green-700">
              {language === 'ar' ? 'عرض الأسئلة الشائعة' : 'View FAQ'}
            </button>
          </div>
        </div>

        {/* Contact Support */}
        <div className="border-t pt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            {language === 'ar' ? 'تواصل مع الدعم الفني' : 'Contact Support'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4 space-x-reverse">
              <div className="p-3 bg-gray-100 rounded-lg">
                <Phone className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">
                  {language === 'ar' ? 'اتصل بنا' : 'Call Us'}
                </h3>
                {isEditing ? (
                  <div className="mt-2">
                    <input
                      type="tel"
                      value={editedSettings.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      dir="ltr"
                    />
                    <div className="mt-2 space-y-2">
                      <input
                        type="text"
                        value={editedSettings.workingHours.ar}
                        onChange={(e) => handleWorkingHoursChange('ar', e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="ساعات العمل (عربي)"
                        dir="rtl"
                      />
                      <input
                        type="text"
                        value={editedSettings.workingHours.en}
                        onChange={(e) => handleWorkingHoursChange('en', e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Working Hours (English)"
                        dir="ltr"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-gray-500 text-sm mt-1">
                      {language === 'ar'
                        ? editedSettings.workingHours.ar
                        : editedSettings.workingHours.en}
                    </p>
                    <p className="text-blue-600 font-medium mt-2" dir="ltr">
                      {editedSettings.phone}
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-start space-x-4 space-x-reverse">
              <div className="p-3 bg-gray-100 rounded-lg">
                <Mail className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">
                  {language === 'ar' ? 'راسلنا عبر البريد' : 'Email Us'}
                </h3>
                {isEditing ? (
                  <div className="mt-2">
                    <input
                      type="email"
                      value={editedSettings.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      dir="ltr"
                    />
                    <div className="mt-2 space-y-2">
                      <input
                        type="text"
                        value={editedSettings.responseTime.ar}
                        onChange={(e) => handleResponseTimeChange('ar', e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="وقت الرد (عربي)"
                        dir="rtl"
                      />
                      <input
                        type="text"
                        value={editedSettings.responseTime.en}
                        onChange={(e) => handleResponseTimeChange('en', e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Response Time (English)"
                        dir="ltr"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-gray-500 text-sm mt-1">
                      {language === 'ar'
                        ? editedSettings.responseTime.ar
                        : editedSettings.responseTime.en}
                    </p>
                    <p className="text-blue-600 font-medium mt-2" dir="ltr">
                      {editedSettings.email}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;