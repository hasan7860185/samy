import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Building2, MapPin, Ruler, BedDouble, Bath, Car, ArrowLeft, Edit } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();

  // TODO: Replace with actual property data fetching
  const property = {
    id: '1',
    title: 'فيلا فاخرة في حي النرجس',
    titleEn: 'Luxury Villa in Al Narjis District',
    description: 'فيلا حديثة مع حديقة خاصة ومسبح',
    descriptionEn: 'Modern villa with private garden and pool',
    type: 'villa',
    status: 'available',
    price: 2500000,
    area: 450,
    location: {
      city: 'الرياض',
      cityEn: 'Riyadh',
      district: 'النرجس',
      districtEn: 'Al Narjis',
      address: 'شارع الأمير سعد',
      addressEn: 'Prince Saad Street',
    },
    features: {
      bedrooms: 5,
      bathrooms: 6,
      parkingSpaces: 2,
      yearBuilt: 2023,
      hasPool: true,
      hasGarden: true,
      hasElevator: true,
      isFurnished: false,
    },
    media: {
      images: [
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
      ],
    },
  };

  if (!property) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {language === 'ar' 
            ? 'لم يتم العثور على العقار'
            : 'Property Not Found'}
        </h2>
        <button
          onClick={() => navigate('/properties')}
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/properties')}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5 ml-2" />
          <span>
            {language === 'ar' ? 'العودة إلى القائمة' : 'Back to List'}
          </span>
        </button>
        <button
          onClick={() => navigate(`/properties/${id}/edit`)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          <Edit className="w-4 h-4" />
          {language === 'ar' ? 'تعديل' : 'Edit'}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Property Images */}
        <div className="relative h-96">
          <img
            src={property.media.images[0]}
            alt={language === 'ar' ? property.title : property.titleEn}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Property Information */}
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {language === 'ar' ? property.title : property.titleEn}
          </h1>
          
          <div className="flex items-center text-gray-500 mb-6">
            <MapPin className="w-5 h-5 ml-2" />
            <span>
              {language === 'ar'
                ? `${property.location.city}، ${property.location.district}`
                : `${property.location.cityEn}, ${property.location.districtEn}`}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="flex items-center">
              <Ruler className="w-5 h-5 ml-2 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">
                  {language === 'ar' ? 'المساحة' : 'Area'}
                </p>
                <p className="font-semibold">
                  {property.area} {language === 'ar' ? 'م²' : 'm²'}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <BedDouble className="w-5 h-5 ml-2 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">
                  {language === 'ar' ? 'غرف النوم' : 'Bedrooms'}
                </p>
                <p className="font-semibold">{property.features.bedrooms}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Bath className="w-5 h-5 ml-2 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">
                  {language === 'ar' ? 'الحمامات' : 'Bathrooms'}
                </p>
                <p className="font-semibold">{property.features.bathrooms}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Car className="w-5 h-5 ml-2 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">
                  {language === 'ar' ? 'مواقف السيارات' : 'Parking'}
                </p>
                <p className="font-semibold">{property.features.parkingSpaces}</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {language === 'ar' ? 'وصف العقار' : 'Property Description'}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {language === 'ar' ? property.description : property.descriptionEn}
            </p>
          </div>

          <div className="border-t pt-8 mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {language === 'ar' ? 'المميزات' : 'Features'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {property.features.hasPool && (
                <div className="flex items-center text-gray-600">
                  <span className="w-2 h-2 bg-blue-500 rounded-full ml-2"></span>
                  {language === 'ar' ? 'مسبح' : 'Swimming Pool'}
                </div>
              )}
              {property.features.hasGarden && (
                <div className="flex items-center text-gray-600">
                  <span className="w-2 h-2 bg-blue-500 rounded-full ml-2"></span>
                  {language === 'ar' ? 'حديقة' : 'Garden'}
                </div>
              )}
              {property.features.hasElevator && (
                <div className="flex items-center text-gray-600">
                  <span className="w-2 h-2 bg-blue-500 rounded-full ml-2"></span>
                  {language === 'ar' ? 'مصعد' : 'Elevator'}
                </div>
              )}
              {property.features.isFurnished && (
                <div className="flex items-center text-gray-600">
                  <span className="w-2 h-2 bg-blue-500 rounded-full ml-2"></span>
                  {language === 'ar' ? 'مفروش' : 'Furnished'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;