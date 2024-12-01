import React, { useState } from 'react';
import { Task } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';

interface TaskFormProps {
  task?: Task;
  onSubmit: (data: Omit<Task, 'id'>) => void;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit, onCancel }) => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    title: task?.title || '',
    titleEn: task?.titleEn || '',
    description: task?.description || '',
    descriptionEn: task?.descriptionEn || '',
    dueDate: task?.dueDate || '',
    status: task?.status || 'pending',
    priority: task?.priority || 'medium',
    assignedTo: task?.assignedTo || '',
    assignedToEn: task?.assignedToEn || '',
    createdAt: task?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          {language === 'ar' ? 'عنوان المهمة' : 'Task Title'}
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          {language === 'ar' ? 'الوصف' : 'Description'}
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          {language === 'ar' ? 'تاريخ الاستحقاق' : 'Due Date'}
        </label>
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          {language === 'ar' ? 'الحالة' : 'Status'}
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="pending">{language === 'ar' ? 'قيد الانتظار' : 'Pending'}</option>
          <option value="in_progress">{language === 'ar' ? 'قيد التنفيذ' : 'In Progress'}</option>
          <option value="completed">{language === 'ar' ? 'مكتمل' : 'Completed'}</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          {language === 'ar' ? 'الأولوية' : 'Priority'}
        </label>
        <select
          name="priority"
          value={formData.priority}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="low">{language === 'ar' ? 'منخفضة' : 'Low'}</option>
          <option value="medium">{language === 'ar' ? 'متوسطة' : 'Medium'}</option>
          <option value="high">{language === 'ar' ? 'عالية' : 'High'}</option>
        </select>
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
          {language === 'ar' ? 'إضافة مهمة' : 'Add Task'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
