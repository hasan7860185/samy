import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Property } from '../../types';
import { Link } from 'react-router-dom';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { language } = useLanguage();

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <img src={property.media.images[0]} alt={property.title} className="rounded-lg w-full h-40 object-cover mb-4" />
      <h3 className="text-lg font-semibold text-gray-800">{language === 'ar' ? property.title : property.titleEn}</h3>
      <p className="text-gray-600">
        {language === 'ar' ? property.description : property.descriptionEn}
      </p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-gray-800 font-semibold">{`${property.price} ${property.priceCurrency}`}</span>
        <Link to={`/properties/${property.id}`} className="text-blue-500 hover:underline">{language === 'ar' ? 'عرض التفاصيل' : 'View Details'}</Link>
      </div>
    </div>
  );
};

export default PropertyCard;
