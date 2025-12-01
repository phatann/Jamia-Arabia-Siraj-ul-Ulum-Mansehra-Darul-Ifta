import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AppContextType, Fatwa, Language, User, Mufti } from '../types';
import { MOCK_FATWAS } from '../constants';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ur');
  const [fatwas, setFatwas] = useState<Fatwa[]>(MOCK_FATWAS);
  
  // User State
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Mufti State
  const [muftis, setMuftis] = useState<Mufti[]>([
    { name: 'Mufti Abdullah Shah', email: 'mufti@example.com', username: 'Abdullahshah', password: 'ad123min1' }
  ]);
  const [currentMufti, setCurrentMufti] = useState<Mufti | null>(null);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ur' ? 'en' : 'ur');
  };

  const addFatwa = (newFatwa: Fatwa) => {
    setFatwas(prev => [newFatwa, ...prev]);
  };

  // --- USER AUTH ---
  const registerUser = (user: User): boolean => {
    if (users.find(u => u.email === user.email)) return false; // User exists
    setUsers([...users, user]);
    setCurrentUser(user); // Auto login
    return true;
  };

  const loginUser = (email: string, pass: string): boolean => {
    const user = users.find(u => u.email === email && u.password === pass);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logoutUser = () => setCurrentUser(null);

  // --- MUFTI AUTH ---
  const registerMufti = (mufti: Mufti): boolean => {
    if (muftis.find(m => m.username === mufti.username)) return false; // Username taken
    setMuftis([...muftis, mufti]);
    setCurrentMufti(mufti); // Auto login
    return true;
  };

  const loginMufti = (username: string, pass: string): boolean => {
    const mufti = muftis.find(m => m.username === username && m.password === pass);
    if (mufti) {
      setCurrentMufti(mufti);
      return true;
    }
    return false;
  };

  const logoutMufti = () => setCurrentMufti(null);

  // Translation helper
  const t = (urduText: string, englishText: string) => {
    return language === 'ur' ? urduText : englishText;
  };

  return (
    <AppContext.Provider value={{ 
      language, 
      toggleLanguage, 
      fatwas, 
      addFatwa, 
      
      currentUser,
      registerUser,
      loginUser,
      logoutUser,

      currentMufti,
      registerMufti,
      loginMufti,
      logoutMufti,

      t 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};