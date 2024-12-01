import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

// Define interfaces for the component
interface Location {
  city: string;
  cityEn: string;
  district: string;
  districtEn: string;
}

interface Price {
  min: number;
  max: number;
  currency: string;
}

interface Media {
  images: string[];
  videos: string[];
  brochure?: string;
}

interface Project {
  developerId: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  location: Location;
  type: 'residential' | 'commercial' | 'mixed_use' | 'industrial';
  status: 'planned' | 'under_construction' | 'completed' | 'sold_out';
  startDate: string;
  completionDate: string;
  totalUnits: number;
  price: Price;
  features: string[];
  featuresEn: string[];
  media: Media;
}

interface ProjectFormProps {
  developerId: string;
  project?: Project;
  onSubmit: (data: Partial<Project>) => void;
  onCancel: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  developerId,
  project,
  onSubmit,
  onCancel,
}) => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState<Project>({
    developerId,
    name: project?.name || '',
    nameEn: project?.nameEn || '',
    description: project?.description || '',
    descriptionEn: project?.descriptionEn || '',
    location: {
      city: project?.location?.city || '',
      cityEn: project?.location?.cityEn || '',
      district: project?.location?.district || '',
      districtEn: project?.location?.districtEn || '',
    },
    type: project?.type || 'residential',
    status: project?.status || 'planned',
    startDate: project?.startDate || '',
    completionDate: project?.completionDate || '',
    totalUnits: project?.totalUnits || 0,
    price: {
      min: project?.price?.min || 0,
      max: project?.price?.max || 0,
      currency: 'EGP',
    },
    features: project?.features || [],
    featuresEn: project?.featuresEn || [],
    media: {
      images: project?.media?.images || [],
      videos: project?.media?.videos || [],
      brochure: project?.media?.brochure,
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section as keyof typeof prev],
          [field]: type === 'number' ? Number(value) : value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'number' ? Number(value) : value,
      }));
    }
  };

  const handleFeatureChange = (index: number, value: string, isEnglish: boolean = false) => {
    setFormData(prev => ({
      ...prev,
      [isEnglish ? 'featuresEn' : 'features']: prev[isEnglish ? 'featuresEn' : 'features'].map(
        (feature, i) => (i === index ? value : feature)
      ),
    }));
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, ''],
      featuresEn: [...prev.featuresEn, ''],
    }));
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
      featuresEn: prev.featuresEn.filter((_, i) => i !== index),
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setFormData(prev => ({
        ...prev,
        media: {
          ...prev.media,
          images: [...prev.media.images, ...newImages],
        },
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-2 gap-6">
        {/* Project Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {language === 'ar' ? 'اسم المشروع (عربي)' : 'Project Name (Arabic)'}
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            dir="rtl"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {language === 'ar' ? 'اسم المشروع (إنجليزي)' : 'Project Name (English)'}
          </label>
          <input
            type="text"
            name="nameEn"
            value={formData.nameEn}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            dir="ltr"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {language === 'ar' ? 'الوصف (عربي)' : 'Description (Arabic)'}
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            dir="rtl"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {language === 'ar' ? 'الوصف (إنجليزي)' : 'Description (English)'}
          </label>
          <textarea
            name="descriptionEn"
            value={formData.descriptionEn}
            onChange={handleInputChange}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            dir="ltr"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {language === 'ar' ? 'المدينة (عربي)' : 'City (Arabic)'}
          </label>
          <input
            type="text"
            name="location.city"
            value={formData.location.city}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            dir="rtl"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {language === 'ar' ? 'المدينة (إنجليزي)' : 'City (English)'}
          </label>
          <input
            type="text"
            name="location.cityEn"
            value={formData.location.cityEn}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            dir="ltr"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {language === 'ar' ? 'الحي (عربي)' : 'District (Arabic)'}
          </label>
          <input
            type="text"
            name="location.district"
            value={formData.location.district}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            dir="rtl"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {language === 'ar' ? 'الحي (إنجليزي)' : 'District (English)'}
          </label>
          <input
            type="text"
            name="location.districtEn"
            value={formData.location.districtEn}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            dir="ltr"
          />
        </div>

        {/* Project Type and Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {language === 'ar' ? 'نوع المشروع' : 'Project Type'}
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="residential">
              {language === 'ar' ? 'سكني' : 'Residential'}
            </option>
            <option value="commercial">
              {language === 'ar' ? 'تجاري' : 'Commercial'}
            </option>
            <option value="mixed_use">
              {language === 'ar' ? 'متعدد الاستخدامات' : 'Mixed Use'}
            </option>
            <option value="industrial">
              {language === 'ar' ? 'صناعي' : 'Industrial'}
            </option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {language === 'ar' ? 'حالة المشروع' : 'Project Status'}
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="planned">
              {language === 'ar' ? 'مخطط' : 'Planned'}
            </option>
            <option value="under_construction">
              {language === 'ar' ? 'تحت الإنشاء' : 'Under Construction'}
            </option>
            <option value="completed">
              {language === 'ar' ? 'مكتمل' : 'Completed'}
            </option>
            <option value="sold_out">
              {language === 'ar' ? 'نفذت الوحدات' : 'Sold Out'}
            </option>
          </select>
        </div>

        {/* Dates */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {language === 'ar' ? 'تاريخ البدء' : 'Start Date'}
          </label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {language === 'ar' ? 'تاريخ الانتهاء' : 'Completion Date'}
          </label>
          <input
            type="date"
            name="completionDate"
            value={formData.completionDate}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Units and Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {language === 'ar' ? 'عدد الوحدات' : 'Total Units'}
          </label>
          <input
            type="number"
            name="totalUnits"
            value={formData.totalUnits}
            onChange={handleInputChange}
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {language === 'ar' ? 'السعر من (جنيه)' : 'Price From (EGP)'}
            </label>
            <input
              type="number"
              name="price.min"
              value={formData.price.min}
              onChange={handleInputChange}
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {language === 'ar' ? 'السعر إلى (جنيه)' : 'Price To (EGP)'}
            </label>
            <input
              type="number"
              name="price.max"
              value={formData.price.max}
              onChange={handleInputChange}
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Features */}
        <div className="col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              {language === 'ar' ? 'المميزات' : 'Features'}
            </h3>
            <button
              type="button"
              onClick={addFeature}
              className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-md"
            >
              {language === 'ar' ? 'إضافة ميزة' : 'Add Feature'}
            </button>
          </div>
          <div className="space-y-4">
            {formData.features.map((feature, index) => (
              <div key={index} className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    placeholder={language === 'ar' ? 'الميزة بالعربية' : 'Feature in Arabic'}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    dir="rtl"
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.featuresEn[index]}
                    onChange={(e) => handleFeatureChange(index, e.target.value, true)}
                    placeholder={language === 'ar' ? 'الميزة بالإنجليزية' : 'Feature in English'}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    dir="ltr"
                  />
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Images */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            {language === 'ar' ? 'صور المشروع' : 'Project Images'}
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="images"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                >
                  <span>{language === 'ar' ? 'اختر صور المشروع' : 'Upload Images'}</span>
                  <input
                    id="images"
                    name="images"
                    type="file"
                    className="sr-only"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          {language === 'ar' ? 'إلغاء' : 'Cancel'}
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          {project 
            ? (language === 'ar' ? 'تحديث' : 'Update')
            : (language === 'ar' ? 'إضافة' : 'Add')}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;