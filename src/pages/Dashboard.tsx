import React from 'react';
import DashboardStats from '../components/DashboardStats';
import ClientStatusCards from '../components/ClientStatusCards';
import UserLeaderboard from '../components/dashboard/UserLeaderboard';
import ActivityStats from '../components/dashboard/ActivityStats';
import UserActivityStats from '../components/dashboard/UserActivityStats';
import { useLanguage } from '../contexts/LanguageContext';

const Dashboard = () => {
  const { language } = useLanguage();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">
          {language === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
        </h1>
      </div>

      <DashboardStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <UserLeaderboard />
          <div className="mt-8">
            <ActivityStats />
          </div>
        </div>
        <div>
          <UserActivityStats />
        </div>
      </div>

      <ClientStatusCards />
    </div>
  );
};

export default Dashboard;