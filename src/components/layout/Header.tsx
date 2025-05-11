
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/lib/context/theme-context';
import { useAuth } from '@/lib/context/auth-context';
import { Sun, Moon, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 dark:bg-gray-900/95 shadow-md backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="https://i.ibb.co/q3MZqYJk/3c0e2f5b4c43.jpg" 
              alt="NRIIT Logo" 
              className="h-12 w-auto"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/placeholder.svg';
                console.error('Failed to load logo image');
              }}
            />
            <div className="flex flex-col">
              <span className="font-bold text-lg text-primary dark:text-white">NRI Institute</span>
              <span className="text-xs text-gray-600 dark:text-gray-300">of Technology</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-primary hover:dark:text-primary-200 transition-colors">Home</Link>
            <Link to="/about" className="text-gray-700 dark:text-gray-200 hover:text-primary hover:dark:text-primary-200 transition-colors">About</Link>
            <Link to="/courses" className="text-gray-700 dark:text-gray-200 hover:text-primary hover:dark:text-primary-200 transition-colors">Courses</Link>
            <Link to="/faculty" className="text-gray-700 dark:text-gray-200 hover:text-primary hover:dark:text-primary-200 transition-colors">Faculty</Link>
            <Link to="/placements" className="text-gray-700 dark:text-gray-200 hover:text-primary hover:dark:text-primary-200 transition-colors">Placements</Link>
            <Link to="/notices" className="text-gray-700 dark:text-gray-200 hover:text-primary hover:dark:text-primary-200 transition-colors">Notices</Link>
            <Link to="/events" className="text-gray-700 dark:text-gray-200 hover:text-primary hover:dark:text-primary-200 transition-colors">Events</Link>
            <Link to="/calendar" className="text-gray-700 dark:text-gray-200 hover:text-primary hover:dark:text-primary-200 transition-colors">Calendar</Link>
            <Link to="/contact" className="text-gray-700 dark:text-gray-200 hover:text-primary hover:dark:text-primary-200 transition-colors">Contact</Link>
            
            {user ? (
              <Link 
                to={`/${user.type}-dashboard`} 
                className="btn-primary"
              >
                Dashboard
              </Link>
            ) : (
              <Link to="/login" className="btn-accent">Login</Link>
            )}
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-200"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link to="/" className="block py-2 text-gray-700 dark:text-gray-200 hover:text-primary hover:dark:text-primary-200" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/about" className="block py-2 text-gray-700 dark:text-gray-200 hover:text-primary hover:dark:text-primary-200" onClick={() => setMobileMenuOpen(false)}>About</Link>
            <Link to="/courses" className="block py-2 text-gray-700 dark:text-gray-200 hover:text-primary hover:dark:text-primary-200" onClick={() => setMobileMenuOpen(false)}>Courses</Link>
            <Link to="/faculty" className="block py-2 text-gray-700 dark:text-gray-200 hover:text-primary hover:dark:text-primary-200" onClick={() => setMobileMenuOpen(false)}>Faculty</Link>
            <Link to="/placements" className="block py-2 text-gray-700 dark:text-gray-200 hover:text-primary hover:dark:text-primary-200" onClick={() => setMobileMenuOpen(false)}>Placements</Link>
            <Link to="/notices" className="block py-2 text-gray-700 dark:text-gray-200 hover:text-primary hover:dark:text-primary-200" onClick={() => setMobileMenuOpen(false)}>Notices</Link>
            <Link to="/events" className="block py-2 text-gray-700 dark:text-gray-200 hover:text-primary hover:dark:text-primary-200" onClick={() => setMobileMenuOpen(false)}>Events</Link>
            <Link to="/calendar" className="block py-2 text-gray-700 dark:text-gray-200 hover:text-primary hover:dark:text-primary-200" onClick={() => setMobileMenuOpen(false)}>Calendar</Link>
            <Link to="/contact" className="block py-2 text-gray-700 dark:text-gray-200 hover:text-primary hover:dark:text-primary-200" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            
            {user ? (
              <Link 
                to={`/${user.type}-dashboard`} 
                className="btn-primary text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            ) : (
              <Link 
                to="/login" 
                className="btn-accent text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
