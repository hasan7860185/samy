import React, { useState } from 'react';
import { Property } from '../types/property';
import PropertyCard from '../components/properties/PropertyCard';
import PropertyForm from '../components/properties/PropertyForm';
import { Building2, Plus } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useProperties } from '../contexts/PropertyContext';

const Properties = () => {
  const { properties, addProperty, updateProperty, deleteProperty } = useProperties();
  const [showForm, setShowForm] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | undefined>();
  const { t, language } = useLanguage();

  const handleEdit = (property: Property) => {
    setSelectedProperty(property);
    setShowForm(true);
  };

  const handleDelete = (property: Property) => {
    if (window.confirm(language === 'ar' 
      ? 'هل أنت متأكد من حذف هذا العقار؟'
      : 'Are you sure you want to delete this property?')) {
      deleteProperty(property.id);
    }
  };

  const handleSubmit = async (data: Partial<Property>) => {
    try {
      if (selectedProperty) {
        await updateProperty(selectedProperty.id, data);
      } else {
        const newProperty: Property = {
          id: `prop-${Date.now()}`,
          ...data as Property,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        await addProperty(newProperty);
      }
      setShowForm(false);
      setSelectedProperty(undefined);
    } catch (error) {
      console.error('Error saving property:', error);
      alert(language === 'ar' 
        ? 'حدث خطأ أثناء حفظ العقار'
        : 'Error saving property');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3 space-x-reverse">
          <Building2 className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">{t('properties')}</h1>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 space-x-reverse px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          <span>{t('addProperty')}</span>
        </button>
      </div>

      {showForm ? (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {selectedProperty ? t('editProperty') : t('addProperty')}
          </h2>
          <PropertyForm
            property={selectedProperty}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setSelectedProperty(undefined);
            }}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Properties;