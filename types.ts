import React from 'react';

export interface Fatwa {
  id: string;
  questionTitle: string;
  questionDetails: string;
  answer: string;
  category: Category;
  fatwaNumber: string;
  date: string;
  views: number;
  featured?: boolean;
}

export enum Category {
  BELIEFS = "Beliefs & Creed",
  PRAYER = "Prayer (Salah)",
  FASTING = "Fasting (Sawm)",
  ZAKAT = "Zakat & Charity",
  MARRIAGE = "Marriage & Divorce",
  BUSINESS = "Business & Trade",
  INHERITANCE = "Inheritance",
  SOCIAL = "Social Manners",
  MISC = "Miscellaneous"
}

export interface NavItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
}

export interface SearchResult {
  fatwas: Fatwa[];
  aiAnalysis?: string; // Optional analysis from Gemini
}