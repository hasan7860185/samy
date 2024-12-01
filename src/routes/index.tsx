import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Clients from '../pages/Clients';
import ClientStatusPage from '../pages/ClientStatus';
import Properties from '../pages/Properties';
import PropertyDetails from '../pages/PropertyDetails';
import Tasks from '../pages/Tasks';
import Notifications from '../pages/Notifications';
import Reports from '../pages/Reports';
import Settings from '../pages/Settings';
import Help from '../pages/Help';
import Users from '../pages/Users';
import Profile from '../pages/Profile';
import Developers from '../pages/Developers';
import DeveloperDetails from '../pages/DeveloperDetails';
import Projects from '../pages/Projects';
import ProjectDetails from '../pages/ProjectDetails';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/clients" element={<PrivateRoute><Clients /></PrivateRoute>} />
      <Route path="/clients/status/:status" element={<PrivateRoute><ClientStatusPage /></PrivateRoute>} />
      <Route path="/properties" element={<PrivateRoute><Properties /></PrivateRoute>} />
      <Route path="/properties/:id" element={<PrivateRoute><PropertyDetails /></PrivateRoute>} />
      <Route path="/developers" element={<PrivateRoute><Developers /></PrivateRoute>} />
      <Route path="/developers/:id" element={<PrivateRoute><DeveloperDetails /></PrivateRoute>} />
      <Route path="/developers/:developerId/projects" element={<PrivateRoute><Projects /></PrivateRoute>} />
      <Route path="/projects/:id" element={<PrivateRoute><ProjectDetails /></PrivateRoute>} />
      <Route path="/tasks" element={<PrivateRoute><Tasks /></PrivateRoute>} />
      <Route path="/notifications" element={<PrivateRoute><Notifications /></PrivateRoute>} />
      <Route path="/reports" element={<PrivateRoute><Reports /></PrivateRoute>} />
      <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
      <Route path="/help" element={<PrivateRoute><Help /></PrivateRoute>} />
      <Route path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;