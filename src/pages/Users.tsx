import React, { useState } from 'react';
import { UserProfile } from '../types/user';
import UserList from '../components/UserList';
import UserForm from '../components/UserForm';
import { UserPlus } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { db } from '../services/db/instance';
import bcrypt from 'bcryptjs';

const Users = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserProfile | undefined>();
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);

  // Load users on mount
  React.useEffect(() => {
    const loadUsers = async () => {
      try {
        const loadedUsers = await db.users.toArray();
        setUsers(loadedUsers);
      } catch (error) {
        console.error('Error loading users:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadUsers();
  }, []);

  const handleView = (user: UserProfile) => {
    console.log('View user:', user);
  };

  const handleEdit = (user: UserProfile) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  const handleDelete = async (user: UserProfile) => {
    if (user.role === 'admin') {
      alert(language === 'ar' 
        ? 'لا يمكن حذف المدير'
        : 'Cannot delete admin user');
      return;
    }

    if (window.confirm(language === 'ar' 
      ? 'هل أنت متأكد من حذف هذا المستخدم؟' 
      : 'Are you sure you want to delete this user?')) {
      try {
        await db.users.delete(user.id);
        setUsers(users.filter(u => u.id !== user.id));
      } catch (error) {
        console.error('Error deleting user:', error);
        alert(language === 'ar'
          ? 'حدث خطأ أثناء حذف المستخدم'
          : 'Error deleting user');
      }
    }
  };

  const handleSubmit = async (data: Partial<UserProfile>) => {
    try {
      if (selectedUser) {
        // Update existing user
        const updatedUser = {
          ...selectedUser,
          ...data,
          updatedAt: new Date().toISOString()
        };
        
        // If password was changed, hash it
        if (data.password) {
          updatedUser.password = await bcrypt.hash(data.password, 10);
        }
        
        await db.users.update(selectedUser.id, updatedUser);
        setUsers(users.map(user => 
          user.id === selectedUser.id ? updatedUser : user
        ));
      } else {
        // Add new user
        const hashedPassword = await bcrypt.hash(data.password!, 10);
        const newUser: UserProfile = {
          id: `user-${Date.now()}`,
          ...data as UserProfile,
          password: hashedPassword,
          joinDate: new Date().toISOString(),
          lastActive: new Date().toISOString(),
          theme: 'light',
          language: 'ar',
          notifications: {
            email: true,
            browser: true,
            mobile: true
          }
        };
        
        const id = await db.users.add(newUser);
        setUsers([...users, { ...newUser, id: id.toString() }]);
      }
      
      setShowForm(false);
      setSelectedUser(undefined);
      
    } catch (error) {
      console.error('Error saving user:', error);
      alert(language === 'ar'
        ? 'حدث خطأ أثناء حفظ المستخدم'
        : 'Error saving user');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">
          {language === 'ar' ? 'المستخدمون' : 'Users'}
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <UserPlus className="w-5 h-5" />
          {language === 'ar' ? 'إضافة مستخدم' : 'Add User'}
        </button>
      </div>

      {showForm ? (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {selectedUser 
              ? (language === 'ar' ? 'تعديل مستخدم' : 'Edit User')
              : (language === 'ar' ? 'إضافة مستخدم جديد' : 'Add New User')}
          </h2>
          <UserForm
            user={selectedUser}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setSelectedUser(undefined);
            }}
            isNewUser={!selectedUser}
          />
        </div>
      ) : (
        <UserList
          users={users}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Users;