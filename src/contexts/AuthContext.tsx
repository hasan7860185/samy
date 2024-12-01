import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../services/db/instance';
import { DataSync } from '../services/sync';
import { UserProfile } from '../types/user';
import { initializeAuth } from '../services/auth/initialize';
import { storeAuthData, clearAuthData, getStoredUser } from '../services/auth/storage';
import { AuthError } from '../services/auth/errors';

interface AuthContextType {
  user: UserProfile | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      try {
        await initializeAuth();
        
        const storedUser = getStoredUser();
        if (storedUser) {
          setUser(storedUser);
          setIsAuthenticated(true);

          try {
            // Sync user data from cloud
            const userData = await DataSync.syncFromCloud('users', storedUser);
            if (userData && userData.length > 0) {
              await db.users.bulkPut(userData);
            }
          } catch (error) {
            console.warn('Initial sync failed:', error);
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const validatedUser = await db.validateUser(username, password);
      
      if (!validatedUser) {
        throw new AuthError('اسم المستخدم أو كلمة المرور غير صحيحة');
      }

      storeAuthData(validatedUser);
      setUser(validatedUser);
      setIsAuthenticated(true);

      try {
        // Sync user data after login
        const userData = await DataSync.syncFromCloud('users');
        if (userData && userData.length > 0) {
          await db.users.bulkPut(userData);
        }
      } catch (error) {
        console.warn('Login sync failed:', error);
      }

      navigate('/');

    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      if (user) {
        try {
          // Sync any pending changes before logout
          await DataSync.syncToCloud('users', user);
        } catch (error) {
          console.warn('Logout sync failed:', error);
        }
      }
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      clearAuthData();
      navigate('/login');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};