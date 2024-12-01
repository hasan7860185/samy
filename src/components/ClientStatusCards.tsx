import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useClients } from '../contexts/ClientContext';
import { 
  UserPlus, 
  UserCheck, 
  Users, 
  MessageSquareMore,
  XCircle,
  Calendar,
  UserCog,
  BookCheck,
  XSquare,
  CheckSquare,
  Clock,
  RefreshCw,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const statusCards = [
  { 
    icon: UserPlus,
    statusKey: 'new',
    path: '/clients/status/new',
    color: 'bg-blue-500',
  },
  {
    icon: Users,
    statusKey: 'potential',
    path: '/clients/status/potential',
    color: 'bg-purple-500',
  },
  {
    icon: UserCheck,
    statusKey: 'interested',
    path: '/clients/status/interested',
    color: 'bg-green-500',
  },
  {
    icon: MessageSquareMore,
    statusKey: 'responded',
    path: '/clients/status/responded',
    color: 'bg-teal-500',
  },
  {
    icon: XCircle,
    statusKey: 'not_responded',
    path: '/clients/status/not-responded',
    color: 'bg-red-500',
  },
  {
    icon: Calendar,
    statusKey: 'appointment_set',
    path: '/clients/status/appointment-set',
    color: 'bg-yellow-500',
  },
  {
    icon: UserCog,
    statusKey: 'post_meeting',
    path: '/clients/status/post-meeting',
    color: 'bg-indigo-500',
  },
  {
    icon: BookCheck,
    statusKey: 'reserved',
    path: '/clients/status/reserved',
    color: 'bg-orange-500',
  },
  {
    icon: XSquare,
    statusKey: 'cancelled',
    path: '/clients/status/cancelled',
    color: 'bg-gray-500',
  },
  {
    icon: CheckSquare,
    statusKey: 'sold',
    path: '/clients/status/sold',
    color: 'bg-emerald-500',
  },
  {
    icon: Clock,
    statusKey: 'postponed',
    path: '/clients/status/postponed',
    color: 'bg-pink-500',
  },
  {
    icon: RefreshCw,
    statusKey: 'resale',
    path: '/clients/status/resale',
    color: 'bg-cyan-500',
  }
];

const StatusCard = ({ icon: Icon, label, path, color, count }: {
  icon: React.ElementType;
  label: string;
  path: string;
  color: string;
  count: number;
}) => {
  const { dir } = useLanguage();
  
  return (
    <Link 
      to={path}
      className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className={`flex items-center ${dir === 'rtl' ? 'space-x-reverse' : ''} space-x-4`}>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-gray-800">{count}</h3>
          <p className="text-gray-600">{label}</p>
        </div>
      </div>
    </Link>
  );
};

const ClientStatusCards = () => {
  const [showAll, setShowAll] = useState(false);
  const { t, dir } = useLanguage();
  const { getClientsByStatus } = useClients();
  
  const displayedCards = showAll ? statusCards : statusCards.slice(0, 4);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">{t('clientStatuses')}</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedCards.map((card) => (
          <StatusCard
            key={card.statusKey}
            icon={card.icon}
            label={t(card.statusKey)}
            path={card.path}
            color={card.color}
            count={getClientsByStatus(card.statusKey).length}
          />
        ))}
      </div>

      {statusCards.length > 4 && (
        <div className="flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 ${
              dir === 'rtl' ? 'space-x-reverse' : ''
            }`}
          >
            {showAll ? (
              <>
                <ChevronUp className="w-4 h-4" />
                {t('showLess')}
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                {t('showMore')}
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default ClientStatusCards;