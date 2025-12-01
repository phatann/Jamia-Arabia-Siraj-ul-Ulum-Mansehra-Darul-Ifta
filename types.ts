import React from 'react';

export type Language = 'ur' | 'en';

export interface User {
  email: string;
  password?: string;
  phone?: string;
}

export interface Mufti {
  name: string;
  email: string;
  username: string;
  password?: string;
}

export interface Fatwa {
  id: string;
  fatwaNumber: string;
  questionTitle: string; // Urdu
  questionDetails: string; // Urdu
  answer: string; // Urdu
  category: string;
  date: string; // Hijri/Gregorian
  views: number;
  featured?: boolean;
  references?: string[]; // Books/Sources
  muftiName?: string;
}

export interface CategoryItem {
  id: string;
  labelUrdu: string;
  labelEnglish: string;
}

export interface NavItem {
  label: string;
  labelUrdu: string;
  path: string;
  icon?: React.ReactNode;
}

export interface SearchResult {
  fatwas: Fatwa[];
  aiAnalysis?: string;
}

export interface AppContextType {
  language: Language;
  toggleLanguage: () => void;
  fatwas: Fatwa[];
  addFatwa: (fatwa: Fatwa) => void;
  
  // User Auth
  currentUser: User | null;
  registerUser: (user: User) => boolean;
  loginUser: (email: string, pass: string) => boolean;
  logoutUser: () => void;

  // Mufti Auth
  currentMufti: Mufti | null;
  registerMufti: (mufti: Mufti) => boolean;
  loginMufti: (username: string, pass: string) => boolean;
  logoutMufti: () => void;

  t: (urduText: string, englishText: string) => string;
}