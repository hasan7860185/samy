import { ReactElement } from 'react';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import ClientStatus from './pages/ClientStatus';
import Properties from './pages/Properties';
import Users from './pages/Users';
import DeveloperDetails from './pages/DeveloperDetails';
import Projects from './pages/Projects';
import Login from './pages/Login';
import Help from './pages/Help';

interface NavItem {
  to: string;
  page: ReactElement;
}

export const navItems: NavItem[] = [
  { to: '/', page: <Dashboard /> },
  { to: '/clients', page: <Clients /> },
  { to: '/client-status', page: <ClientStatus /> },
  { to: '/properties', page: <Properties /> },
  { to: '/users', page: <Users /> },
  { to: '/developers/:id', page: <DeveloperDetails /> },
  { to: '/projects', page: <Projects /> },
  { to: '/login', page: <Login /> },
  { to: '/help', page: <Help /> }
];