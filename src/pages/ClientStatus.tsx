import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Client } from '../types';
import ClientList from '../components/ClientList';
import ClientForm from '../components/ClientForm';
import { UserPlus } from 'lucide-react';
import { useClients } from '../contexts/ClientContext';
import { useLanguage } from '../contexts/LanguageContext';
import { statusTitles, statusMap } from '../utils/clientStatus';

const ClientStatusPage = () => {
  const { status } = useParams<{ status: string }>();
  const [showForm, setShowForm] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | undefined>();
  const { clients, addClient, updateClient, deleteClient, getClientsByStatus } = useClients();
  const { language } = useLanguage();
  
  const title = status ? statusTitles[status] : 'العملاء';
  const clientStatus = status ? statusMap[status] : 'new';
  
  const filteredClients = getClientsByStatus(clientStatus);

  const handleView = (client: Client) => {
    console.log('View client:', client);
  };

  const handleEdit = (client: Client) => {
    setSelectedClient(client);
    setShowForm(true);
  };

  const handleDelete = (client: Client) => {
    if (window.confirm(language === 'ar' 
      ? 'هل أنت متأكد من حذف هذا العميل؟'
      : 'Are you sure you want to delete this client?')) {
      deleteClient(client.id);
    }
  };

  const handleSubmit = (data: Omit<Client, 'id'>) => {
    if (selectedClient) {
      updateClient(selectedClient.id, data);
    } else {
      addClient({ ...data, status: clientStatus } as Client);
    }
    setShowForm(false);
    setSelectedClient(undefined);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <button 
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <UserPlus className="w-5 h-5" />
          {language === 'ar' ? 'إضافة عميل' : 'Add Client'}
        </button>
      </div>

      {showForm ? (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {selectedClient 
              ? (language === 'ar' ? 'تعديل عميل' : 'Edit Client')
              : (language === 'ar' ? 'إضافة عميل جديد' : 'Add New Client')}
          </h2>
          <ClientForm
            client={selectedClient}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setSelectedClient(undefined);
            }}
          />
        </div>
      ) : (
        <ClientList
          clients={filteredClients}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default ClientStatusPage;
