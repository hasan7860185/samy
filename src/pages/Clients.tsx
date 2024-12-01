import React, { useState } from 'react';
import { Client } from '../types';
import ClientList from '../components/ClientList';
import ClientForm from '../components/ClientForm';
import ImportClientsModal from '../components/clients/ImportClientsModal';
import ExportClientsModal from '../components/ExportClientsModal';
import { UserPlus, Upload, Download } from 'lucide-react';
import { useClients } from '../contexts/ClientContext';
import { useLanguage } from '../contexts/LanguageContext';

const Clients = () => {
  const { clients, addClient, updateClient, deleteClient } = useClients();
  const [showForm, setShowForm] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | undefined>();
  const { language } = useLanguage();

  const handleView = (client: Client) => {
    // Implement view logic
    console.log('View client:', client);
  };

  const handleEdit = (client: Client) => {
    setSelectedClient(client);
    setShowForm(true);
  };

  const handleDelete = (clientOrClients: Client | Client[]) => {
    const clients = Array.isArray(clientOrClients) ? clientOrClients : [clientOrClients];
    const message = language === 'ar'
      ? `هل أنت متأكد من حذف ${clients.length} عميل؟`
      : `Are you sure you want to delete ${clients.length} client(s)?`;

    if (window.confirm(message)) {
      clients.forEach(client => deleteClient(client.id));
    }
  };

  const handleSubmit = (data: Omit<Client, 'id'>) => {
    if (selectedClient) {
      updateClient(selectedClient.id, data);
    } else {
      const newClient: Client = {
        ...data,
        id: `client-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      addClient(newClient);
    }
    setShowForm(false);
    setSelectedClient(undefined);
  };

  const handleImport = async (clients: Omit<Client, 'id'>[]) => {
    try {
      for (const clientData of clients) {
        const newClient: Client = {
          ...clientData,
          id: `client-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        };
        await addClient(newClient);
      }
    } catch (error) {
      console.error('Error importing clients:', error);
      alert(language === 'ar'
        ? 'حدث خطأ أثناء استيراد العملاء'
        : 'Error importing clients');
    }
  };

  const handleExport = (clientsToExport: Client[]) => {
    setShowExport(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">
          {language === 'ar' ? 'العملاء' : 'Clients'}
        </h1>
        <div className="flex gap-3">
          <button
            onClick={() => setShowExport(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <Download className="w-5 h-5" />
            {language === 'ar' ? 'تصدير' : 'Export'}
          </button>
          <button
            onClick={() => setShowImport(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <Upload className="w-5 h-5" />
            {language === 'ar' ? 'استيراد' : 'Import'}
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            <UserPlus className="w-5 h-5" />
            {language === 'ar' ? 'إضافة عميل' : 'Add Client'}
          </button>
        </div>
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
          clients={clients}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onExport={handleExport}
        />
      )}

      {showImport && (
        <ImportClientsModal
          onClose={() => setShowImport(false)}
          onImport={handleImport}
        />
      )}

      {showExport && (
        <ExportClientsModal
          clients={clients}
          onClose={() => setShowExport(false)}
        />
      )}
    </div>
  );
};

export default Clients;