import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const ContactOptions = () => {
  const { t } = useLanguage();

  return (
    <div className="flex space-x-4">
      <div className="flex items-center">
        <Phone className="w-6 h-6 text-gray-500" />
        <span className="ml-2">{t('contactPhone')}</span>
      </div>
      <div className="flex items-center">
        <Mail className="w-6 h-6 text-gray-500" />
        <span className="ml-2">{t('contactEmail')}</span>
      </div>
    </div>
  );
};

export default ContactOptions;
