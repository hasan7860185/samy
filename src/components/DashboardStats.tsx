import React from 'react';
import { Users, Building2, CheckSquare } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { useClients } from '../contexts/ClientContext';
import { useProperties } from '../contexts/PropertyContext';
import { useTasks } from '../contexts/TaskContext';

const StatsCard = ({ icon: Icon, label, value, color, path }: {
  icon: React.ElementType;
  label: string;
  value: number;
  color: string;
  path: string;
}) => (
  <Link to={path} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all">
    <div className="flex items-center space-x-4 space-x-reverse">
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <h3 className="text-2xl font-semibold text-gray-800">{value}</h3>
        <p className="text-gray-600">{label}</p>
      </div>
    </div>
  </Link>
);

const DashboardStats = () => {
  const { t } = useLanguage();
  const { clients } = useClients();
  const { properties } = useProperties();
  const { tasks } = useTasks();

  // Get active properties count
  const activeProperties = properties.filter(p => p.status === 'available').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatsCard
        icon={Users}
        label={t('totalClients')}
        value={clients.length}
        color="bg-blue-500"
        path="/clients"
      />
      <StatsCard
        icon={Building2}
        label={t('activeProperties')}
        value={activeProperties}
        color="bg-green-500"
        path="/properties"
      />
      <StatsCard
        icon={CheckSquare}
        label={t('tasks')}
        value={tasks.length}
        color="bg-purple-500"
        path="/tasks"
      />
    </div>
  );
};

export default DashboardStats;