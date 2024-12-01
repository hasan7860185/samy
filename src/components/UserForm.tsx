import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { Camera, X, User as UserIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface UserFormProps {
  user?: User;
  onSubmit: (data: Partial<User>) => void;
  onCancel: () => void;
  isNewUser?: boolean;
}

const getRoleOptions = (language: string): { value: UserRole; label: string }[] => [
  { value: 'admin', label: language === 'ar' ? 'مشرف' : 'Admin' },
  { value: 'employee', label: language === 'ar' ? 'موظف' : 'Employee' },
  { value: 'sales_manager', label: language === 'ar' ? 'مدير مبيعات' : 'Sales Manager' },
];

const UserForm: React.FC<UserFormProps> = ({
  user,
  onSubmit,
  onCancel,
  isNewUser = false,
}) => {
  const { language } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState<string | undefined>(user?.avatar);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    fullName: user?.fullName || '',
    phone: user?.phone || '',
    department: user?.department || '',
    role: user?.role || 'employee',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (isNewUser && formData.password !== formData.confirmPassword) {
      alert(language === 'ar' ? 'كلمات المرور غير متطابقة' : 'Passwords do not match');
      return;
    }

    const data: Partial<User> = {
      username: formData.username,
      email: formData.email,
      fullName: formData.fullName,
      role: formData.role as UserRole,
      phone: formData.phone,
      department: formData.department,
      avatar: avatar,
    };

    if (isNewUser || formData.password) {
      data.password = formData.password;
    }

    onSubmit(data);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert(language === 'ar' 
          ? 'حجم الصورة يجب أن يكون أقل من 5 ميجابايت'
          : 'Image size must be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeAvatar = () => {
    setAvatar(undefined);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Avatar Upload */}
      <div className="flex justify-center">
        <div className="relative">
          <div className="w-32 h-32 rounded-full border-4 border-white bg-white overflow-hidden shadow-md">
            {avatar ? (
              <div className="relative group">
                <img
                  src={avatar}
                  alt={language === 'ar' ? 'صورة المستخدم' : 'User Avatar'}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={removeAvatar}
                  className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <UserIcon className="w-12 h-12 text-gray-400" />
              </div>
            )}
          </div>
          <label className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg cursor-pointer">
            <Camera className="w-5 h-5 text-gray-600" />
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            {language === 'ar' ? 'اسم المستخدم' : 'Username'}
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
            {language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
          </label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            dir="ltr"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            dir="ltr"
          />
        </div>

        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700">
            {language === 'ar' ? 'القسم' : 'Department'}
          </label>
          <input
            type="text"
            name="department"
            id="department"
            value={formData.department}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            {language === 'ar' ? 'الدور' : 'Role'}
          </label>
          <select
            name="role"
            id="role"
            value={formData.role}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {getRoleOptions(language).map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            {language === 'ar' 
              ? `كلمة المرور ${!isNewUser ? '(اتركها فارغة إذا لم ترد تغييرها)' : ''}`
              : `Password ${!isNewUser ? '(leave empty if no change needed)' : ''}`}
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              required={isNewUser}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
            >
              {showPassword 
                ? (language === 'ar' ? 'إخفاء' : 'Hide')
                : (language === 'ar' ? 'إظهار' : 'Show')}
            </button>
          </div>
        </div>

        {isNewUser && (
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              {language === 'ar' ? 'تأكيد كلمة المرور' : 'Confirm Password'}
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        )}
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          {language === 'ar' ? 'إلغاء' : 'Cancel'}
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          {isNewUser 
            ? (language === 'ar' ? 'إضافة' : 'Add')
            : (language === 'ar' ? 'تحديث' : 'Update')}
        </button>
      </div>
    </form>
  );
};

export default UserForm;