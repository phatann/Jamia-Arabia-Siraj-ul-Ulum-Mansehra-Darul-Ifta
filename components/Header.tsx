import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, BookOpen, PenTool, Home } from 'lucide-react';
import { APP_NAME_ENG, APP_NAME_URDU } from '../constants';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Home', path: '/', icon: <Home className="w-4 h-4" /> },
    { label: 'Browse Fatwas', path: '/browse', icon: <BookOpen className="w-4 h-4" /> },
    { label: 'Ask a Question', path: '/ask', icon: <PenTool className="w-4 h-4" /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-md relative z-50">
      {/* Top Bar - Green */}
      <div className="bg-primary-900 text-white text-xs py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <span className="opacity-90">Hijri Date: 14 Rabi' al-Thani 1445</span>
          <div className="space-x-4">
            <a href="#" className="hover:text-primary-200 transition-colors">Urdu</a>
            <span className="opacity-30">|</span>
            <a href="#" className="hover:text-primary-200 transition-colors font-bold">English</a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end space-y-4 md:space-y-0">
          
          {/* Logo Section */}
          <Link to="/" className="flex flex-col items-center md:items-start group">
            <h1 className="text-3xl md:text-4xl font-urdu text-primary-800 text-center md:text-left leading-relaxed mb-1" style={{ lineHeight: '1.4' }}>
              {APP_NAME_URDU}
            </h1>
            <div className="flex items-center space-x-2">
              <div className="h-1 w-12 bg-accent-500 rounded-full group-hover:w-20 transition-all duration-300"></div>
              <h2 className="text-sm md:text-base font-serif text-gray-600 tracking-wide uppercase font-semibold">
                {APP_NAME_ENG}
              </h2>
            </div>
          </Link>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:block w-full max-w-xs lg:max-w-md">
             <Link to="/browse" className="relative block group">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                 <Search className="h-5 w-5 text-gray-400 group-hover:text-primary-500 transition-colors" />
               </div>
               <div className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 text-gray-500 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-shadow">
                  Search Fatwas...
               </div>
             </Link>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="border-t border-gray-100 bg-white sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-14">
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center text-sm font-medium transition-colors border-b-2 py-4 ${
                    isActive(link.path)
                      ? 'border-primary-600 text-primary-700'
                      : 'border-transparent text-gray-600 hover:text-primary-600 hover:border-primary-200'
                  }`}
                >
                  {link.icon && <span className="mr-2">{link.icon}</span>}
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-primary-600 hover:bg-gray-50"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            
            {/* Mobile Search Icon */}
            <Link to="/browse" className="md:hidden p-2 text-gray-600">
               <Search className="h-6 w-6" />
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive(link.path)
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-primary-600'
                  }`}
                >
                  <div className="flex items-center">
                    {link.icon && <span className="mr-3">{link.icon}</span>}
                    {link.label}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;