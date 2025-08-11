import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import StudentDashboard from "./pages/student/Dashboard";
import ApplicationsPage from "./pages/student/Applications";
import AdminDashboard from "./pages/admin/Dashboard";
import MasterAdminDashboard from "./pages/master-admin/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Student Portal Routes */}
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/applications" element={<ApplicationsPage />} />
          <Route path="/student/applications/new" element={<div className="p-8 text-center">Create New Application Page</div>} />
          <Route path="/student/applications/:id" element={<div className="p-8 text-center">Application Detail Page</div>} />
          <Route path="/student/documents" element={<div className="p-8 text-center">Documents Page</div>} />
          <Route path="/student/messages" element={<div className="p-8 text-center">Messages Page</div>} />
          <Route path="/student/wishlist" element={<div className="p-8 text-center">Wishlist Page</div>} />
          <Route path="/student/notifications/:id" element={<div className="p-8 text-center">Notification Detail Page</div>} />
          
          {/* Admin Portal Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/applications/:id" element={<div className="p-8 text-center">Admin Application Detail Page</div>} />
          
          {/* Master Admin Portal Routes */}
          <Route path="/master-admin" element={<MasterAdminDashboard />} />
          <Route path="/master-admin/admins/new" element={<div className="p-8 text-center">Add New Admin Page</div>} />
          <Route path="/master-admin/analytics" element={<div className="p-8 text-center">Detailed Analytics Page</div>} />
          <Route path="/master-admin/settings" element={<div className="p-8 text-center">System Settings Page</div>} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
