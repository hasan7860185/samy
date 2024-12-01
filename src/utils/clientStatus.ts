import { ClientStatus } from '../types';

export const statusTitles: Record<string, string> = {
  new: 'العملاء الجدد',
  potential: 'العملاء المحتملون',
  interested: 'العملاء المهتمون',
  responded: 'العملاء - تم الرد',
  'not-responded': 'العملاء - لم يتم الرد',
  'appointment-set': 'العملاء - مواعيد محددة',
  'post-meeting': 'العملاء - ما بعد الاجتماع',
  reserved: 'العملاء - حجوزات',
  cancelled: 'العملاء - ملغية',
  sold: 'العملاء - مبيعات تامة',
  postponed: 'العملاء - مؤجلة',
  resale: 'العملاء - إعادة بيع',
};

export const statusMap: Record<string, ClientStatus> = {
  new: 'new',
  potential: 'potential',
  interested: 'interested',
  responded: 'responded',
  'not-responded': 'not_responded',
  'appointment-set': 'appointment_set',
  'post-meeting': 'post_meeting',
  reserved: 'reserved',
  cancelled: 'cancelled',
  sold: 'sold',
  postponed: 'postponed',
  resale: 'resale',
};

// Mock data for development
export const mockClients = [
  {
    id: '1',
    name: 'أحمد محمد',
    phone: '0501234567',
    email: 'ahmed@example.com',
    status: 'new' as ClientStatus,
    notes: 'عميل مهتم بشقق سكنية',
  },
  {
    id: '2',
    name: 'سارة أحمد',
    phone: '0567891234',
    email: 'sara@example.com',
    status: 'interested' as ClientStatus,
    notes: 'تبحث عن فيلا',
  },
];