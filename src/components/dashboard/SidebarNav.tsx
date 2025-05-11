
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/lib/context/auth-context';
import { 
  Home, 
  Users, 
  Calendar, 
  Bell, 
  Settings, 
  LogOut, 
  Layout, 
  Clock, 
  FileText, 
  AlertTriangle, 
  User,
  MessageSquare,
  LayoutGrid,
  ClipboardList,
  BookOpen
} from 'lucide-react';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `dashboard-menu-item ${isActive ? 'active' : ''}`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
};

const SidebarNav: React.FC = () => {
  const { user, logout } = useAuth();
  
  if (!user) return null;
  
  return (
    <nav className="flex flex-col gap-1">
      {/* Admin Nav Items */}
      {user.type === 'admin' && (
        <>
          <NavItem to="/admin-dashboard" icon={<Home size={20} />} label="Home" />
          <NavItem to="/admin-dashboard/users" icon={<Users size={20} />} label="Users" />
          <NavItem to="/admin-dashboard/classes" icon={<LayoutGrid size={20} />} label="Classes" />
          <NavItem to="/admin-dashboard/class-assignments" icon={<BookOpen size={20} />} label="Class Assignments" />
          <NavItem to="/admin-dashboard/slots" icon={<Clock size={20} />} label="Slots" />
          <NavItem to="/admin-dashboard/schedules" icon={<Layout size={20} />} label="Schedules" />
          <NavItem to="/admin-dashboard/attendance" icon={<ClipboardList size={20} />} label="Attendance" />
          <NavItem to="/admin-dashboard/notices" icon={<FileText size={20} />} label="Notices" />
          <NavItem to="/admin-dashboard/events" icon={<Calendar size={20} />} label="Events" />
          <NavItem to="/admin-dashboard/alerts" icon={<Bell size={20} />} label="Alerts" />
          <NavItem to="/admin-dashboard/faculty" icon={<User size={20} />} label="Faculty" />
          <NavItem to="/admin-dashboard/calendar" icon={<Calendar size={20} />} label="Calendar" />
          <NavItem to="/admin-dashboard/complaints" icon={<MessageSquare size={20} />} label="Complaints" />
          <NavItem to="/admin-dashboard/settings" icon={<Settings size={20} />} label="Settings" />
          <NavItem to="/admin-dashboard/audit-log" icon={<ClipboardList size={20} />} label="Audit Log" />
        </>
      )}
      
      {/* Teacher Nav Items */}
      {user.type === 'teacher' && (
        <>
          <NavItem to="/teacher-dashboard" icon={<Home size={20} />} label="Home" />
          <NavItem to="/teacher-dashboard/attendance" icon={<ClipboardList size={20} />} label="Attendance" />
          <NavItem to="/teacher-dashboard/notices" icon={<FileText size={20} />} label="Notices" />
          <NavItem to="/teacher-dashboard/events" icon={<Calendar size={20} />} label="Events" />
          <NavItem to="/teacher-dashboard/alerts" icon={<Bell size={20} />} label="Alerts" />
          <NavItem to="/teacher-dashboard/faculty" icon={<User size={20} />} label="Faculty" />
          <NavItem to="/teacher-dashboard/calendar" icon={<Calendar size={20} />} label="Calendar" />
          <NavItem to="/teacher-dashboard/complaints" icon={<MessageSquare size={20} />} label="Complaints" />
          <NavItem to="/teacher-dashboard/students" icon={<Users size={20} />} label="Students" />
          <NavItem to="/teacher-dashboard/settings" icon={<Settings size={20} />} label="Settings" />
          <NavItem to="/teacher-dashboard/audit-log" icon={<ClipboardList size={20} />} label="Audit Log" />
        </>
      )}
      
      {/* Student Nav Items */}
      {user.type === 'student' && (
        <>
          <NavItem to="/student-dashboard" icon={<Home size={20} />} label="Home" />
          <NavItem to="/student-dashboard/attendance" icon={<ClipboardList size={20} />} label="Attendance" />
        </>
      )}
      
      {/* Logout Button */}
      <button 
        onClick={logout}
        className="dashboard-menu-item mt-auto text-white/80 hover:text-white"
      >
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </nav>
  );
};

export default SidebarNav;
