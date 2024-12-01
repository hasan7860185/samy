import React, { createContext, useContext, useState, useEffect } from 'react';
import { Client } from '../types';
import { db } from '../services/db';

interface ClientContextType {
  clients: Client[];
  addClient: (client: Client) => Promise<void>;
  updateClient: (id: string, client: Partial<Client>) => Promise<void>;
  deleteClient: (id: string) => Promise<void>;
  getClientsByStatus: (status: string) => Client[];
  isLoading: boolean;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export const ClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load clients from database on mount
  useEffect(() => {
    const loadClients = async () => {
      try {
        const loadedClients = await db.clients.toArray();
        setClients(loadedClients);
      } catch (error) {
        console.error('Error loading clients:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadClients();
  }, []);

  const addClient = async (client: Client) => {
    try {
      const id = await db.clients.add(client);
      const newClient = { ...client, id: id.toString() };
      setClients(prev => [...prev, newClient]);
    } catch (error) {
      console.error('Error adding client:', error);
      throw error;
    }
  };

  const updateClient = async (id: string, updatedData: Partial<Client>) => {
    try {
      await db.clients.update(id, updatedData);
      setClients(prev =>
        prev.map(client =>
          client.id === id ? { ...client, ...updatedData } : client
        )
      );
    } catch (error) {
      console.error('Error updating client:', error);
      throw error;
    }
  };

  const deleteClient = async (id: string) => {
    try {
      await db.clients.delete(id);
      setClients(prev => prev.filter(client => client.id !== id));
    } catch (error) {
      console.error('Error deleting client:', error);
      throw error;
    }
  };

  const getClientsByStatus = (status: string) => {
    return clients.filter(client => client.status === status);
  };

  return (
    <ClientContext.Provider
      value={{
        clients,
        addClient,
        updateClient,
        deleteClient,
        getClientsByStatus,
        isLoading,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};

export const useClients = () => {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error('useClients must be used within a ClientProvider');
  }
  return context;
};