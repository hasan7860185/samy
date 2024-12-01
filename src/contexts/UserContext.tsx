import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserAction } from '../types/user';

interface UserContextType {
  user: UserProfile | null;
  users: UserProfile[];
  updateUser: (data: Partial<UserProfile>) => void;
  isLoading: boolean;
  recordAction: (action: Omit<UserAction, 'id'>) => void;
  getTopPerformers: (timeRange: 'daily' | 'weekly' | 'monthly') => UserProfile[];
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const defaultUsers: UserProfile[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    fullName: 'مدير النظام',
    role: 'admin',
    phone: '0501234567',
    department: 'الإدارة',
    joinDate: '2024-01-01',
    lastActive: '2024-03-21',
    theme: 'light',
    language: 'ar',
    notifications: {
      email: true,
      browser: true,
      mobile: true,
    },
    performance: {
      actions: 1071,
      rating: 5,
      lastUpdated: new Date().toISOString(),
    },
  },
  {
    id: '2',
    username: 'shereen',
    email: 'shereen@example.com',
    fullName: 'شيرين تامر',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&q=80',
    role: 'sales_manager',
    department: 'المبيعات',
    joinDate: '2024-01-15',
    lastActive: '2024-03-21',
    theme: 'light',
    language: 'ar',
    notifications: {
      email: true,
      browser: true,
      mobile: true,
    },
    performance: {
      actions: 949,
      rating: 4,
      lastUpdated: new Date().toISOString(),
    },
  },
  {
    id: '3',
    username: 'kamal',
    email: 'kamal@example.com',
    fullName: 'كمال خالد',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&q=80',
    role: 'employee',
    department: 'المبيعات',
    joinDate: '2024-02-01',
    lastActive: '2024-03-21',
    theme: 'light',
    language: 'ar',
    notifications: {
      email: true,
      browser: true,
      mobile: true,
    },
    performance: {
      actions: 747,
      rating: 3,
      lastUpdated: new Date().toISOString(),
    },
  },
];

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userActions, setUserActions] = useState<UserAction[]>([]);

  useEffect(() => {
    // Load users and actions from storage
    const savedUsers = localStorage.getItem('users');
    const savedActions = localStorage.getItem('userActions');
    
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      setUsers(defaultUsers);
      localStorage.setItem('users', JSON.stringify(defaultUsers));
    }

    if (savedActions) {
      setUserActions(JSON.parse(savedActions));
    }

    // Set default admin user as current user
    setUser(defaultUsers[0]);
    setIsLoading(false);
  }, []);

  const updateUser = (data: Partial<UserProfile>) => {
    setUsers(prevUsers => {
      const updatedUsers = prevUsers.map(u => 
        u.id === data.id ? { ...u, ...data } : u
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      return updatedUsers;
    });

    if (user && data.id === user.id) {
      setUser(prev => prev ? { ...prev, ...data } : prev);
    }
  };

  const recordAction = (action: Omit<UserAction, 'id'>) => {
    const newAction: UserAction = {
      ...action,
      id: `action-${Date.now()}`,
    };

    setUserActions(prev => {
      const updated = [...prev, newAction];
      localStorage.setItem('userActions', JSON.stringify(updated));
      return updated;
    });

    // Update user performance
    const actionDate = new Date(action.timestamp);
    const now = new Date();
    
    setUsers(prevUsers => {
      const updatedUsers = prevUsers.map(u => {
        if (u.id === action.userId) {
          const currentActions = u.performance?.actions || 0;
          return {
            ...u,
            performance: {
              actions: currentActions + 1,
              rating: calculateRating(currentActions + 1),
              lastUpdated: now.toISOString(),
            },
          };
        }
        return u;
      });
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      return updatedUsers;
    });
  };

  const calculateRating = (actions: number): number => {
    if (actions >= 1000) return 5;
    if (actions >= 800) return 4;
    if (actions >= 600) return 3;
    if (actions >= 400) return 2;
    return 1;
  };

  const getTopPerformers = (timeRange: 'daily' | 'weekly' | 'monthly'): UserProfile[] => {
    const now = new Date();
    const ranges = {
      daily: 1,
      weekly: 7,
      monthly: 30,
    };

    const filteredUsers = users.filter(u => {
      if (!u.performance?.lastUpdated) return false;
      const lastUpdate = new Date(u.performance.lastUpdated);
      const diffDays = Math.floor((now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24));
      return diffDays <= ranges[timeRange];
    });

    return filteredUsers
      .sort((a, b) => (b.performance?.actions || 0) - (a.performance?.actions || 0))
      .slice(0, 4);
  };

  return (
    <UserContext.Provider value={{
      user,
      users,
      updateUser,
      isLoading,
      recordAction,
      getTopPerformers,
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};