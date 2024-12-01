import React from 'react';
import { Client, ClientStatus } from '../types';
import { Facebook } from 'lucide-react';

interface ClientFormProps {
  client?: Client;
  onSubmit: (data: Omit<Client, 'id'>) => void;
  onCancel: () => void;
}

const statusOptions: { value: ClientStatus; label: string }[] = [
  { value: 'new', label: 'جديد' },
  { value: 'potential', label: 'محتمل' },
  { value: 'interested', label: 'مهتم' },
  { value: 'responded', label: 'تم الرد' },
  { value: 'not_responded', label: 'لم يتم الرد' },
  { value: 'appointment_set', label: 'موعد محدد' },
  { value: 'post_meeting', label: 'بعد الاجتماع' },
  { value: 'reserved', label: 'محجوز' },
  { value: 'cancelled', label: 'ملغي' },
  { value: 'sold', label: 'تم البيع' },
  { value: 'postponed', label: 'مؤجل' },
  { value: 'resale', label: 'إعادة بيع' },
];

const ClientForm: React.FC<ClientFormProps> = ({ client, onSubmit, onCancel }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    onSubmit({
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      facebookId: formData.get('facebookId') as string,
      status: formData.get('status') as ClientStatus,
      notes: formData.get('notes') as string,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          الاسم
        </label>
        <input
          type="text"
          name="name"
          id="name"
          defaultValue={client?.name}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          الهاتف
        </label>
        <input
          type="tel"
          name="phone"
          id="phone"
          defaultValue={client?.phone}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          البريد الإلكتروني
        </label>
        <input
          type="email"
          name="email"
          id="email"
          defaultValue={client?.email}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="facebookId" className="block text-sm font-medium text-gray-700">
          معرف فيسبوك
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Facebook className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            name="facebookId"
            id="facebookId"
            defaultValue={client?.facebookId}
            className="block w-full pr-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="معرف الفيسبوك"
            dir="ltr"
          />
        </div>
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          الحالة
        </label>
        <select
          name="status"
          id="status"
          defaultValue={client?.status}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
          ملاحظات
        </label>
        <textarea
          name="notes"
          id="notes"
          rows={4}
          defaultValue={client?.notes}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          إلغاء
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          {client ? 'تحديث' : 'إضافة'}
        </button>
      </div>
    </form>
  );
};

export default ClientForm;