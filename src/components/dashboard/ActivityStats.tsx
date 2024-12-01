import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useUser } from '../../contexts/UserContext';

const ActivityStats = () => {
  const { language } = useLanguage();
  const { users } = useUser();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        {language === 'ar' ? 'نشاط المستخدم' : 'User Activity'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {users.map(user => (
          <div key={user.id} className="p-4 border rounded-lg shadow">
            <h3 className="text-lg font-semibold">{user.fullName}</h3>
            <p className="text-sm text-gray-600">{user.email}</p>
            <div className="mt-2">
              <p className="text-gray-800 font-medium">{language === 'ar' ? 'النشاط' : 'Activity'}</p>
              <div className="flex gap-1 flex-wrap">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                  {language === 'ar' ? 'اجتماعات' : 'Meetings'}: {user.performance?.actions}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center text-gray-500 py-8">
        {language === 'ar' ? 'قريباً' : 'Coming Soon'}
      </div>
    </div>
  );
};

export default ActivityStats;
