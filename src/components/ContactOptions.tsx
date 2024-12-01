import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';

interface ContactOptionsProps {
  phone: string;
  facebookId?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const ContactOptions: React.FC<ContactOptionsProps> = ({
  phone,
  facebookId,
  onMouseEnter,
  onMouseLeave,
}) => {
  const handleWhatsAppClick = () => {
    // Remove any non-numeric characters
    const formattedPhone = phone.replace(/\D/g, '');
    // Use the phone number as is, since country code is already included
    const whatsappUrl = `https://wa.me/${formattedPhone}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleMessengerClick = () => {
    if (facebookId) {
      window.open(`https://m.me/${facebookId}`, '_blank');
    }
  };

  const handleTrueCallerClick = () => {
    // Remove any non-numeric characters
    const formattedPhone = phone.replace(/\D/g, '');
    window.open(`https://www.truecaller.com/search/sa/${formattedPhone}`, '_blank');
  };

  return (
    <div 
      className="absolute z-50 bg-white shadow-lg rounded-lg py-2 px-3 flex gap-2 right-full top-0 -translate-x-2"
      style={{ minWidth: '120px' }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button
        onClick={handleWhatsAppClick}
        className="p-2 rounded-full bg-green-500 hover:bg-green-600 text-white transition-colors duration-200"
        title="WhatsApp"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </button>
      {facebookId && (
        <button
          onClick={handleMessengerClick}
          className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200"
          title="Messenger"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.908 1.438 5.504 3.686 7.205V22l3.345-1.803c.93.258 1.922.397 2.969.397 5.523 0 10-4.145 10-9.243C22 6.145 17.523 2 12 2zm1.093 12.405l-2.49-2.66-4.85 2.66 5.325-5.664 2.49 2.66 4.85-2.66-5.325 5.664z"/>
          </svg>
        </button>
      )}
      <button
        onClick={handleTrueCallerClick}
        className="p-2 rounded-full bg-purple-500 hover:bg-purple-600 text-white transition-colors duration-200"
        title="Truecaller"
      >
        <Phone className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ContactOptions;