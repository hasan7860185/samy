import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Building2, Globe, Mail, Phone, Edit, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useDevelopers } from '../contexts/DeveloperContext';
import DeveloperForm from '../components/developers/DeveloperForm';

const DeveloperDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { getDeveloper, updateDeveloper } = useDevelopers();
  const [isEditing, setIsEditing] = useState(false);
  const developer = getDeveloper(id || '');

  if (!developer) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {language === 'ar' 
            ? 'لم يتم العثور على الشركة المطورة'
            : 'Developer Company Not Found'}
        </h2>
        <button
          onClick={() => navigate('/developers')}
          className="text-blue-600 hover:text-blue-800 flex items-center justify-center gap-2 mx-auto"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>
            {language === 'ar' ? 'العودة إلى القائمة' : 'Back to List'}
          </span>
        </button>
      </div>
    );
  }

  const handleUpdate = (data: Partial<Developer>) => {
    updateDeveloper(developer.id, data);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/developers')}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5 ml-2" />
          <span>
            {language === 'ar' ? 'العودة إلى القائمة' : 'Back to List'}
          </span>
        </button>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <Edit className="w-4 h-4" />
            {language === 'ar' ? 'تعديل' : 'Edit'}
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {language === 'ar' ? 'تعديل بيانات الشركة' : 'Edit Company Details'}
          </h2>
          <DeveloperForm
            developer={developer}
            onSubmit={handleUpdate}
            onCancel={() => setIsEditing(false)}
          />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Header with Logo */}
          <div className="relative h-64">
            {developer.logo ? (
              <img
                src={developer.logo}
                alt={language === 'ar' ? developer.name : developer.nameEn}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <Building2 className="w-24 h-24 text-gray-300" />
              </div>
            )}
          </div>

          {/* Company Information */}
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {language === 'ar' ? developer.name : developer.nameEn}
            </h1>
            
            <p className="text-lg text-gray-600 mb-8">
              {language === 'ar' ? developer.description : developer.descriptionEn}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {language === 'ar' ? 'معلومات الاتصال' : 'Contact Information'}
                </h2>
                
                {developer.website && (
                  <a
                    href={`https://${developer.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 hover:text-blue-600"
                  >
                    <Globe className="w-5 h-5 ml-3" />
                    <span>{developer.website}</span>
                  </a>
                )}
                
                {developer.email && (
                  <a
                    href={`mailto:${developer.email}`}
                    className="flex items-center text-gray-600 hover:text-blue-600"
                  >
                    <Mail className="w-5 h-5 ml-3" />
                    <span>{developer.email}</span>
                  </a>
                )}
                
                {developer.phone && (
                  <a
                    href={`tel:${developer.phone}`}
                    className="flex items-center text-gray-600 hover:text-blue-600"
                  >
                    <Phone className="w-5 h-5 ml-3" />
                    <span dir="ltr">{developer.phone}</span>
                  </a>
                )}
              </div>

              {/* Additional Information */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {language === 'ar' ? 'معلومات إضافية' : 'Additional Information'}
                </h2>
                <div className="space-y-2">
                  <p className="text-gray-600">
                    <span className="font-medium">
                      {language === 'ar' ? 'تاريخ التسجيل: ' : 'Registration Date: '}
                    </span>
                    {new Date(developer.createdAt).toLocaleDateString(
                      language === 'ar' ? 'ar-SA' : 'en-US'
                    )}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">
                      {language === 'ar' ? 'آخر تحديث: ' : 'Last Updated: '}
                    </span>
                    {new Date(developer.updatedAt).toLocaleDateString(
                      language === 'ar' ? 'ar-SA' : 'en-US'
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeveloperDetails;