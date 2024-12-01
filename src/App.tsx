import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { UserProvider } from './contexts/UserContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ClientProvider } from './contexts/ClientContext';
import { PropertyProvider } from './contexts/PropertyContext';
import { ProjectProvider } from './contexts/ProjectContext';
import { DeveloperProvider } from './contexts/DeveloperContext';
import { TaskProvider } from './contexts/TaskContext';
import { SupportProvider } from './contexts/SupportContext';
import Layout from './components/layout/Layout';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <LanguageProvider>
          <ThemeProvider>
            <AuthProvider>
              <UserProvider>
                <ClientProvider>
                  <PropertyProvider>
                    <ProjectProvider>
                      <DeveloperProvider>
                        <TaskProvider>
                          <SupportProvider>
                            <Layout />
                          </SupportProvider>
                        </TaskProvider>
                      </DeveloperProvider>
                    </ProjectProvider>
                  </PropertyProvider>
                </ClientProvider>
              </UserProvider>
            </AuthProvider>
          </ThemeProvider>
        </LanguageProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;