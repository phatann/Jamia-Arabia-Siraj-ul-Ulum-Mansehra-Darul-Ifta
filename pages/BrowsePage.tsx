import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, Sparkles } from 'lucide-react';
import { MOCK_FATWAS, CATEGORIES } from '../constants';
import FatwaCard from '../components/FatwaCard';
import { Fatwa } from '../types';
import { findRelatedFatwasWithAI } from '../services/geminiService';

const BrowsePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialQuery = searchParams.get('q') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [filteredFatwas, setFilteredFatwas] = useState<Fatwa[]>(MOCK_FATWAS);
  const [isSearchingAI, setIsSearchingAI] = useState(false);

  useEffect(() => {
    filterFatwas();
  }, [selectedCategory]);

  const filterFatwas = () => {
    let result = MOCK_FATWAS;
    
    if (selectedCategory !== 'All') {
      result = result.filter(f => f.category === selectedCategory);
    }
    
    if (searchQuery) {
      const lowerQ = searchQuery.toLowerCase();
      result = result.filter(f => 
        f.questionTitle.toLowerCase().includes(lowerQ) || 
        f.questionDetails.toLowerCase().includes(lowerQ) ||
        f.answer.toLowerCase().includes(lowerQ)
      );
    }
    
    setFilteredFatwas(result);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    // Basic filter first
    filterFatwas();

    // AI Enhanced Search if query exists
    if (searchQuery.length > 3) {
        setIsSearchingAI(true);
        const fatwaListString = MOCK_FATWAS.map(f => `ID: ${f.id}, Title: ${f.questionTitle}`).join('\n');
        const relevantIds = await findRelatedFatwasWithAI(searchQuery, fatwaListString);
        
        if (relevantIds.length > 0) {
            // Re-order fatwas to put AI matches first
            const matches = MOCK_FATWAS.filter(f => relevantIds.includes(f.id));
            const others = filteredFatwas.filter(f => !relevantIds.includes(f.id));
            // Remove duplicates from others that are in matches
            const uniqueOthers = others.filter(o => !matches.find(m => m.id === o.id));
            setFilteredFatwas([...matches, ...uniqueOthers]);
        }
        setIsSearchingAI(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-serif font-bold text-gray-800">
            Browse Fatwas
          </h1>
          <div className="text-sm text-gray-500">
            Showing {filteredFatwas.length} results
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-700 mb-4 flex items-center">
                <Filter className="w-4 h-4 mr-2" /> Categories
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory('All')}
                  className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    selectedCategory === 'All' 
                      ? 'bg-primary-50 text-primary-700 font-medium' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  All Categories
                </button>
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedCategory === cat 
                        ? 'bg-primary-50 text-primary-700 font-medium' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-6">
              <div className="relative flex shadow-sm rounded-md">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search keywords (e.g., Zakat, Prayer, Travel)..."
                  className="block w-full pl-4 pr-12 py-3 border border-gray-300 rounded-l-lg focus:ring-primary-500 focus:border-primary-500"
                />
                <button 
                  type="submit"
                  disabled={isSearchingAI}
                  className="inline-flex items-center px-6 py-3 border border-l-0 border-transparent text-base font-medium rounded-r-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none disabled:bg-primary-400"
                >
                  {isSearchingAI ? (
                    <Sparkles className="animate-spin w-5 h-5" />
                  ) : (
                    <Search className="w-5 h-5" />
                  )}
                </button>
              </div>
              {isSearchingAI && <p className="text-xs text-primary-600 mt-2 flex items-center"><Sparkles className="w-3 h-3 mr-1"/> AI is optimizing results...</p>}
            </form>

            {/* Results */}
            {filteredFatwas.length > 0 ? (
              <div className="space-y-4">
                {filteredFatwas.map(fatwa => (
                  <FatwaCard key={fatwa.id} fatwa={fatwa} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
                <div className="mx-auto h-12 w-12 text-gray-300 mb-3">
                  <Search className="h-full w-full" />
                </div>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No fatwas found</h3>
                <p className="mt-1 text-sm text-gray-500">Try adjusting your search or category filter.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowsePage;