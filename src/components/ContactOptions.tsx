import React from 'react';
import { Phone, Mail } from 'lucide-react';
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
  onMouseLeave
}) => {
  const { t } = useLanguage();

  return (
    <div 
      className="absolute z-10 bg-white shadow-lg rounded-lg p-4 -right-2 top-6"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex flex-col space-y-3">
        <a 
          href={`tel:${phone}`}
          className="flex items-center text-gray-700 hover:text-blue-600"
        >
          <Phone className="w-4 h-4 mr-2" />
          <span>{phone}</span>
        </a>
        {facebookId && (
          <a 
            href={`https://facebook.com/${facebookId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-gray-700 hover:text-blue-600"
          >
            <Mail className="w-4 h-4 mr-2" />
            <span>{facebookId}</span>
          </a>
        )}
      </div>
    </div>
  );
};

export default ContactOptions;