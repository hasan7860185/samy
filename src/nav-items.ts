import React from 'react';
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
  { to: '/', page: React.createElement(Dashboard) },
  { to: '/clients', page: React.createElement(Clients) },
  { to: '/client-status', page: React.createElement(ClientStatus) },
  { to: '/properties', page: React.createElement(Properties) },
  { to: '/users', page: React.createElement(Users) },
  { to: '/developers/:id', page: React.createElement(DeveloperDetails) },
  { to: '/projects', page: React.createElement(Projects) },
  { to: '/login', page: React.createElement(Login) },
  { to: '/help', page: React.createElement(Help) }
];