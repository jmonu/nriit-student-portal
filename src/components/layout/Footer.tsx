
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* College Info */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
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
                <span className="font-bold text-lg">NRI Institute</span>
                <span className="text-xs text-gray-300">of Technology</span>
              </div>
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              Providing quality education and technical knowledge to prepare students for the challenges of tomorrow.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition-colors">
                <i className="fab fa-facebook-f text-xl"></i>
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition-colors">
                <i className="fab fa-twitter text-xl"></i>
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition-colors">
                <i className="fab fa-instagram text-xl"></i>
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition-colors">
                <i className="fab fa-linkedin-in text-xl"></i>
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-accent transition-colors">About Us</Link></li>
              <li><Link to="/courses" className="text-gray-400 hover:text-accent transition-colors">Courses</Link></li>
              <li><Link to="/faculty" className="text-gray-400 hover:text-accent transition-colors">Faculty</Link></li>
              <li><Link to="/placements" className="text-gray-400 hover:text-accent transition-colors">Placements</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-accent transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/notices" className="text-gray-400 hover:text-accent transition-colors">Notices</Link></li>
              <li><Link to="/events" className="text-gray-400 hover:text-accent transition-colors">Events</Link></li>
              <li><Link to="/calendar" className="text-gray-400 hover:text-accent transition-colors">Academic Calendar</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-accent transition-colors">Library</a></li>
              <li><a href="#" className="text-gray-400 hover:text-accent transition-colors">Alumni</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <address className="not-italic text-gray-400">
              <p className="mb-2">123 College Road,</p>
              <p className="mb-2">City, State 500001</p>
              <p className="mb-2">Phone: <a href="tel:+911234567890" className="hover:text-accent">+91 1234567890</a></p>
              <p>Email: <a href="mailto:info@nriit.edu" className="hover:text-accent">info@nriit.edu</a></p>
            </address>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-800 text-sm text-gray-500 flex flex-col md:flex-row md:justify-between">
          <p>&copy; {new Date().getFullYear()} NRI Institute of Technology. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Developed by <span className="text-accent font-medium">MONMAD</span></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
