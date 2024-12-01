import React, { useState } from 'react';
import { Client } from '../types';
import ClientStatusBadge from './ClientStatusBadge';
import { Eye, Edit, Trash2, Download } from 'lucide-react';
import ContactOptions from './ContactOptions';
import { useLanguage } from '../contexts/LanguageContext';

interface ClientListProps {
  clients: Client[];
  onView: (client: Client) => void;
  onEdit: (client: Client) => void;
  onDelete: (client: Client | Client[]) => void;
  onExport?: (clients: Client[]) => void;
}

const ClientList: React.FC<ClientListProps> = ({
  clients,
  onView,
  onEdit,
  onDelete,
  onExport
}) => {
  const [activeContactRow, setActiveContactRow] = useState<string | null>(null);
  const [contactOptionsTimeout, setContactOptionsTimeout] = useState<NodeJS.Timeout | null>(null);
  const [selectedClients, setSelectedClients] = useState<Set<string>>(new Set());
  const { language } = useLanguage();

  const handlePhoneMouseEnter = (clientId: string) => {
    if (contactOptionsTimeout) {
      clearTimeout(contactOptionsTimeout);
    }
    setActiveContactRow(clientId);
  };

  const handlePhoneMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActiveContactRow(null);
    }, 500);
    setContactOptionsTimeout(timeout);
  };

  const handleContactOptionsMouseEnter = () => {
    if (contactOptionsTimeout) {
      clearTimeout(contactOptionsTimeout);
    }
  };

  const handleContactOptionsMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActiveContactRow(null);
    }, 300);
    setContactOptionsTimeout(timeout);
  };

  const toggleSelectAll = () => {
    if (selectedClients.size === clients.length) {
      setSelectedClients(new Set());
    } else {
      setSelectedClients(new Set(clients.map(client => client.id)));
    }
  };

  const toggleSelectClient = (clientId: string) => {
    const newSelected = new Set(selectedClients);
    if (newSelected.has(clientId)) {
      newSelected.delete(clientId);
    } else {
      newSelected.add(clientId);
    }
    setSelectedClients(newSelected);
  };

  const handleBulkDelete = () => {
    if (selectedClients.size === 0) return;
    
    const selectedClientObjects = clients.filter(client => 
      selectedClients.has(client.id)
    );
    onDelete(selectedClientObjects);
    setSelectedClients(new Set());
  };

  const handleBulkExport = () => {
    if (!onExport || selectedClients.size === 0) return;
    
    const selectedClientObjects = clients.filter(client => 
      selectedClients.has(client.id)
    );
    onExport(selectedClientObjects);
  };

  return (
    <div>
      {selectedClients.size > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg mb-4 flex items-center justify-between">
          <span className="text-sm text-gray-600">
            {language === 'ar' 
              ? `تم تحديد ${selectedClients.size} عميل`
              : `${selectedClients.size} clients selected`}
          </span>
          <div className="flex gap-2">
            <button
              onClick={handleBulkExport}
              className="flex items-center gap-1 px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded-md"
            >
              <Download className="w-4 h-4" />
              {language === 'ar' ? 'تصدير المحدد' : 'Export Selected'}
            </button>
            <button
              onClick={handleBulkDelete}
              className="flex items-center gap-1 px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-md"
            >
              <Trash2 className="w-4 h-4" />
              {language === 'ar' ? 'حذف المحدد' : 'Delete Selected'}
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right">
                <input
                  type="checkbox"
                  checked={selectedClients.size === clients.length}
                  onChange={toggleSelectAll}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
              </th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                {language === 'ar' ? 'الاسم' : 'Name'}
              </th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                {language === 'ar' ? 'الهاتف' : 'Phone'}
              </th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
              </th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                {language === 'ar' ? 'الحالة' : 'Status'}
              </th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                {language === 'ar' ? 'الإجراءات' : 'Actions'}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {clients.map((client) => (
              <tr key={client.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedClients.has(client.id)}
                    onChange={() => toggleSelectClient(client.id)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{client.name}</td>
                <td className="px-6 py-4 text-sm text-gray-900 relative">
                  <div className="relative inline-block">
                    <span
                      className="cursor-pointer hover:text-blue-600"
                      onMouseEnter={() => handlePhoneMouseEnter(client.id)}
                      onMouseLeave={handlePhoneMouseLeave}
                    >
                      {client.phone}
                    </span>
                    {activeContactRow === client.id && (
                      <ContactOptions
                        phone={client.phone}
                        facebookId={client.facebookId}
                        onMouseEnter={handleContactOptionsMouseEnter}
                        onMouseLeave={handleContactOptionsMouseLeave}
                      />
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{client.email}</td>
                <td className="px-6 py-4 text-sm">
                  <ClientStatusBadge status={client.status} />
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onView(client)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onEdit(client)}
                      className="text-yellow-600 hover:text-yellow-800"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onDelete(client)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientList;