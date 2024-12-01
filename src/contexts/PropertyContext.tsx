import React, { createContext, useContext, useState, useEffect } from 'react';
import { Property } from '../types/property';
import { db } from '../services/db';

interface PropertyContextType {
  properties: Property[];
  addProperty: (property: Property) => Promise<void>;
  updateProperty: (id: string, property: Partial<Property>) => Promise<void>;
  deleteProperty: (id: string) => Promise<void>;
  getProperty: (id: string) => Property | undefined;
  isLoading: boolean;
  error: string | null;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Initialize database if needed
        await db.initialize();
        
        // Load properties
        const loadedProperties = await db.properties.toArray();
        setProperties(loadedProperties);
      } catch (error) {
        console.error('Error loading properties:', error);
        setError('Failed to load properties');
      } finally {
        setIsLoading(false);
      }
    };

    loadProperties();
  }, []);

  const addProperty = async (property: Property) => {
    try {
      setError(null);
      const newProperty = {
        ...property,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const id = await db.properties.add(newProperty);
      setProperties(prev => [...prev, { ...newProperty, id: id.toString() }]);
    } catch (error) {
      console.error('Error adding property:', error);
      setError('Failed to add property');
      throw error;
    }
  };

  const updateProperty = async (id: string, updatedData: Partial<Property>) => {
    try {
      setError(null);
      const propertyToUpdate = {
        ...updatedData,
        updatedAt: new Date().toISOString(),
      };
      await db.properties.update(id, propertyToUpdate);
      setProperties(prev =>
        prev.map(property =>
          property.id === id ? { ...property, ...propertyToUpdate } : property
        )
      );
    } catch (error) {
      console.error('Error updating property:', error);
      setError('Failed to update property');
      throw error;
    }
  };

  const deleteProperty = async (id: string) => {
    try {
      setError(null);
      await db.properties.delete(id);
      setProperties(prev => prev.filter(property => property.id !== id));
    } catch (error) {
      console.error('Error deleting property:', error);
      setError('Failed to delete property');
      throw error;
    }
  };

  const getProperty = (id: string) => {
    return properties.find(property => property.id === id);
  };

  return (
    <PropertyContext.Provider
      value={{
        properties,
        addProperty,
        updateProperty,
        deleteProperty,
        getProperty,
        isLoading,
        error,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperties = () => {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error('useProperties must be used within a PropertyProvider');
  }
  return context;
};