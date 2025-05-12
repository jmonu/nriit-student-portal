
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
import About from "./pages/About";
import Courses from "./pages/Courses";
import FacultyList from "./pages/FacultyList";
import Placements from "./pages/Placements";
import NoticesPage from "./pages/NoticesPage";
import EventsPage from "./pages/EventsPage";
import CalendarListPage from "./pages/CalendarListPage";
import Contact from "./pages/Contact";

// Dashboards
import DashboardLayout from "./components/dashboard/DashboardLayout";
import StudentDashboard from "./pages/student/StudentDashboard";
import AttendancePage from "./pages/student/AttendancePage";

// Teacher Pages
import TeacherAttendancePage from "./pages/teacher/AttendancePage";

// Admin Pages
import UsersPage from "./pages/admin/UsersPage";
import ClassesPage from "./pages/admin/ClassesPage";
import ClassAssignmentPage from "./pages/admin/ClassAssignmentPage";
import SlotsPage from "./pages/admin/SlotsPage";
import SchedulesPage from "./pages/admin/SchedulesPage";
import NoticesPage as AdminNoticesPage from "./pages/admin/NoticesPage";
import EventsPage as AdminEventsPage from "./pages/admin/EventsPage";
import AlertsPage from "./pages/admin/AlertsPage";
import FacultyPage from "./pages/admin/FacultyPage";
import CalendarPage from "./pages/admin/CalendarPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about" element={<About />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/faculty" element={<FacultyList />} />
              <Route path="/placements" element={<Placements />} />
              <Route path="/notices" element={<NoticesPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/calendar" element={<CalendarListPage />} />
              <Route path="/contact" element={<Contact />} />

              {/* Student Dashboard Routes */}
              <Route path="/student-dashboard" element={<DashboardLayout />}>
                <Route index element={<StudentDashboard />} />
                <Route path="attendance" element={<AttendancePage />} />
              </Route>

              {/* Teacher Dashboard Routes */}
              <Route path="/teacher-dashboard" element={<DashboardLayout />}>
                <Route index element={<div>Teacher Dashboard Home</div>} />
                <Route path="attendance" element={<TeacherAttendancePage />} />
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
                <Route path="users" element={<UsersPage />} />
                <Route path="classes" element={<ClassesPage />} />
                <Route path="class-assignments" element={<ClassAssignmentPage />} />
                <Route path="slots" element={<SlotsPage />} />
                <Route path="schedules" element={<SchedulesPage />} />
                <Route path="attendance" element={<div>Admin Attendance Page</div>} />
                <Route path="notices" element={<AdminNoticesPage />} />
                <Route path="events" element={<AdminEventsPage />} />
                <Route path="alerts" element={<AlertsPage />} />
                <Route path="faculty" element={<FacultyPage />} />
                <Route path="calendar" element={<CalendarPage />} />
                <Route path="complaints" element={<div>Admin Complaints Page</div>} />
                <Route path="settings" element={<div>Admin Settings Page</div>} />
                <Route path="audit-log" element={<div>Admin Audit Log Page</div>} />
              </Route>

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
