
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/lib/context/auth-context";
import { ThemeProvider } from "@/lib/context/theme-context";

// Public pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// Dashboards
import DashboardLayout from "./components/dashboard/DashboardLayout";
import StudentDashboard from "./pages/student/StudentDashboard";
import AttendancePage from "./pages/student/AttendancePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />

              {/* Student Dashboard Routes */}
              <Route path="/student-dashboard" element={<DashboardLayout />}>
                <Route index element={<StudentDashboard />} />
                <Route path="attendance" element={<AttendancePage />} />
              </Route>

              {/* Teacher Dashboard Routes */}
              <Route path="/teacher-dashboard" element={<DashboardLayout />}>
                <Route index element={<div>Teacher Dashboard Home</div>} />
                <Route path="attendance" element={<div>Teacher Attendance Page</div>} />
                <Route path="notices" element={<div>Teacher Notices Page</div>} />
                <Route path="events" element={<div>Teacher Events Page</div>} />
                <Route path="alerts" element={<div>Teacher Alerts Page</div>} />
                <Route path="faculty" element={<div>Teacher Faculty Page</div>} />
                <Route path="calendar" element={<div>Teacher Calendar Page</div>} />
                <Route path="complaints" element={<div>Teacher Complaints Page</div>} />
                <Route path="students" element={<div>Teacher Students Page</div>} />
                <Route path="settings" element={<div>Teacher Settings Page</div>} />
                <Route path="audit-log" element={<div>Teacher Audit Log Page</div>} />
              </Route>

              {/* Admin Dashboard Routes */}
              <Route path="/admin-dashboard" element={<DashboardLayout />}>
                <Route index element={<div>Admin Dashboard Home</div>} />
                <Route path="users" element={<div>Admin Users Page</div>} />
                <Route path="classes" element={<div>Admin Classes Page</div>} />
                <Route path="slots" element={<div>Admin Slots Page</div>} />
                <Route path="schedules" element={<div>Admin Schedules Page</div>} />
                <Route path="attendance" element={<div>Admin Attendance Page</div>} />
                <Route path="notices" element={<div>Admin Notices Page</div>} />
                <Route path="events" element={<div>Admin Events Page</div>} />
                <Route path="alerts" element={<div>Admin Alerts Page</div>} />
                <Route path="faculty" element={<div>Admin Faculty Page</div>} />
                <Route path="calendar" element={<div>Admin Calendar Page</div>} />
                <Route path="complaints" element={<div>Admin Complaints Page</div>} />
                <Route path="settings" element={<div>Admin Settings Page</div>} />
                <Route path="audit-log" element={<div>Admin Audit Log Page</div>} />
              </Route>

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
