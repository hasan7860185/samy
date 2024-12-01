import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, TranslationKey } from '../i18n/translations';

export type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  dir: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'ar';
  });

  const t = (key: TranslationKey): string => {
    return translations[language][key] || key;
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    localStorage.setItem('language', language);
    document.dir = dir;
    document.documentElement.lang = language;
    document.documentElement.className = language === 'ar' ? 'rtl' : 'ltr';
    
    // Update font family based on language
    document.documentElement.style.setProperty(
      '--font-family',
      language === 'ar' ? 'var(--font-family-ar)' : 'var(--font-family-en)'
    );

    // Force re-render of components that depend on direction
    window.dispatchEvent(new Event('languagechange'));
  }, [language, dir]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};