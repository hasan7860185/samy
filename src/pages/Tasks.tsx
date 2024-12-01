import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  CheckSquare, 
  Clock, 
  AlertTriangle,
  Plus,
  Calendar,
  Filter
} from 'lucide-react';
import TaskForm from '../components/tasks/TaskForm';
import { useTasks } from '../contexts/TaskContext';
import { Task } from '../types';

interface TaskWithTranslations extends Task {
  titleEn: string;
  descriptionEn: string;
  assignedToEn: string;
}

const Tasks = () => {
  const { tasks, addTask, updateTask, deleteTask } = useTasks();
  const [filter, setFilter] = useState<'all' | 'pending' | 'in_progress' | 'completed'>('all');
  const [showForm, setShowForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskWithTranslations | undefined>();
  const { language } = useLanguage();

  const handleAddTask = async (taskData: Omit<TaskWithTranslations, 'id'>) => {
    try {
      const newTask = {
        ...taskData,
        id: `task-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await addTask(newTask as Task);
      setShowForm(false);
    } catch (error) {
      console.error('Error adding task:', error);
      alert(language === 'ar' 
        ? 'حدث خطأ أثناء إضافة المهمة'
        : 'Error adding task');
    }
  };

  const handleUpdateTask = async (taskData: Omit<TaskWithTranslations, 'id'>) => {
    if (selectedTask) {
      try {
        await updateTask(selectedTask.id, {
          ...taskData,
          updatedAt: new Date().toISOString(),
        });
        setShowForm(false);
        setSelectedTask(undefined);
      } catch (error) {
        console.error('Error updating task:', error);
        alert(language === 'ar'
          ? 'حدث خطأ أثناء تحديث المهمة'
          : 'Error updating task');
      }
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (window.confirm(language === 'ar' 
      ? 'هل أنت متأكد من حذف هذه المهمة؟'
      : 'Are you sure you want to delete this task?')) {
      try {
        await deleteTask(taskId);
      } catch (error) {
        console.error('Error deleting task:', error);
        alert(language === 'ar'
          ? 'حدث خطأ أثناء حذف المهمة'
          : 'Error deleting task');
      }
    }
  };

  const getStatusLabel = (status: string) => {
    const statusLabels = {
      pending: { ar: 'قيد الانتظار', en: 'Pending' },
      in_progress: { ar: 'قيد التنفيذ', en: 'In Progress' },
      completed: { ar: 'مكتمل', en: 'Completed' }
    };
    return language === 'ar' ? statusLabels[status as keyof typeof statusLabels].ar : statusLabels[status as keyof typeof statusLabels].en;
  };

  const getPriorityLabel = (priority: string) => {
    const priorityLabels = {
      low: { ar: 'منخفضة', en: 'Low' },
      medium: { ar: 'متوسطة', en: 'Medium' },
      high: { ar: 'عالية', en: 'High' }
    };
    return language === 'ar' ? priorityLabels[priority as keyof typeof priorityLabels].ar : priorityLabels[priority as keyof typeof priorityLabels].en;
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800'
    };
    return colors[priority as keyof typeof colors];
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      in_progress: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800'
    };
    return colors[status as keyof typeof colors];
  };

  const filteredTasks = filter === 'all' ? tasks : tasks.filter(task => task.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3 space-x-reverse">
          <CheckSquare className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">
            {language === 'ar' ? 'المهام' : 'Tasks'}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as typeof filter)}
              className="text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">{language === 'ar' ? 'جميع المهام' : 'All Tasks'}</option>
              <option value="pending">{language === 'ar' ? 'قيد الانتظار' : 'Pending'}</option>
              <option value="in_progress">{language === 'ar' ? 'قيد التنفيذ' : 'In Progress'}</option>
              <option value="completed">{language === 'ar' ? 'مكتملة' : 'Completed'}</option>
            </select>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            {language === 'ar' ? 'إضافة مهمة' : 'Add Task'}
          </button>
        </div>
      </div>

      {showForm ? (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {selectedTask
              ? (language === 'ar' ? 'تعديل مهمة' : 'Edit Task')
              : (language === 'ar' ? 'إضافة مهمة جديدة' : 'Add New Task')}
          </h2>
          <TaskForm
            task={selectedTask}
            onSubmit={selectedTask ? handleUpdateTask : handleAddTask}
            onCancel={() => {
              setShowForm(false);
              setSelectedTask(undefined);
            }}
          />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === 'ar' ? 'المهمة' : 'Task'}
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === 'ar' ? 'تاريخ الاستحقاق' : 'Due Date'}
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === 'ar' ? 'الأولوية' : 'Priority'}
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === 'ar' ? 'الحالة' : 'Status'}
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === 'ar' ? 'مسند إلى' : 'Assigned To'}
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === 'ar' ? 'الإجراءات' : 'Actions'}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {language === 'ar' ? task.title : task.titleEn}
                      </div>
                      <div className="text-sm text-gray-500">
                        {language === 'ar' ? task.description : task.descriptionEn}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-900">
                        <Calendar className="w-4 h-4 ml-2" />
                        {new Date(task.dueDate).toLocaleDateString(
                          language === 'ar' ? 'ar-SA' : 'en-US'
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                        {getPriorityLabel(task.priority)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}>
                        {getStatusLabel(task.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {language === 'ar' ? task.assignedTo : task.assignedToEn}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedTask(task as TaskWithTranslations);
                            setShowForm(true);
                          }}
                          className="text-yellow-600 hover:text-yellow-800"
                        >
                          {language === 'ar' ? 'تعديل' : 'Edit'}
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          {language === 'ar' ? 'حذف' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;