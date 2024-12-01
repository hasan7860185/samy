import React, { useState } from 'react';
import { Developer } from '../../types/developer';
import { Upload, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface DeveloperFormProps {
  developer?: Developer;
  onSubmit: (data: Partial<Developer>) => void;
  onCancel: () => void;
}

const DeveloperForm: React.FC<DeveloperFormProps> = ({
  developer,
  onSubmit,
  onCancel,
}) => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: developer?.name || '',
    nameEn: developer?.nameEn || '',
    description: developer?.description || '',
    descriptionEn: developer?.descriptionEn || '',
    logo: developer?.logo || '',
    website: developer?.website || '',
    email: developer?.email || '',
    phone: developer?.phone || '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert(language === 'ar' 
          ? 'حجم الصورة يجب أن يكون أقل من 5 ميجابايت'
          : 'Image size must be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, logo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setFormData(prev => ({ ...prev, logo: '' }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Logo Upload */}
      <div className="flex justify-center">
        <div className="relative">
          <div className="w-32 h-32 rounded-lg border-4 border-white bg-white overflow-hidden shadow-md">
            {formData.logo ? (
              <div className="relative group">
                <img
                  src={formData.logo}
                  alt={language === 'ar' ? 'شعار الشركة' : 'Company Logo'}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={removeLogo}
                  className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <Upload className="w-12 h-12 text-gray-400" />
              </div>
            )}
          </div>
          <label className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg cursor-pointer">
            <Upload className="w-5 h-5 text-gray-600" />
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleLogoUpload}
            />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Company Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {language === 'ar' ? 'اسم الشركة (عربي)' : 'Company Name (Arabic)'}
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
            {language === 'ar' ? 'اسم الشركة (إنجليزي)' : 'Company Name (English)'}
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
            {language === 'ar' ? 'نبذة عن الشركة (عربي)' : 'Company Description (Arabic)'}
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
            {language === 'ar' ? 'نبذة عن الشركة (إنجليزي)' : 'Company Description (English)'}
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

        {/* Contact Information */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {language === 'ar' ? 'الموقع الإلكتروني' : 'Website'}
          </label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            dir="ltr"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            dir="ltr"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            dir="ltr"
          />
        </div>
      </div>

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
          {developer
            ? (language === 'ar' ? 'تحديث' : 'Update')
            : (language === 'ar' ? 'إضافة' : 'Add')}
        </button>
      </div>
    </form>
  );
};

export default DeveloperForm;