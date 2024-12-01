import { Toaster } from "sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ClientStatus from './pages/ClientStatus';
import Clients from './pages/Clients';
import Properties from './pages/Properties';
import Users from './pages/Users';
import DeveloperDetails from './pages/DeveloperDetails';
import Projects from './pages/Projects';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Help from './pages/Help';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div dir="rtl" className="min-h-screen bg-background font-sans antialiased">
        <Toaster position="top-right" dir="rtl" />
        <BrowserRouter>
          <Routes>
            <Route path="/clients" element={<Clients />} />
            <Route path="/client-status" element={<ClientStatus />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/users" element={<Users />} />
            <Route path="/developers/:id" element={<DeveloperDetails />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/help" element={<Help />} />
            {/* Add other routes as needed */}
          </Routes>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
};

export default App;
