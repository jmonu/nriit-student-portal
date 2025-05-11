
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BackToTop from '../ui/BackToTop';
import NewsTicker from '../ui/NewsTicker';
import ChatWidget from '../ui/ChatWidget';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  hideNewsTicker?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, hideNewsTicker = false }) => {
  const location = useLocation();
  const isDashboard = location.pathname.includes('dashboard');
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* News Ticker */}
      {!hideNewsTicker && !isDashboard && <NewsTicker />}
      
      {/* Main content with padding for header */}
      <main className="flex-1 pt-16">
        {children}
      </main>
      
      {!isDashboard && <Footer />}
      <BackToTop />
      {!isDashboard && <ChatWidget />}
    </div>
  );
};

export default Layout;
