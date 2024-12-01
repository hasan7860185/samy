import React from 'react';
import { ClientStatus } from '../types';

const statusConfig: Record<ClientStatus, { label: string; color: string }> = {
  new: { label: 'جديد', color: 'bg-blue-100 text-blue-800' },
  potential: { label: 'محتمل', color: 'bg-purple-100 text-purple-800' },
  interested: { label: 'مهتم', color: 'bg-green-100 text-green-800' },
  responded: { label: 'تم الرد', color: 'bg-teal-100 text-teal-800' },
  not_responded: { label: 'لم يتم الرد', color: 'bg-red-100 text-red-800' },
  appointment_set: { label: 'موعد محدد', color: 'bg-yellow-100 text-yellow-800' },
  post_meeting: { label: 'بعد الاجتماع', color: 'bg-indigo-100 text-indigo-800' },
  reserved: { label: 'محجوز', color: 'bg-orange-100 text-orange-800' },
  cancelled: { label: 'ملغي', color: 'bg-gray-100 text-gray-800' },
  sold: { label: 'تم البيع', color: 'bg-emerald-100 text-emerald-800' },
  postponed: { label: 'مؤجل', color: 'bg-pink-100 text-pink-800' },
  resale: { label: 'إعادة بيع', color: 'bg-cyan-100 text-cyan-800' },
};

interface ClientStatusBadgeProps {
  status: ClientStatus;
}

const ClientStatusBadge: React.FC<ClientStatusBadgeProps> = ({ status }) => {
  const config = statusConfig[status];
  
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
      {config.label}
    </span>
  );
};

export default ClientStatusBadge;