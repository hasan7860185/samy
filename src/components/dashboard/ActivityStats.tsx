import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useClients } from '../../contexts/ClientContext';
import { useProperties } from '../../contexts/PropertyContext';
import { useTasks } from '../../contexts/TaskContext';
import { useUser } from '../../contexts/UserContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const ActivityStats = () => {
  const { language } = useLanguage();
  const { clients } = useClients();
  const { properties } = useProperties();
  const { tasks } = useTasks();
  const { users } = useUser();

  // Calculate daily activity stats
  const dailyStats = {
    newClients: clients.filter(c => {
      const date = new Date(c.createdAt);
      const today = new Date();
      return date.toDateString() === today.toDateString();
    }).length,
    completedTasks: tasks.filter(t => {
      const date = new Date(t.updatedAt);
      const today = new Date();
      return date.toDateString() === today.toDateString() && t.status === 'completed';
    }).length,
    newProperties: properties.filter(p => {
      const date = new Date(p.createdAt);
      const today = new Date();
      return date.toDateString() === today.toDateString();
    }).length,
  };

  // Calculate client status distribution
  const clientStatusData = [
    { name: language === 'ar' ? 'عملاء جدد' : 'New', value: clients.filter(c => c.status === 'new').length },
    { name: language === 'ar' ? 'مهتمون' : 'Interested', value: clients.filter(c => c.status === 'interested').length },
    { name: language === 'ar' ? 'تم الرد' : 'Responded', value: clients.filter(c => c.status === 'responded').length },
    { name: language === 'ar' ? 'موعد محدد' : 'Appointment', value: clients.filter(c => c.status === 'appointment_set').length },
  ];

  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Daily Activity Summary */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          {language === 'ar' ? 'نشاط اليوم' : 'Today\'s Activity'}
        </h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{dailyStats.newClients}</p>
            <p className="text-sm text-gray-600">
              {language === 'ar' ? 'عملاء جدد' : 'New Clients'}
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{dailyStats.completedTasks}</p>
            <p className="text-sm text-gray-600">
              {language === 'ar' ? 'مهام مكتملة' : 'Completed Tasks'}
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">{dailyStats.newProperties}</p>
            <p className="text-sm text-gray-600">
              {language === 'ar' ? 'عقارات جديدة' : 'New Properties'}
            </p>
          </div>
        </div>
      </div>

      {/* Client Status Distribution */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          {language === 'ar' ? 'توزيع حالات العملاء' : 'Client Status Distribution'}
        </h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={clientStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {clientStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Comments/Notes */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          {language === 'ar' ? 'آخر التعليقات' : 'Recent Comments'}
        </h2>
        <div className="space-y-4">
          {clients.slice(0, 5).map((client) => (
            <div key={client.id} className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-600 font-semibold">{client.name[0]}</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{client.name}</p>
                <p className="text-sm text-gray-500">{client.notes}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          {language === 'ar' ? 'النشاطات الأخيرة' : 'Recent Activities'}
        </h2>
        <div className="space-y-4">
          {tasks.slice(0, 5).map((task) => (
            <div key={task.id} className="flex items-center gap-4">
              <div className={`w-3 h-3 rounded-full ${
                task.status === 'completed' 
                  ? 'bg-green-500' 
                  : task.status === 'in_progress' 
                  ? 'bg-yellow-500' 
                  : 'bg-red-500'
              }`} />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {language === 'ar' ? task.title : task.titleEn}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(task.updatedAt).toLocaleDateString(
                    language === 'ar' ? 'ar-SA' : 'en-US',
                    { 
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    }
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityStats;