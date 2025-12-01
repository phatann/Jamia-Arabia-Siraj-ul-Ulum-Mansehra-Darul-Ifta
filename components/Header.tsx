import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, BookOpen, PenTool, ShieldCheck, Globe, Sparkles, User, UserCheck } from 'lucide-react';
import { APP_NAME_ENG, APP_NAME_URDU, LOGO_PATH } from '../constants';
import { NavItem } from '../types';
import { useApp } from '../context/AppContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { language, toggleLanguage, currentMufti, currentUser, t } = useApp();

  const navLinks: NavItem[] = [
    { label: 'Home', labelUrdu: 'صفحہ اول', path: '/', icon: <Home className="w-4 h-4" /> },
    { label: 'Fatwas', labelUrdu: 'فتاویٰ جات', path: '/browse', icon: <BookOpen className="w-4 h-4" /> },
    { label: 'Ask Question', labelUrdu: 'سوال پوچھیں', path: '/ask', icon: <PenTool className="w-4 h-4" /> },
    { label: 'AI Sir', labelUrdu: 'اے آئی سر', path: '/ai-search', icon: <Sparkles className="w-4 h-4" /> },
  ];

  // Only show Mufti Panel link if a User is logged in or a Mufti is already logged in
  if (currentUser || currentMufti) {
    navLinks.push({ 
      label: 'Mufti Panel', 
      labelUrdu: 'مفتی پینل', 
      path: currentMufti ? '/mufti-panel' : '/mufti-login', 
      icon: <ShieldCheck className="w-4 h-4" /> 
    });
  }

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm relative z-50 border-t-4 border-primary-900 no-print">
      {/* Top Bar */}
      <div className="bg-gray-50 border-b border-gray-200 text-xs py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-gray-600 font-serif">
          <span className="font-urdu text-sm">14 جمادی الاول 1445</span>
          <div className="flex items-center space-x-4">
             {/* User Auth Link (Friend Button) */}
             <Link 
                to="/user-auth" 
                className={`flex items-center gap-1 font-bold transition-colors ${currentUser ? 'text-green-600' : 'text-gray-600 hover:text-black'}`}
                title={currentUser ? "User Profile" : "User Login"}
             >
                {currentUser ? <UserCheck className="w-4 h-4" /> : <User className="w-4 h-4" />}
                <span className="hidden sm:inline">{currentUser ? t('اکاؤنٹ', 'Account') : t('لاگ ان', 'Login')}</span>
             </Link>

             <button 
               onClick={toggleLanguage}
               className="flex items-center gap-1 hover:text-primary-900 font-bold transition-colors"
             >
               <Globe className="w-3 h-3" />
               {language === 'ur' ? 'English' : 'اردو'}
             </button>
          </div>
        </div>
      </div>

      {/* Main Branding Area */}
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="flex justify-center md:justify-start">
          <Link to="/" className={`flex items-center gap-3 md:gap-5 group ${language === 'ur' ? 'flex-row-reverse' : 'flex-row'}`}>
            {/* Logo - Placed directly next to name */}
            <img 
              src={LOGO_PATH} 
              alt="Jamia Logo" 
              className="h-20 w-20 md:h-28 md:w-28 object-contain drop-shadow-md hover:scale-105 transition-transform duration-300"
              onError={(e) => ((e.target as HTMLElement).style.display = 'none')}
            />
            
            {/* Titles */}
            <div className={`text-center ${language === 'ur' ? 'md:text-right' : 'md:text-left'}`}>
              <h1 className="text-2xl md:text-5xl font-urdu text-black font-bold leading-tight mb-1 tracking-tight">
                {language === 'ur' ? APP_NAME_URDU : APP_NAME_ENG}
              </h1>
              <h2 className="text-sm md:text-xl font-serif text-gray-600 font-bold uppercase tracking-wide">
                {language === 'ur' ? APP_NAME_ENG : 'Darul Ifta Online'}
              </h2>
            </div>
          </Link>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-black text-white shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-14">
            
            {/* Desktop Nav */}
            <nav className={`hidden md:flex space-x-0 w-full justify-center ${language === 'ur' ? 'flex-row-reverse' : 'flex-row'}`}>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex flex-col justify-center items-center px-6 h-14 border-b-4 transition-all duration-300 ${
                    isActive(link.path)
                      ? 'border-white bg-gray-900 text-white'
                      : 'border-transparent text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <span className={`${language === 'ur' ? 'font-urdu text-lg' : 'font-sans text-sm font-bold'} leading-none mb-0.5`}>
                    {language === 'ur' ? link.labelUrdu : link.label}
                  </span>
                </Link>
              ))}
            </nav>
            
            {/* Mobile Menu Toggle */}
            <div className={`flex w-full justify-between items-center md:hidden ${language === 'ur' ? 'flex-row-reverse' : 'flex-row'}`}>
                <span className="font-urdu text-lg text-gray-200">
                  {language === 'ur' ? 'فہرست' : 'Menu'}
                </span>
                <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-white hover:bg-gray-800"
                >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900 border-t border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-3 rounded-md border-r-4 border-transparent hover:bg-gray-800 hover:border-white text-white"
                >
                  <div className={`flex items-center ${language === 'ur' ? 'justify-end' : 'justify-start'}`}>
                    <span className={`${language === 'ur' ? 'font-urdu text-xl mr-3' : 'font-sans text-base ml-3'}`}>
                      {language === 'ur' ? link.labelUrdu : link.label}
                    </span>
                    {link.icon}
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