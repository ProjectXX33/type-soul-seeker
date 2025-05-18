
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Test Pages
import RiasecTest from "./pages/RiasecTest";
import AptitudeMatrix from "./pages/AptitudeMatrix";
import ValuesTest from "./pages/ValuesTest";
import GardnerTest from "./pages/GardnerTest";

// Admin pages
import AdminIndex from "./pages/admin/AdminIndex";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminResults from "./pages/admin/AdminResults";
import AdminResultDetail from "./pages/admin/AdminResultDetail";
import AdminLayout from "./components/admin/AdminLayout";
import AllResults from "./pages/AllResults";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Assessment Routes */}
          <Route path="/riasec" element={<RiasecTest />} />
          <Route path="/aptitude-matrix" element={<AptitudeMatrix />} />
          <Route path="/values" element={<ValuesTest />} />
          <Route path="/gardner" element={<GardnerTest />} />
          <Route path="/all-results" element={<AllResults />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminIndex />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="results" element={<AdminResults />} />
            <Route path="results/:id" element={<AdminResultDetail />} />
          </Route>
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
