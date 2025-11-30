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

  // Function to get Hijri date (Mock implementation)
  const getHijriDate = () => {
    return "14 Jumada al-Ula 1445"; 
  };

  return (
    <header className="bg-white shadow-sm relative z-50 border-t-4 border-secondary-600">
      {/* Top Bar - Light Gray with Date */}
      <div className="bg-gray-100 border-b border-gray-200 text-xs py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-gray-600 font-serif">
          <span>{getHijriDate()} | {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          <div className="space-x-3">
            <span className="cursor-pointer hover:text-primary-700">Urdu</span>
            <span className="text-gray-400">|</span>
            <span className="cursor-pointer font-bold text-primary-800">English</span>
          </div>
        </div>
      </div>

      {/* Main Header with Logo - Centered Layout */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo and Titles */}
          <Link to="/" className="flex flex-col md:flex-row items-center gap-6 w-full justify-center md:justify-start">
            <div className="relative group">
              <img 
                src={LOGO_PATH} 
                alt="Jamia Arabia Siraj-ul-Ulum Logo" 
                className="h-28 w-28 md:h-32 md:w-32 object-contain drop-shadow-md"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                }}
              />
               {/* Fallback if logo is missing */}
               <div className="hidden h-28 w-28 bg-primary-50 rounded-full flex flex-col items-center justify-center border-4 border-double border-primary-200 text-center p-2">
                  <span className="text-primary-800 font-bold text-xs">Siraj-ul-Ulum</span>
                  <span className="text-[10px] text-gray-500">Mansehra</span>
               </div>
            </div>
            
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-urdu text-primary-900 leading-tight mb-2 drop-shadow-sm">
                {APP_NAME_URDU}
              </h1>
              <div className="h-1 w-24 bg-secondary-500 mx-auto md:mx-0 mb-2 rounded-full"></div>
              <h2 className="text-lg md:text-xl font-serif text-gray-700 tracking-wide font-bold uppercase">
                {APP_NAME_ENG}
              </h2>
              <p className="text-sm text-gray-500 font-serif tracking-widest uppercase mt-1">
                The Premier Islamic Institution of Mansehra
              </p>
            </div>
          </Link>

          {/* Optional: Right side branding or crest */}
          <div className="hidden lg:block opacity-90">
             <div className="text-right">
                <p className="text-xs font-bold text-primary-800 uppercase tracking-widest mb-1">Darul Ifta Online</p>
                <div className="inline-flex flex-col items-end">
                  <span className="block w-full h-0.5 bg-primary-100 mb-1"></span>
                  <span className="block w-2/3 h-0.5 bg-primary-200 mb-1"></span>
                  <span className="block w-1/3 h-0.5 bg-secondary-400"></span>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar - Maroon Background */}
      <div className="bg-primary-900 text-white shadow-lg sticky top-0 z-40 border-t border-primary-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-14">
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center text-sm font-medium transition-all px-6 h-14 border-b-4 ${
                    isActive(link.path)
                      ? 'border-secondary-500 bg-primary-800 text-white'
                      : 'border-transparent text-primary-100 hover:bg-primary-800 hover:text-white hover:border-primary-600'
                  }`}
                >
                  {link.icon && <span className="mr-2 opacity-80">{link.icon}</span>}
                  {link.label}
                </Link>
              ))}
            </nav>
            
            {/* Search Icon (Link to browse) */}
            <div className="hidden md:block">
                <Link to="/browse" className="text-primary-100 hover:text-white p-2">
                    <Search className="w-5 h-5" />
                </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex w-full justify-between items-center md:hidden">
                <span className="font-serif font-bold text-lg text-secondary-200">Menu</span>
                <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-primary-100 hover:text-white hover:bg-primary-800 focus:outline-none"
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
                  className={`block px-3 py-3 rounded-md text-base font-medium border-l-4 ${
                    isActive(link.path)
                      ? 'bg-primary-900 text-white border-secondary-500'
                      : 'text-primary-100 hover:bg-primary-700 border-transparent'
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