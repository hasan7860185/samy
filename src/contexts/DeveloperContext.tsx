import React, { createContext, useContext, useState, useEffect } from 'react';
import { Developer } from '../types/developer';
import { db } from '../services/db';

interface DeveloperContextType {
  developers: Developer[];
  addDeveloper: (developer: Developer) => Promise<void>;
  updateDeveloper: (id: string, developer: Partial<Developer>) => Promise<void>;
  deleteDeveloper: (id: string) => Promise<void>;
  getDeveloper: (id: string) => Developer | undefined;
  isLoading: boolean;
}

const DeveloperContext = createContext<DeveloperContextType | undefined>(undefined);

export const DeveloperProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDevelopers = async () => {
      try {
        const loadedDevelopers = await db.developers.toArray();
        setDevelopers(loadedDevelopers);
      } catch (error) {
        console.error('Error loading developers:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDevelopers();
  }, []);

  const addDeveloper = async (developer: Developer) => {
    try {
      const id = await db.developers.add(developer);
      const newDeveloper = { ...developer, id: id.toString() };
      setDevelopers(prev => [...prev, newDeveloper]);
    } catch (error) {
      console.error('Error adding developer:', error);
      throw error;
    }
  };

  const updateDeveloper = async (id: string, updatedData: Partial<Developer>) => {
    try {
      await db.developers.update(id, {
        ...updatedData,
        updatedAt: new Date().toISOString()
      });
      
      setDevelopers(prev =>
        prev.map(dev =>
          dev.id === id
            ? { ...dev, ...updatedData, updatedAt: new Date().toISOString() }
            : dev
        )
      );
    } catch (error) {
      console.error('Error updating developer:', error);
      throw error;
    }
  };

  const deleteDeveloper = async (id: string) => {
    try {
      await db.developers.delete(id);
      setDevelopers(prev => prev.filter(dev => dev.id !== id));
    } catch (error) {
      console.error('Error deleting developer:', error);
      throw error;
    }
  };

  const getDeveloper = (id: string) => {
    return developers.find(dev => dev.id === id);
  };

  return (
    <DeveloperContext.Provider
      value={{
        developers,
        addDeveloper,
        updateDeveloper,
        deleteDeveloper,
        getDeveloper,
        isLoading,
      }}
    >
      {children}
    </DeveloperContext.Provider>
  );
};

export const useDevelopers = () => {
  const context = useContext(DeveloperContext);
  if (context === undefined) {
    throw new Error('useDevelopers must be used within a DeveloperProvider');
  }
  return context;
};