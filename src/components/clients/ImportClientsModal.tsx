import React, { useState } from 'react';
import { X, Upload, Check } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Client, ClientStatus } from '../../types';
import { parseExcelFile, validateExcelData } from '../../utils/excel';

interface ImportClientsModalProps {
  onClose: () => void;
  onImport: (clients: Omit<Client, 'id'>[]) => void;
}

interface ColumnMapping {
  name: string | null;
  phone: string | null;
  email: string | null;
  facebookId: string | null;
  notes: string | null;
}

const ImportClientsModal: React.FC<ImportClientsModalProps> = ({ onClose, onImport }) => {
  const { language } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [sheetData, setSheetData] = useState<string[][]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [mapping, setMapping] = useState<ColumnMapping>({
    name: null,
    phone: null,
    email: null,
    facebookId: null,
    notes: null,
  });
  const [status, setStatus] = useState<ClientStatus>('new');
  const [step, setStep] = useState<1 | 2>(1);
  const [error, setError] = useState<string>('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset error state
    setError('');

    // Validate file type
    const validTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
      'application/vnd.ms-excel', // .xls
      'text/csv' // .csv
    ];
    
    if (!validTypes.includes(file.type)) {
      setError(language === 'ar' 
        ? 'يرجى اختيار ملف Excel (.xlsx) أو CSV'
        : 'Please select an Excel (.xlsx) or CSV file');
      return;
    }

    setFile(file);
    
    try {
      let data: string[][];
      
      if (file.type === 'text/csv') {
        const text = await file.text();
        data = text.split('\n').map(line => line.split(',').map(cell => cell.trim()));
      } else {
        data = await parseExcelFile(file);
      }

      if (!validateExcelData(data)) {
        setError(language === 'ar'
          ? 'الملف لا يحتوي على الأعمدة المطلوبة (الاسم ورقم الهاتف)'
          : 'File does not contain required columns (name and phone)');
        return;
      }

      // Get columns from first row
      const headers = data[0];
      setColumns(headers);
      
      // Get data rows
      const rows = data.slice(1);
      setSheetData(rows);
      
      setStep(2);
    } catch (error) {
      console.error('Error reading file:', error);
      setError(language === 'ar' 
        ? 'حدث خطأ أثناء قراءة الملف'
        : 'Error reading file');
    }
  };

  const handleMapping = (field: keyof ColumnMapping, column: string | null) => {
    setMapping(prev => ({
      ...prev,
      [field]: column,
    }));
  };

  const handleImport = () => {
    // Validate required fields
    if (!mapping.name || !mapping.phone) {
      setError(language === 'ar'
        ? 'يجب تحديد حقول الاسم ورقم الهاتف'
        : 'Name and Phone fields are required');
      return;
    }

    // Transform data according to mapping
    const clients = sheetData.map(row => {
      const nameIndex = columns.indexOf(mapping.name!);
      const phoneIndex = columns.indexOf(mapping.phone!);
      const emailIndex = mapping.email ? columns.indexOf(mapping.email) : -1;
      const facebookIdIndex = mapping.facebookId ? columns.indexOf(mapping.facebookId) : -1;
      const notesIndex = mapping.notes ? columns.indexOf(mapping.notes) : -1;

      // Skip row if name or phone is empty
      if (!row[nameIndex] || !row[phoneIndex]) return null;

      return {
        name: row[nameIndex],
        phone: row[phoneIndex].toString(),
        email: emailIndex >= 0 ? row[emailIndex] : '',
        facebookId: facebookIdIndex >= 0 ? row[facebookIdIndex] : '',
        notes: notesIndex >= 0 ? row[notesIndex] : '',
        status,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }).filter(Boolean) as Omit<Client, 'id'>[];

    onImport(clients);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {language === 'ar' ? 'استيراد عملاء' : 'Import Clients'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        {step === 1 ? (
          <div className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <label className="cursor-pointer">
                    <span className="text-blue-600 hover:text-blue-500">
                      {language === 'ar' 
                        ? 'اختر ملف Excel أو CSV'
                        : 'Choose Excel or CSV file'}
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept=".xlsx,.xls,.csv"
                      onChange={handleFileUpload}
                    />
                  </label>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {language === 'ar'
                    ? 'يدعم ملفات Excel (.xlsx) و CSV'
                    : 'Supports Excel (.xlsx) and CSV files'}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'حالة العملاء' : 'Client Status'}
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ClientStatus)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="new">{language === 'ar' ? 'جديد' : 'New'}</option>
                <option value="potential">{language === 'ar' ? 'محتمل' : 'Potential'}</option>
                <option value="interested">{language === 'ar' ? 'مهتم' : 'Interested'}</option>
                <option value="responded">{language === 'ar' ? 'تم الرد' : 'Responded'}</option>
                <option value="not_responded">{language === 'ar' ? 'لم يتم الرد' : 'Not Responded'}</option>
                <option value="appointment_set">{language === 'ar' ? 'موعد محدد' : 'Appointment Set'}</option>
                <option value="post_meeting">{language === 'ar' ? 'بعد الاجتماع' : 'Post Meeting'}</option>
                <option value="reserved">{language === 'ar' ? 'محجوز' : 'Reserved'}</option>
                <option value="cancelled">{language === 'ar' ? 'ملغي' : 'Cancelled'}</option>
                <option value="sold">{language === 'ar' ? 'تم البيع' : 'Sold'}</option>
                <option value="postponed">{language === 'ar' ? 'مؤجل' : 'Postponed'}</option>
                <option value="resale">{language === 'ar' ? 'إعادة بيع' : 'Resale'}</option>
              </select>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">
                {language === 'ar' ? 'تعيين الأعمدة' : 'Map Columns'}
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'ar' ? 'الاسم' : 'Name'} *
                  </label>
                  <select
                    value={mapping.name || ''}
                    onChange={(e) => handleMapping('name', e.target.value || null)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">{language === 'ar' ? 'اختر عمود' : 'Select column'}</option>
                    {columns.map((col, index) => (
                      <option key={index} value={col}>{col}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'ar' ? 'رقم الهاتف' : 'Phone'} *
                  </label>
                  <select
                    value={mapping.phone || ''}
                    onChange={(e) => handleMapping('phone', e.target.value || null)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">{language === 'ar' ? 'اختر عمود' : 'Select column'}</option>
                    {columns.map((col, index) => (
                      <option key={index} value={col}>{col}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                  </label>
                  <select
                    value={mapping.email || ''}
                    onChange={(e) => handleMapping('email', e.target.value || null)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">{language === 'ar' ? 'اختر عمود' : 'Select column'}</option>
                    {columns.map((col, index) => (
                      <option key={index} value={col}>{col}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'ar' ? 'معرف فيسبوك' : 'Facebook ID'}
                  </label>
                  <select
                    value={mapping.facebookId || ''}
                    onChange={(e) => handleMapping('facebookId', e.target.value || null)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">{language === 'ar' ? 'اختر عمود' : 'Select column'}</option>
                    {columns.map((col, index) => (
                      <option key={index} value={col}>{col}</option>
                    ))}
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'ar' ? 'ملاحظات' : 'Notes'}
                  </label>
                  <select
                    value={mapping.notes || ''}
                    onChange={(e) => handleMapping('notes', e.target.value || null)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">{language === 'ar' ? 'اختر عمود' : 'Select column'}</option>
                    {columns.map((col, index) => (
                      <option key={index} value={col}>{col}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="border-t pt-4 flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                {language === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                onClick={handleImport}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                <Check className="w-4 h-4" />
                {language === 'ar' ? 'استيراد' : 'Import'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImportClientsModal;