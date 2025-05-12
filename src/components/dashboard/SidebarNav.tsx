
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
  BookOpen,
  School,
  GraduationCap
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

  const basePath = `/${user.type}-dashboard`;
  
  return (
    <nav className="flex flex-col gap-1">
      {/* Admin Nav Items */}
      {user.type === 'admin' && (
        <>
          <NavItem to={`${basePath}`} icon={<Home size={20} />} label="Home" />
          <NavItem to={`${basePath}/users`} icon={<Users size={20} />} label="Users" />
          <NavItem to={`${basePath}/classes`} icon={<LayoutGrid size={20} />} label="Classes" />
          <NavItem to={`${basePath}/class-assignments`} icon={<BookOpen size={20} />} label="Class Assignments" />
          <NavItem to={`${basePath}/slots`} icon={<Clock size={20} />} label="Slots" />
          <NavItem to={`${basePath}/schedules`} icon={<Layout size={20} />} label="Schedules" />
          <NavItem to={`${basePath}/attendance`} icon={<ClipboardList size={20} />} label="Attendance" />
          <NavItem to={`${basePath}/notices`} icon={<FileText size={20} />} label="Notices" />
          <NavItem to={`${basePath}/events`} icon={<Calendar size={20} />} label="Events" />
          <NavItem to={`${basePath}/alerts`} icon={<AlertTriangle size={20} />} label="Alerts" />
          <NavItem to={`${basePath}/faculty`} icon={<GraduationCap size={20} />} label="Faculty" />
          <NavItem to={`${basePath}/calendar`} icon={<Calendar size={20} />} label="Calendar" />
          <NavItem to={`${basePath}/complaints`} icon={<MessageSquare size={20} />} label="Complaints" />
          <NavItem to={`${basePath}/settings`} icon={<Settings size={20} />} label="Settings" />
          <NavItem to={`${basePath}/audit-log`} icon={<ClipboardList size={20} />} label="Audit Log" />
        </>
      )}
      
      {/* Teacher Nav Items */}
      {user.type === 'teacher' && (
        <>
          <NavItem to={`${basePath}`} icon={<Home size={20} />} label="Home" />
          <NavItem to={`${basePath}/attendance`} icon={<ClipboardList size={20} />} label="Attendance" />
          <NavItem to={`${basePath}/notices`} icon={<FileText size={20} />} label="Notices" />
          <NavItem to={`${basePath}/events`} icon={<Calendar size={20} />} label="Events" />
          <NavItem to={`${basePath}/alerts`} icon={<Bell size={20} />} label="Alerts" />
          <NavItem to={`${basePath}/faculty`} icon={<GraduationCap size={20} />} label="Faculty" />
          <NavItem to={`${basePath}/calendar`} icon={<Calendar size={20} />} label="Calendar" />
          <NavItem to={`${basePath}/complaints`} icon={<MessageSquare size={20} />} label="Complaints" />
          <NavItem to={`${basePath}/students`} icon={<Users size={20} />} label="Students" />
          <NavItem to={`${basePath}/settings`} icon={<Settings size={20} />} label="Settings" />
          <NavItem to={`${basePath}/audit-log`} icon={<ClipboardList size={20} />} label="Audit Log" />
        </>
      )}
      
      {/* Student Nav Items */}
      {user.type === 'student' && (
        <>
          <NavItem to={`${basePath}`} icon={<Home size={20} />} label="Home" />
          <NavItem to={`${basePath}/attendance`} icon={<ClipboardList size={20} />} label="Attendance" />
          <NavItem to={`${basePath}/notices`} icon={<FileText size={20} />} label="Notices" />
          <NavItem to={`${basePath}/events`} icon={<Calendar size={20} />} label="Events" />
          <NavItem to={`${basePath}/calendar`} icon={<Calendar size={20} />} label="Calendar" />
          <NavItem to={`${basePath}/settings`} icon={<Settings size={20} />} label="Settings" />
        </>
      )}
      
      {/* Logout Button */}
      <button 
        onClick={logout}
        className="dashboard-menu-item mt-auto bg-red-600 hover:bg-red-700 text-white"
      >
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </nav>
  );
};

export default SidebarNav;
