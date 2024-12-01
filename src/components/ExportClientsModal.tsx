import React, { useState } from 'react';
import { X, FileSpreadsheet, Download } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Client } from '../types';
import { exportClientsToExcel } from '../utils/exportToExcel';

interface ExportClientsModalProps {
  clients: Client[];
  onClose: () => void;
}

const ExportClientsModal: React.FC<ExportClientsModalProps> = ({ clients, onClose }) => {
  const { language } = useLanguage();
  const [exportLimit, setExportLimit] = useState<'all' | 'limited'>('all');
  const [limit, setLimit] = useState(10);
  const [filename, setFilename] = useState('clients.xlsx');

  const handleExport = () => {
    const options = {
      limit: exportLimit === 'limited' ? limit : undefined,
      filename: filename.endsWith('.xlsx') ? filename : `${filename}.xlsx`
    };

    exportClientsToExcel(clients, options);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <FileSpreadsheet className="w-6 h-6 text-green-600" />
            {language === 'ar' ? 'تصدير العملاء' : 'Export Clients'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ar' ? 'عدد العملاء' : 'Number of Clients'}
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="all"
                  checked={exportLimit === 'all'}
                  onChange={(e) => setExportLimit(e.target.value as 'all' | 'limited')}
                  className="ml-2"
                />
                <span className="mr-2">
                  {language === 'ar' ? 'تصدير الكل' : 'Export All'}
                </span>
                <span className="text-sm text-gray-500">
                  ({clients.length} {language === 'ar' ? 'عميل' : 'clients'})
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="limited"
                  checked={exportLimit === 'limited'}
                  onChange={(e) => setExportLimit(e.target.value as 'all' | 'limited')}
                  className="ml-2"
                />
                <span className="mr-2">
                  {language === 'ar' ? 'تحديد عدد معين' : 'Specify Number'}
                </span>
              </label>
            </div>
          </div>

          {exportLimit === 'limited' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'عدد العملاء المراد تصديرهم' : 'Number of Clients to Export'}
              </label>
              <input
                type="number"
                value={limit}
                onChange={(e) => setLimit(Math.max(1, parseInt(e.target.value) || 0))}
                min="1"
                max={clients.length}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ar' ? 'اسم الملف' : 'Filename'}
            </label>
            <input
              type="text"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="clients.xlsx"
              dir="ltr"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              {language === 'ar' ? 'إلغاء' : 'Cancel'}
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
            >
              <Download className="w-4 h-4" />
              {language === 'ar' ? 'تصدير' : 'Export'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportClientsModal;