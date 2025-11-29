import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, BookOpen, PenTool, Home } from 'lucide-react';
import { APP_NAME_ENG, APP_NAME_URDU, LOGO_PATH } from '../constants';

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
    <header className="bg-white shadow-sm relative z-50 border-t-4 border-primary-800">
      {/* Top Bar - Maroon */}
      <div className="bg-white border-b border-gray-100 text-xs py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-gray-500">
          <span className="opacity-90 font-serif">Hijri Date: 14 Rabi' al-Thani 1445</span>
          <div className="space-x-4">
            <a href="#" className="hover:text-primary-700 transition-colors">Urdu</a>
            <span className="opacity-30">|</span>
            <a href="#" className="hover:text-primary-700 transition-colors font-bold text-primary-800">English</a>
          </div>
        </div>
      </div>

      {/* Main Header with Logo */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center space-y-4 md:space-y-0">
          
          {/* Logo Section */}
          <Link to="/" className="flex flex-col md:flex-row items-center md:items-start gap-4 group text-center md:text-left">
            <div className="relative">
              <img 
                src={LOGO_PATH} 
                alt="Logo" 
                className="h-24 w-24 md:h-28 md:w-28 object-contain drop-shadow-sm"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                }}
              />
              {/* Fallback if logo.png is missing */}
              <div className="hidden h-24 w-24 bg-primary-50 rounded-full flex items-center justify-center border-2 border-primary-100">
                 <span className="text-primary-700 font-bold text-xs">Logo</span>
              </div>
            </div>
            
            <div className="flex flex-col justify-center h-full pt-2">
              <h1 className="text-3xl md:text-5xl font-urdu text-primary-900 leading-tight mb-1" style={{ lineHeight: '1.4' }}>
                {APP_NAME_URDU}
              </h1>
              <h2 className="text-sm md:text-lg font-serif text-gray-600 tracking-wide uppercase font-semibold border-t border-gray-200 pt-1 mt-1 inline-block md:w-max">
                {APP_NAME_ENG}
              </h2>
            </div>
          </Link>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:block w-full max-w-xs">
             <Link to="/browse" className="relative block group">
               <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                 <Search className="h-5 w-5 text-primary-700" />
               </div>
               <div className="block w-full pl-4 pr-10 py-2 border-2 border-primary-100 rounded-full leading-5 bg-white text-gray-500 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-primary-600 sm:text-sm transition-all shadow-sm">
                  Search Fatwas...
               </div>
             </Link>
          </div>
        </div>
      </div>

      {/* Navigation Bar - Classic Portal Style */}
      <div className="bg-primary-900 text-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-12">
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-1 mx-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center text-sm font-medium transition-all px-6 py-4 border-b-4 ${
                    isActive(link.path)
                      ? 'border-accent-500 bg-primary-800 text-white'
                      : 'border-transparent text-primary-100 hover:bg-primary-800 hover:text-white hover:border-primary-700'
                  }`}
                >
                  {link.icon && <span className="mr-2 opacity-70">{link.icon}</span>}
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex w-full justify-between items-center md:hidden">
                <span className="font-serif font-bold text-lg">{APP_NAME_ENG.split(' ')[0]}</span>
                <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-primary-100 hover:text-white hover:bg-primary-800"
                >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-primary-800 border-t border-primary-700">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive(link.path)
                      ? 'bg-primary-900 text-white'
                      : 'text-primary-100 hover:bg-primary-700'
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