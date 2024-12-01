import React, { useState } from 'react';
import { Property, PropertyType, PropertyStatus } from '../../types/property';
import { Upload, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface PropertyFormProps {
  property?: Property;
  onSubmit: (data: Partial<Property>) => void;
  onCancel: () => void;
}

const PropertyForm: React.FC<PropertyFormProps> = ({
  property,
  onSubmit,
  onCancel,
}) => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    title: property?.title || '',
    titleEn: property?.titleEn || '',
    description: property?.description || '',
    descriptionEn: property?.descriptionEn || '',
    type: property?.type || 'apartment',
    status: property?.status || 'available',
    price: property?.price || 0,
    area: property?.area || 0,
    location: {
      city: property?.location.city || '',
      cityEn: property?.location.cityEn || '',
      district: property?.location.district || '',
      districtEn: property?.location.districtEn || '',
      address: property?.location.address || '',
      addressEn: property?.location.addressEn || '',
    },
    features: {
      bedrooms: property?.features.bedrooms || 0,
      bathrooms: property?.features.bathrooms || 0,
      parkingSpaces: property?.features.parkingSpaces || 0,
      yearBuilt: property?.features.yearBuilt || new Date().getFullYear(),
      hasPool: property?.features.hasPool || false,
      hasGarden: property?.features.hasGarden || false,
      hasElevator: property?.features.hasElevator || false,
      isFurnished: property?.features.isFurnished || false,
    },
    media: {
      images: property?.media.images || [],
    },
    owner: {
      name: property?.owner.name || '',
      nameEn: property?.owner.nameEn || '',
      phone: property?.owner.phone || '',
      email: property?.owner.email || '',
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

  const handleCheckboxChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [name]: !prev.features[name as keyof typeof prev.features],
      },
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
      {/* Property Title */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {language === 'ar' ? 'عنوان العقار (عربي)' : 'Property Title (Arabic)'}
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            dir="rtl"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {language === 'ar' ? 'عنوان العقار (إنجليزي)' : 'Property Title (English)'}
          </label>
          <input
            type="text"
            name="titleEn"
            value={formData.titleEn}
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

        {/* Price and Area */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {language === 'ar' ? 'السعر (جنيه)' : 'Price (EGP)'}
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {language === 'ar' ? 'المساحة (م²)' : 'Area (m²)'}
          </label>
          <input
            type="number"
            name="area"
            value={formData.area}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            min="0"
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

        {/* Features */}
        <div className="col-span-2">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {language === 'ar' ? 'المميزات' : 'Features'}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {language === 'ar' ? 'عدد الغرف' : 'Bedrooms'}
              </label>
              <input
                type="number"
                name="features.bedrooms"
                value={formData.features.bedrooms}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {language === 'ar' ? 'عدد الحمامات' : 'Bathrooms'}
              </label>
              <input
                type="number"
                name="features.bathrooms"
                value={formData.features.bathrooms}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                min="0"
              />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <label className="flex items-center space-x-2 space-x-reverse">
              <input
                type="checkbox"
                checked={formData.features.hasPool}
                onChange={() => handleCheckboxChange('hasPool')}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">
                {language === 'ar' ? 'مسبح' : 'Swimming Pool'}
              </span>
            </label>
            <label className="flex items-center space-x-2 space-x-reverse">
              <input
                type="checkbox"
                checked={formData.features.hasGarden}
                onChange={() => handleCheckboxChange('hasGarden')}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">
                {language === 'ar' ? 'حديقة' : 'Garden'}
              </span>
            </label>
            <label className="flex items-center space-x-2 space-x-reverse">
              <input
                type="checkbox"
                checked={formData.features.hasElevator}
                onChange={() => handleCheckboxChange('hasElevator')}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">
                {language === 'ar' ? 'مصعد' : 'Elevator'}
              </span>
            </label>
            <label className="flex items-center space-x-2 space-x-reverse">
              <input
                type="checkbox"
                checked={formData.features.isFurnished}
                onChange={() => handleCheckboxChange('isFurnished')}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">
                {language === 'ar' ? 'مفروش' : 'Furnished'}
              </span>
            </label>
          </div>
        </div>

        {/* Images */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            {language === 'ar' ? 'صور العقار' : 'Property Images'}
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="images"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                >
                  <span>{language === 'ar' ? 'اختر صور العقار' : 'Upload Images'}</span>
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

        {/* Owner Information */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {language === 'ar' ? 'اسم المالك (عربي)' : 'Owner Name (Arabic)'}
          </label>
          <input
            type="text"
            name="owner.name"
            value={formData.owner.name}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            dir="rtl"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {language === 'ar' ? 'اسم المالك (إنجليزي)' : 'Owner Name (English)'}
          </label>
          <input
            type="text"
            name="owner.nameEn"
            value={formData.owner.nameEn}
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
            name="owner.phone"
            value={formData.owner.phone}
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
            name="owner.email"
            value={formData.owner.email}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            dir="ltr"
          />
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
          {property 
            ? (language === 'ar' ? 'تحديث' : 'Update')
            : (language === 'ar' ? 'إضافة' : 'Add')}
        </button>
      </div>
    </form>
  );
};

export default PropertyForm;