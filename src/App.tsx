import { Toaster } from "sonner";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
      <TooltipProvider>
        <div dir="rtl" className="min-h-screen bg-background font-sans antialiased">
          <Toaster position="top-right" dir="rtl" />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/client-status" element={<ClientStatus />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/users" element={<Users />} />
              <Route path="/developers/:id" element={<DeveloperDetails />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/login" element={<Login />} />
              <Route path="/help" element={<Help />} />
            </Routes>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;