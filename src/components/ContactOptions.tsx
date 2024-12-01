import React from 'react';
import { Phone, Facebook } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ContactOptionsProps {
  phone: string;
  facebookId?: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const ContactOptions: React.FC<ContactOptionsProps> = ({
  phone,
  facebookId,
  onMouseEnter,
  onMouseLeave,
}) => {
  const { language } = useLanguage();

  return (
    <div
      className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="py-1">
        <a
          href={`tel:${phone}`}
          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <Phone className="w-4 h-4 mr-3" />
          <span>{language === 'ar' ? 'اتصال' : 'Call'}</span>
        </a>
        {facebookId && (
          <a
            href={`https://facebook.com/${facebookId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <Facebook className="w-4 h-4 mr-3" />
            <span>{language === 'ar' ? 'فيسبوك' : 'Facebook'}</span>
          </a>
        )}
      </div>
    </div>
  );
};

export default ContactOptions;