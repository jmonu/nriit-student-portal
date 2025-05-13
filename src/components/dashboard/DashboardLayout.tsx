
import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/lib/context/auth-context';
import { useTheme } from '@/lib/context/theme-context';
import SidebarNav from './SidebarNav';
import { Sun, Moon, Menu, X } from 'lucide-react';

const DashboardLayout: React.FC = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  // Extract page title from the path
  const getPageTitle = () => {
    const path = location.pathname;
    const lastSegment = path.split('/').pop() || '';
    
    // Format the title (capitalize and replace hyphens with spaces)
    if (lastSegment) {
      return lastSegment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
    return 'Dashboard';
  };

  if (!user) {
    return <div>Unauthorized. Please login.</div>;
  }

  const userTypeTitle = {
    admin: 'Administrator',
    teacher: 'Teacher',
    student: 'Student',
  }[user.type];

  return (
    <div className="dashboard-layout bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Sidebar (desktop) */}
      <aside className={`dashboard-sidebar ${sidebarOpen ? 'block' : 'hidden md:block'} bg-blue-900 dark:bg-blue-900 text-white`}>
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
      <div className="dashboard-content bg-gray-50 dark:bg-gray-900">
        <header className="bg-white dark:bg-gray-800 p-4 shadow-sm flex justify-between items-center mb-6 rounded-lg">
          <div className="flex items-center gap-3">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <Menu size={20} />
              </button>
            )}
            <h1 className="text-2xl font-bold">{getPageTitle()}</h1>
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
      
      {/* Add some custom styling to ensure proper dashboard layout */}
      <style>
        {`
        .dashboard-layout {
          display: grid;
          grid-template-columns: 280px 1fr;
          min-height: 100vh;
        }
        
        .dashboard-sidebar {
          position: sticky;
          top: 0;
          height: 100vh;
          padding: 1.5rem;
          overflow-y: auto;
          z-index: 20;
        }
        
        .dashboard-content {
          padding: 1.5rem;
          overflow-y: auto;
        }
        
        .dashboard-menu-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: 0.375rem;
          transition: all 0.2s;
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.8);
        }
        
        .dashboard-menu-item:hover {
          background-color: rgba(255, 255, 255, 0.1);
          color: white;
        }
        
        .dashboard-menu-item.active {
          background-color: rgba(255, 255, 255, 0.2);
          color: white;
          font-weight: 500;
        }
        
        @media (max-width: 768px) {
          .dashboard-layout {
            grid-template-columns: 1fr;
          }
          
          .dashboard-sidebar {
            position: fixed;
            left: 0;
            width: 280px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
          }
          
          .dashboard-content {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
        `}
      </style>
    </div>
  );
};

export default DashboardLayout;
