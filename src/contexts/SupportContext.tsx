import React, { createContext, useContext, useState, useEffect } from 'react';

interface SupportSettings {
  phone: string;
  email: string;
  workingHours: {
    ar: string;
    en: string;
  };
  responseTime: {
    ar: string;
    en: string;
  };
}

interface SupportContextType {
  settings: SupportSettings;
  updateSettings: (newSettings: Partial<SupportSettings>) => void;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

const defaultSettings: SupportSettings = {
  phone: '+966 50 123 4567',
  email: 'support@example.com',
  workingHours: {
    ar: 'متاح من 9 صباحاً - 5 مساءً',
    en: 'Available 9 AM - 5 PM',
  },
  responseTime: {
    ar: 'نرد خلال 24 ساعة',
    en: 'We respond within 24 hours',
  },
};

const SupportContext = createContext<SupportContextType | undefined>(undefined);

export const SupportProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SupportSettings>(defaultSettings);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const savedSettings = localStorage.getItem('supportSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const updateSettings = (newSettings: Partial<SupportSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem('supportSettings', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <SupportContext.Provider value={{ settings, updateSettings, isEditing, setIsEditing }}>
      {children}
    </SupportContext.Provider>
  );
};

export const useSupport = () => {
  const context = useContext(SupportContext);
  if (context === undefined) {
    throw new Error('useSupport must be used within a SupportProvider');
  }
  return context;
};