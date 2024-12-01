import React from 'react';
import { User } from '../types';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface UserListProps {
  users: User[];
  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

const getRoleLabel = (role: string, language: string): string => {
  const roleLabels: Record<string, { ar: string; en: string }> = {
    admin: { ar: 'مشرف', en: 'Admin' },
    employee: { ar: 'موظف', en: 'Employee' },
    sales_manager: { ar: 'مدير مبيعات', en: 'Sales Manager' },
  };
  return language === 'ar' ? roleLabels[role].ar : roleLabels[role].en;
};

const UserList: React.FC<UserListProps> = ({
  users,
  onView,
  onEdit,
  onDelete,
}) => {
  const { language } = useLanguage();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
              {language === 'ar' ? 'اسم المستخدم' : 'Username'}
            </th>
            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
              {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
            </th>
            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
              {language === 'ar' ? 'الدور' : 'Role'}
            </th>
            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
              {language === 'ar' ? 'تاريخ الإنشاء' : 'Created At'}
            </th>
            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
              {language === 'ar' ? 'آخر تسجيل دخول' : 'Last Login'}
            </th>
            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
              {language === 'ar' ? 'الإجراءات' : 'Actions'}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-900">{user.username}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{user.email}</td>
              <td className="px-6 py-4 text-sm text-gray-900">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                  {getRoleLabel(user.role, language)}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {new Date(user.createdAt).toLocaleDateString(
                  language === 'ar' ? 'ar-SA' : 'en-US'
                )}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {user.lastLogin
                  ? new Date(user.lastLogin).toLocaleDateString(
                      language === 'ar' ? 'ar-SA' : 'en-US'
                    )
                  : '-'}
              </td>
              <td className="px-6 py-4 text-sm">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onView(user)}
                    className="text-blue-600 hover:text-blue-800"
                    title={language === 'ar' ? 'عرض' : 'View'}
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onEdit(user)}
                    className="text-yellow-600 hover:text-yellow-800"
                    title={language === 'ar' ? 'تعديل' : 'Edit'}
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onDelete(user)}
                    className="text-red-600 hover:text-red-800"
                    title={language === 'ar' ? 'حذف' : 'Delete'}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;