import { utils, writeFile } from 'xlsx';
import { Client } from '../types';

interface ExportOptions {
  limit?: number;
  filename?: string;
}

export function exportClientsToExcel(clients: Client[], options: ExportOptions = {}) {
  const { limit, filename = 'clients.xlsx' } = options;

  // Take only the specified number of clients if limit is provided
  const dataToExport = limit ? clients.slice(0, limit) : clients;

  // Transform data for export
  const data = dataToExport.map(client => ({
    'الاسم': client.name,
    'رقم الهاتف': client.phone,
    'البريد الإلكتروني': client.email || '',
    'معرف فيسبوك': client.facebookId || '',
    'الحالة': getStatusLabel(client.status),
    'ملاحظات': client.notes || ''
  }));

  // Create workbook and worksheet
  const wb = utils.book_new();
  const ws = utils.json_to_sheet(data, { 
    header: ['الاسم', 'رقم الهاتف', 'البريد الإلكتروني', 'معرف فيسبوك', 'الحالة', 'ملاحظات']
  });

  // Set RTL
  ws['!dir'] = 'rtl';

  // Auto-size columns
  const colWidths = [
    { wch: 20 }, // Name
    { wch: 15 }, // Phone
    { wch: 25 }, // Email
    { wch: 20 }, // Facebook ID
    { wch: 15 }, // Status
    { wch: 30 }, // Notes
  ];
  ws['!cols'] = colWidths;

  // Add worksheet to workbook
  utils.book_append_sheet(wb, ws, 'العملاء');

  // Save file
  writeFile(wb, filename);
}

function getStatusLabel(status: string): string {
  const statusMap: Record<string, string> = {
    new: 'جديد',
    potential: 'محتمل',
    interested: 'مهتم',
    responded: 'تم الرد',
    not_responded: 'لم يتم الرد',
    appointment_set: 'موعد محدد',
    post_meeting: 'بعد الاجتماع',
    reserved: 'محجوز',
    cancelled: 'ملغي',
    sold: 'تم البيع',
    postponed: 'مؤجل',
    resale: 'إعادة بيع'
  };

  return statusMap[status] || status;
}