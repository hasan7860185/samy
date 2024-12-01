import React, { useState } from 'react';
import { Building2, Plus } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useDevelopers } from '../contexts/DeveloperContext';
import DeveloperForm from '../components/developers/DeveloperForm';
import DeveloperList from '../components/developers/DeveloperList';

const Developers = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedDeveloper, setSelectedDeveloper] = useState<Developer | undefined>();
  const { language } = useLanguage();
  const { developers, addDeveloper, updateDeveloper, deleteDeveloper } = useDevelopers();

  const handleEdit = (developer: Developer) => {
    setSelectedDeveloper(developer);
    setShowForm(true);
  };

  const handleDelete = (developer: Developer) => {
    if (window.confirm(language === 'ar' 
      ? 'هل أنت متأكد من حذف هذه الشركة؟'
      : 'Are you sure you want to delete this company?')) {
      deleteDeveloper(developer.id);
    }
  };

  const handleSubmit = (data: Partial<Developer>) => {
    const now = new Date().toISOString();
    
    if (selectedDeveloper) {
      // Update existing developer
      updateDeveloper(selectedDeveloper.id, {
        ...data,
        updatedAt: now
      });
    } else {
      // Add new developer
      const newDeveloper: Developer = {
        id: `dev-${Date.now()}`,
        name: data.name || '',
        nameEn: data.nameEn || '',
        description: data.description || '',
        descriptionEn: data.descriptionEn || '',
        logo: data.logo,
        website: data.website,
        email: data.email,
        phone: data.phone,
        createdAt: now,
        updatedAt: now
      };
      
      addDeveloper(newDeveloper);
    }
    
    setShowForm(false);
    setSelectedDeveloper(undefined);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3 space-x-reverse">
          <Building2 className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">
            {language === 'ar' ? 'الشركات المطورة' : 'Development Companies'}
          </h1>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          {language === 'ar' ? 'إضافة شركة' : 'Add Company'}
        </button>
      </div>

      {showForm ? (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {selectedDeveloper
              ? (language === 'ar' ? 'تعديل شركة' : 'Edit Company')
              : (language === 'ar' ? 'إضافة شركة جديدة' : 'Add New Company')}
          </h2>
          <DeveloperForm
            developer={selectedDeveloper}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setSelectedDeveloper(undefined);
            }}
          />
        </div>
      ) : (
        <DeveloperList
          developers={developers}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Developers;