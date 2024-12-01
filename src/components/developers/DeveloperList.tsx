import React from 'react';
import { Developer } from '../../types/developer';
import { Edit, Trash2, Globe, Mail, Phone, Eye, Building2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Link } from 'react-router-dom';

interface DeveloperListProps {
  developers: Developer[];
  onEdit: (developer: Developer) => void;
  onDelete: (developer: Developer) => void;
}

const DeveloperList: React.FC<DeveloperListProps> = ({
  developers,
  onEdit,
  onDelete,
}) => {
  const { language } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {developers.map((developer) => (
        <div key={developer.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="relative h-48">
            {developer.logo ? (
              <img
                src={developer.logo}
                alt={language === 'ar' ? developer.name : developer.nameEn}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <span className="text-4xl font-bold text-gray-300">
                  {(language === 'ar' ? developer.name : developer.nameEn)[0]}
                </span>
              </div>
            )}
          </div>

          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {language === 'ar' ? developer.name : developer.nameEn}
            </h3>
            <p className="text-gray-600 mb-4">
              {language === 'ar' ? developer.description : developer.descriptionEn}
            </p>

            <div className="space-y-2">
              {developer.website && (
                <a
                  href={`https://${developer.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-600 hover:text-blue-600"
                >
                  <Globe className="w-4 h-4 ml-2" />
                  <span className="text-sm">{developer.website}</span>
                </a>
              )}
              {developer.email && (
                <a
                  href={`mailto:${developer.email}`}
                  className="flex items-center text-gray-600 hover:text-blue-600"
                >
                  <Mail className="w-4 h-4 ml-2" />
                  <span className="text-sm">{developer.email}</span>
                </a>
              )}
              {developer.phone && (
                <a
                  href={`tel:${developer.phone}`}
                  className="flex items-center text-gray-600 hover:text-blue-600"
                >
                  <Phone className="w-4 h-4 ml-2" />
                  <span className="text-sm" dir="ltr">{developer.phone}</span>
                </a>
              )}
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <Link
                to={`/developers/${developer.id}`}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                title={language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
              >
                <Eye className="w-5 h-5" />
              </Link>
              <Link
                to={`/developers/${developer.id}/projects`}
                className="p-2 text-green-600 hover:bg-green-50 rounded-md"
                title={language === 'ar' ? 'المشاريع' : 'Projects'}
              >
                <Building2 className="w-5 h-5" />
              </Link>
              <button
                onClick={() => onEdit(developer)}
                className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-md"
                title={language === 'ar' ? 'تعديل' : 'Edit'}
              >
                <Edit className="w-5 h-5" />
              </button>
              <button
                onClick={() => onDelete(developer)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                title={language === 'ar' ? 'حذف' : 'Delete'}
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DeveloperList;