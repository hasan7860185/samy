import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { PerformanceService } from '../../services/performance/performance.service';
import { UserPerformance } from '../../services/performance/types';

const UserActivityStats: React.FC = () => {
  const [performances, setPerformances] = useState<UserPerformance[]>([]);
  const { language } = useLanguage();

  useEffect(() => {
    const loadPerformances = async () => {
      const data = await PerformanceService.getTopPerformers('weekly');
      setPerformances(data);
    };

    loadPerformances();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        {language === 'ar' ? 'إحصائيات النشاط' : 'Activity Statistics'}
      </h2>
      <div className="space-y-4">
        {performances.map((performance, index) => (
          <div key={performance.userId} className="flex justify-between">
            <span className="font-medium text-gray-900">{performance.userId}</span>
            <span className="text-gray-600">
              {language === 'ar' ? `إجمالي الأنشطة: ${performance.metrics.total_actions}` : `Total Actions: ${performance.metrics.total_actions}`}
            </span>
          </div>
        ))}
        {performances.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            {language === 'ar' ? 'لا توجد بيانات متاحة' : 'No data available'}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserActivityStats;
