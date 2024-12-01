import React, { useState } from 'react';
import { Camera, Mail, Phone, Building, Calendar, X } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { useLanguage } from '../contexts/LanguageContext';

const Profile = () => {
  const { user, updateUser, isLoading } = useUser();
  const { language } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(user);

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert(language === 'ar' 
          ? 'حجم الصورة يجب أن يكون أقل من 5 ميجابايت'
          : 'Image size must be less than 5MB'
        );
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProfile({ ...editedProfile!, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field: keyof typeof user, value: string) => {
    setEditedProfile({ ...editedProfile!, [field]: value });
  };

  const handleSave = () => {
    updateUser(editedProfile!);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(user);
    setIsEditing(false);
  };

  const removeAvatar = () => {
    setEditedProfile({ ...editedProfile!, avatar: undefined });
  };

  const getRoleLabel = (role: string) => {
    const roles = {
      admin: { ar: 'مدير النظام', en: 'System Admin' },
      employee: { ar: 'موظف', en: 'Employee' },
      sales_manager: { ar: 'مدير مبيعات', en: 'Sales Manager' }
    };
    return language === 'ar' ? roles[role as keyof typeof roles].ar : roles[role as keyof typeof roles].en;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header */}
        <div className="relative h-48 bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-lg">
          <div className="absolute -bottom-16 right-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-white bg-white overflow-hidden">
                {editedProfile?.avatar ? (
                  <div className="relative group">
                    <img
                      src={editedProfile.avatar}
                      alt={editedProfile.fullName}
                      className="w-full h-full object-cover"
                    />
                    {isEditing && (
                      <button
                        onClick={removeAvatar}
                        className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center text-4xl font-semibold text-gray-400">
                    {editedProfile?.fullName[0]}
                  </div>
                )}
              </div>
              {isEditing && (
                <label className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg cursor-pointer">
                  <Camera className="w-5 h-5 text-gray-600" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="pt-20 px-8 pb-8">
          <div className="flex justify-between items-start">
            <div>
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile?.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="text-2xl font-bold text-gray-900 border-b-2 border-blue-500 focus:outline-none"
                />
              ) : (
                <h1 className="text-2xl font-bold text-gray-900">{user.fullName}</h1>
              )}
              <p className="text-gray-500">{getRoleLabel(user.role)}</p>
            </div>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    {language === 'ar' ? 'إلغاء' : 'Cancel'}
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    {language === 'ar' ? 'حفظ التغييرات' : 'Save Changes'}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  {language === 'ar' ? 'تعديل الملف الشخصي' : 'Edit Profile'}
                </button>
              )}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 space-x-reverse">
                <Mail className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">
                    {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                  </p>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editedProfile?.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full text-gray-900 border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                      dir="ltr"
                    />
                  ) : (
                    <p className="text-gray-900" dir="ltr">{user.email}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <Phone className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">
                    {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                  </p>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editedProfile?.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full text-gray-900 border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                      dir="ltr"
                    />
                  ) : (
                    <p className="text-gray-900" dir="ltr">{user.phone}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 space-x-reverse">
                <Building className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">
                    {language === 'ar' ? 'القسم' : 'Department'}
                  </p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile?.department}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      className="w-full text-gray-900 border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                    />
                  ) : (
                    <p className="text-gray-900">{user.department}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">
                    {language === 'ar' ? 'تاريخ الانضمام' : 'Join Date'}
                  </p>
                  <p className="text-gray-900">
                    {new Date(user.joinDate).toLocaleDateString(
                      language === 'ar' ? 'ar-SA' : 'en-US'
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;