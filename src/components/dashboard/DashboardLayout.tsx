
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '@/lib/context/auth-context';
import { useTheme } from '@/lib/context/theme-context';
import SidebarNav from './SidebarNav';
import { Sun, Moon, Menu, X } from 'lucide-react';

const DashboardLayout: React.FC = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!user) {
    return <div>Unauthorized. Please login.</div>;
  }

  const userTypeTitle = {
    admin: 'Administrator',
    teacher: 'Teacher',
    student: 'Student',
  }[user.type];

  return (
    <div className="dashboard-layout">
      {/* Sidebar (desktop) */}
      <aside className={`dashboard-sidebar ${sidebarOpen ? 'block' : 'hidden md:block'}`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold">{userTypeTitle} Panel</h2>
          <button
            className="md:hidden p-1 rounded-md bg-white/10"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg mb-6">
            <img
              src={user.photo || '/placeholder.svg'}
              alt={user.name}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div className="overflow-hidden">
              <p className="font-medium truncate">{user.name}</p>
              <p className="text-xs text-white/70 truncate">{user.roll_no}</p>
            </div>
          </div>
          <SidebarNav />
        </div>
      </aside>

      {/* Main Content */}
      <div className="dashboard-content">
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <Menu size={20} />
              </button>
            )}
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
