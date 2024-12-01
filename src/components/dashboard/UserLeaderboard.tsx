import React, { useState, useEffect } from 'react';
import { Crown, Star } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { PerformanceService } from '../../services/performance/performance.service';
import { UserPerformance } from '../../services/performance/types';

type TimeRange = 'daily' | 'weekly' | 'monthly';

const UserLeaderboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('daily');
  const [performers, setPerformers] = useState<UserPerformance[]>([]);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();

  useEffect(() => {
    const loadPerformers = async () => {
      try {
        setLoading(true);
        const data = await PerformanceService.getTopPerformers(timeRange);
        setPerformers(data);
      } catch (error) {
        console.error('Error loading performers:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPerformers();
  }, [timeRange]);

  const getTimeRangeLabel = (range: TimeRange) => {
    const labels = {
      daily: { ar: 'اليوم', en: 'Today' },
      weekly: { ar: 'أسبوعي', en: 'Weekly' },
      monthly: { ar: 'شهري', en: 'Monthly' },
    };
    return language === 'ar' ? labels[range].ar : labels[range].en;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <Crown className="w-6 h-6 text-yellow-500" />
          {language === 'ar' ? 'الأفضل أداءً' : 'Top Performers'}
        </h2>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value as TimeRange)}
          className="text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="daily">{getTimeRangeLabel('daily')}</option>
          <option value="weekly">{getTimeRangeLabel('weekly')}</option>
          <option value="monthly">{getTimeRangeLabel('monthly')}</option>
        </select>
      </div>

      <div className="space-y-4">
        {performers.map((performer, index) => (
          <div
            key={performer.userId}
            className={`flex items-center justify-between p-4 rounded-lg ${
              index === 0 ? 'bg-blue-50' : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="text-lg font-semibold text-gray-600 w-6">
                {index + 1}
              </span>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {performer.userId}
                </h3>
                <div className="text-sm text-gray-500 mt-1">
                  <span className="font-medium text-blue-600">
                    {performer.metrics.total_actions}
                  </span>{' '}
                  {language === 'ar' ? 'إجراء' : 'actions'}
                </div>
              </div>
            </div>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < performer.rating
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
        ))}

        {performers.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            {language === 'ar' 
              ? 'لا توجد بيانات أداء متاحة'
              : 'No performance data available'}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserLeaderboard;