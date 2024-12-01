import { Toaster } from "sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Properties from "./pages/Properties";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div dir="rtl" className="min-h-screen bg-background font-sans antialiased">
        <Toaster position="top-right" dir="rtl" />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="clients" element={<Clients />} />
              <Route path="properties" element={<Properties />} />
              <Route path="projects" element={<Projects />} />
              <Route path="tasks" element={<Tasks />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;