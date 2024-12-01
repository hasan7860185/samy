import React from 'react';
import { Project } from '../../types/project';
import { Building2, MapPin, Calendar } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Link } from 'react-router-dom';

interface ProjectListProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  onEdit,
  onDelete,
}) => {
  const { language } = useLanguage();

  const formatPrice = (min: number, max: number) => {
    const minFormatted = min.toLocaleString('ar-EG');
    const maxFormatted = max.toLocaleString('ar-EG');
    
    return language === 'ar'
      ? `${minFormatted} - ${maxFormatted} جنيه`
      : `EGP ${min.toLocaleString('en-US')} - ${max.toLocaleString('en-US')}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <div key={project.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="relative h-48">
            {project.media.images[0] ? (
              <img
                src={project.media.images[0]}
                alt={language === 'ar' ? project.name : project.nameEn}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <Building2 className="w-16 h-16 text-gray-300" />
              </div>
            )}
          </div>

          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {language === 'ar' ? project.name : project.nameEn}
            </h3>

            <div className="flex items-center text-gray-500 mb-4">
              <MapPin className="w-4 h-4 ml-1" />
              <span className="text-sm">
                {language === 'ar'
                  ? `${project.location.city}، ${project.location.district}`
                  : `${project.location.cityEn}, ${project.location.districtEn}`}
              </span>
            </div>

            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm text-gray-500">
                  {language === 'ar' ? 'السعر' : 'Price'}
                </p>
                <p className="text-lg font-semibold text-blue-600">
                  {formatPrice(project.price.min, project.price.max)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  {language === 'ar' ? 'الوحدات' : 'Units'}
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  {project.totalUnits}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center text-gray-500">
                <Calendar className="w-4 h-4 ml-1" />
                <span className="text-sm">
                  {new Date(project.completionDate).toLocaleDateString(
                    language === 'ar' ? 'ar-EG' : 'en-US'
                  )}
                </span>
              </div>
              <div className="flex space-x-2 space-x-reverse">
                <Link
                  to={`/projects/${project.id}`}
                  className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-md"
                >
                  {language === 'ar' ? 'عرض' : 'View'}
                </Link>
                <button
                  onClick={() => onEdit(project)}
                  className="px-3 py-1 text-sm text-yellow-600 hover:bg-yellow-50 rounded-md"
                >
                  {language === 'ar' ? 'تعديل' : 'Edit'}
                </button>
                <button
                  onClick={() => onDelete(project)}
                  className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-md"
                >
                  {language === 'ar' ? 'حذف' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;