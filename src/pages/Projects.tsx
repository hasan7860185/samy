import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Building2, Plus } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useProjects } from '../contexts/ProjectContext';
import ProjectForm from '../components/projects/ProjectForm';
import ProjectList from '../components/projects/ProjectList';
import { Project } from '../types/project';

const Projects = () => {
  const { developerId } = useParams<{ developerId: string }>();
  const [showForm, setShowForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | undefined>();
  const { language } = useLanguage();
  const { 
    projects,
    addProject,
    updateProject,
    deleteProject,
    getProjectsByDeveloper
  } = useProjects();

  const developerProjects = getProjectsByDeveloper(developerId || '');

  const handleView = (project: Project) => {
    console.log('View project:', project);
  };

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setShowForm(true);
  };

  const handleDelete = (project: Project) => {
    if (window.confirm(language === 'ar' 
      ? 'هل أنت متأكد من حذف هذا المشروع؟'
      : 'Are you sure you want to delete this project?')) {
      deleteProject(project.id);
    }
  };

  const handleSubmit = (data: Partial<Project>) => {
    if (selectedProject) {
      updateProject(selectedProject.id, data);
    } else {
      const newProject: Project = {
        id: `proj-${Date.now()}`,
        ...data as Project,
      };
      addProject(newProject);
    }
    
    setShowForm(false);
    setSelectedProject(undefined);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3 space-x-reverse">
          <Building2 className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">
            {language === 'ar' ? 'المشاريع' : 'Projects'}
          </h1>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          {language === 'ar' ? 'إضافة مشروع' : 'Add Project'}
        </button>
      </div>

      {showForm ? (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {selectedProject
              ? (language === 'ar' ? 'تعديل مشروع' : 'Edit Project')
              : (language === 'ar' ? 'إضافة مشروع جديد' : 'Add New Project')}
          </h2>
          <ProjectForm
            developerId={developerId || ''}
            project={selectedProject}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setSelectedProject(undefined);
            }}
          />
        </div>
      ) : (
        <ProjectList
          projects={developerProjects}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Projects;