import React from 'react';
import { Property } from '../../types/property';
import { Building2, MapPin, Ruler, BedDouble, Bath, Car } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Link } from 'react-router-dom';

interface PropertyCardProps {
  property: Property;
  onEdit: (property: Property) => void;
  onDelete: (property: Property) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onEdit,
  onDelete,
}) => {
  const { t, language } = useLanguage();

  const formatPrice = (price: number) => {
    return language === 'ar' 
      ? `${price.toLocaleString('ar-EG')} جنيه`
      : `EGP ${price.toLocaleString('en-US')}`;
  };

  const getTitle = () => language === 'ar' ? property.title : property.titleEn;
  const getLocation = () => {
    const city = language === 'ar' ? property.location.city : property.location.cityEn;
    const district = language === 'ar' ? property.location.district : property.location.districtEn;
    return `${city}, ${district}`;
  };

  const statusLabels = {
    available: language === 'ar' ? 'متاح' : 'Available',
    sold: language === 'ar' ? 'تم البيع' : 'Sold',
    rented: language === 'ar' ? 'مؤجر' : 'Rented',
    under_contract: language === 'ar' ? 'تحت التعاقد' : 'Under Contract',
    maintenance: language === 'ar' ? 'صيانة' : 'Maintenance',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="relative">
        <img
          src={property.media.images[0]}
          alt={getTitle()}
          className="w-full h-48 object-cover"
        />
        <span className={`absolute top-4 ${language === 'ar' ? 'right-4' : 'left-4'} px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800`}>
          {statusLabels[property.status]}
        </span>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {getTitle()}
        </h3>

        <div className="flex items-center text-gray-500 mb-4">
          <MapPin className="w-4 h-4 ml-1" />
          <span className="text-sm">{getLocation()}</span>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex items-center">
            <Ruler className="w-4 h-4 ml-1" />
            <span className="text-sm text-gray-600">
              {property.area} {language === 'ar' ? 'م²' : 'm²'}
            </span>
          </div>
          {property.features.bedrooms && (
            <div className="flex items-center">
              <BedDouble className="w-4 h-4 ml-1" />
              <span className="text-sm text-gray-600">
                {property.features.bedrooms} {language === 'ar' ? 'غرف' : 'Rooms'}
              </span>
            </div>
          )}
          {property.features.bathrooms && (
            <div className="flex items-center">
              <Bath className="w-4 h-4 ml-1" />
              <span className="text-sm text-gray-600">
                {property.features.bathrooms} {language === 'ar' ? 'حمامات' : 'Baths'}
              </span>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-blue-600">
            {formatPrice(property.price)}
          </span>
          <div className="flex space-x-2 space-x-reverse">
            <Link
              to={`/properties/${property.id}`}
              className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-md"
            >
              {t('view')}
            </Link>
            <button
              onClick={() => onEdit(property)}
              className="px-3 py-1 text-sm text-yellow-600 hover:bg-yellow-50 rounded-md"
            >
              {t('edit')}
            </button>
            <button
              onClick={() => onDelete(property)}
              className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-md"
            >
              {t('delete')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;