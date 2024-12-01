import React from 'react';
import { Search } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const { language } = useLanguage();

  return (
    <div className="relative">
      <input
        type="text"
        placeholder={
          language === 'ar'
            ? 'البحث عن عميل، رقم هاتف، عقار...'
            : 'Search for client, phone number, property...'
        }
        className="w-[400px] pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        onChange={(e) => onSearch(e.target.value)}
      />
      <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
    </div>
  );
};

export default SearchBar;