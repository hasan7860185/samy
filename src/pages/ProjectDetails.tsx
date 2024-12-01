import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Building2, MapPin, Calendar, ArrowLeft, Edit } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useProjects } from '../contexts/ProjectContext';

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { getProject } = useProjects();
  const project = getProject(id || '');

  if (!project) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {language === 'ar' 
            ? 'لم يتم العثور على المشروع'
            : 'Project Not Found'}
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:text-blue-800 flex items-center justify-center gap-2 mx-auto"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>
            {language === 'ar' ? 'العودة للخلف' : 'Go Back'}
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5 ml-2" />
          <span>
            {language === 'ar' ? 'العودة للخلف' : 'Go Back'}
          </span>
        </button>
        <button
          onClick={() => navigate(`/projects/${id}/edit`)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          <Edit className="w-4 h-4" />
          {language === 'ar' ? 'تعديل' : 'Edit'}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Project Images */}
        <div className="relative h-96">
          {project.media.images[0] ? (
            <img
              src={project.media.images[0]}
              alt={language === 'ar' ? project.name : project.nameEn}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <Building2 className="w-24 h-24 text-gray-300" />
            </div>
          )}
        </div>

        {/* Project Information */}
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {language === 'ar' ? project.name : project.nameEn}
          </h1>
          
          <div className="flex items-center text-gray-500 mb-6">
            <MapPin className="w-5 h-5 ml-2" />
            <span>
              {language === 'ar'
                ? `${project.location.city}، ${project.location.district}`
                : `${project.location.cityEn}, ${project.location.districtEn}`}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <p className="text-sm text-gray-500">
                {language === 'ar' ? 'يبدأ من' : 'Starting From'}
              </p>
              <p className="text-xl font-bold text-blue-600">
                {project.price.min.toLocaleString(language === 'ar' ? 'ar-EG' : 'en-US')} {language === 'ar' ? 'جنيه' : 'EGP'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">
                {language === 'ar' ? 'يصل إلى' : 'Up To'}
              </p>
              <p className="text-xl font-bold text-blue-600">
                {project.price.max.toLocaleString(language === 'ar' ? 'ar-EG' : 'en-US')} {language === 'ar' ? 'جنيه' : 'EGP'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 ml-2 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">
                  {language === 'ar' ? 'تاريخ البدء' : 'Start Date'}
                </p>
                <p className="font-semibold">
                  {new Date(project.startDate).toLocaleDateString(
                    language === 'ar' ? 'ar-EG' : 'en-US'
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <Calendar className="w-5 h-5 ml-2 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">
                  {language === 'ar' ? 'تاريخ الانتهاء' : 'Completion Date'}
                </p>
                <p className="font-semibold">
                  {new Date(project.completionDate).toLocaleDateString(
                    language === 'ar' ? 'ar-EG' : 'en-US'
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <Building2 className="w-5 h-5 ml-2 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">
                  {language === 'ar' ? 'إجمالي الوحدات' : 'Total Units'}
                </p>
                <p className="font-semibold">{project.totalUnits}</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {language === 'ar' ? 'وصف المشروع' : 'Project Description'}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {language === 'ar' ? project.description : project.descriptionEn}
            </p>
          </div>

          <div className="border-t pt-8 mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {language === 'ar' ? 'المميزات' : 'Features'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {(language === 'ar' ? project.features : project.featuresEn).map((feature, index) => (
                <div key={index} className="flex items-center text-gray-600">
                  <span className="w-2 h-2 bg-blue-500 rounded-full ml-2"></span>
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;