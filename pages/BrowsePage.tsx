import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, Sparkles, ChevronLeft, Home } from 'lucide-react';
import { CATEGORIES } from '../constants';
import FatwaCard from '../components/FatwaCard';
import { Fatwa } from '../types';
import { findRelatedFatwasWithAI, getSearchSuggestions } from '../services/geminiService';
import { useApp } from '../context/AppContext';

const BrowsePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { fatwas: allFatwas, language, t } = useApp(); // Use data from Context
  
  const initialCategory = searchParams.get('category') || 'All';
  const initialQuery = searchParams.get('q') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [filteredFatwas, setFilteredFatwas] = useState<Fatwa[]>(allFatwas);
  const [isSearchingAI, setIsSearchingAI] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const skipSuggestionFetch = useRef(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    filterFatwas();
  }, [selectedCategory, allFatwas]); // Re-run if data changes

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (skipSuggestionFetch.current) {
        skipSuggestionFetch.current = false;
        return;
      }
      if (!searchQuery || searchQuery.length < 3) {
        setSuggestions([]);
        return;
      }
      const context = allFatwas.map(f => f.questionTitle).join(", ");
      const results = await getSearchSuggestions(searchQuery, context);
      if (results && results.length > 0) {
        setSuggestions(results);
        setShowSuggestions(true);
      }
    };
    const timer = setTimeout(fetchSuggestions, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filterFatwas = (queryOverride?: string) => {
    let result = allFatwas;
    const queryToUse = queryOverride !== undefined ? queryOverride : searchQuery;
    
    // Filter by Category
    if (selectedCategory !== 'All' && selectedCategory !== 'تمام فتاویٰ') {
      result = result.filter(f => f.category === selectedCategory);
    }
    
    // Filter by Query
    if (queryToUse) {
      const lowerQ = queryToUse.toLowerCase();
      result = result.filter(f => 
        f.questionTitle.includes(queryToUse) || 
        f.questionDetails.includes(queryToUse) ||
        f.fatwaNumber.toLowerCase().includes(lowerQ)
      );
    }
    
    setFilteredFatwas(result);
    setCurrentPage(1);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    filterFatwas();

    if (searchQuery.length > 3) {
        setIsSearchingAI(true);
        const fatwaListString = allFatwas.map(f => `ID: ${f.id}, Title: ${f.questionTitle}`).join('\n');
        const relevantIds = await findRelatedFatwasWithAI(searchQuery, fatwaListString);
        
        if (relevantIds.length > 0) {
            const matches = allFatwas.filter(f => relevantIds.includes(f.id));
            const others = filteredFatwas.filter(f => !relevantIds.includes(f.id));
            const uniqueOthers = others.filter(o => !matches.find(m => m.id === o.id));
            setFilteredFatwas([...matches, ...uniqueOthers]);
        }
        setIsSearchingAI(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    skipSuggestionFetch.current = true;
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    filterFatwas(suggestion);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFatwas.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredFatwas.length / itemsPerPage);

  const isUrdu = language === 'ur';

  return (
    <div className={`min-h-screen bg-white py-8 ${isUrdu ? 'font-urdu' : 'font-sans'}`}>
      <div className="container mx-auto px-4">
        
        <div className={`flex items-center gap-2 text-sm text-gray-500 mb-6 border-b border-gray-200 pb-4 ${isUrdu ? 'flex-row-reverse' : 'flex-row'}`}>
             <Link to="/" className="hover:text-black"><Home className="w-4 h-4" /></Link>
             <span>/</span>
             <span className="font-bold text-black">{t('فتاویٰ جات', 'Fatwas')}</span>
             {selectedCategory !== 'All' && (
                 <>
                    <span>/</span>
                    <span>{selectedCategory}</span>
                 </>
             )}
        </div>

        <div className={`flex flex-col gap-8 ${isUrdu ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>

          {/* MAIN CONTENT */}
          <div className="lg:w-3/4">
            
            <div className={`flex justify-between items-center mb-6 ${isUrdu ? 'flex-row-reverse' : 'flex-row'}`}>
                <h1 className={`text-2xl font-bold text-black ${isUrdu ? 'border-r-4 pr-3' : 'border-l-4 pl-3'} border-gray-600`}>
                    {selectedCategory === 'All' ? t('تمام فتاویٰ', 'All Fatwas') : selectedCategory}
                </h1>
                <span className="text-sm text-gray-500 font-sans bg-gray-100 px-2 py-1 rounded">
                    Total: {filteredFatwas.length}
                </span>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-8 relative z-10 bg-gray-50 p-4 rounded border border-gray-200">
              <div className={`relative flex shadow-sm rounded-md ${isUrdu ? 'flex-row-reverse' : 'flex-row'}`}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  placeholder={t('...الفاظ لکھ کر تلاش کریں', 'Search keywords...')}
                  className={`block w-full px-4 py-2 border border-gray-300 ${isUrdu ? 'rounded-r text-right' : 'rounded-l text-left'} focus:ring-black focus:border-black text-lg`}
                  dir={isUrdu ? 'rtl' : 'ltr'}
                />
                <button 
                  type="submit"
                  disabled={isSearchingAI}
                  className={`inline-flex items-center px-6 py-2 border border-transparent text-base font-medium ${isUrdu ? 'rounded-l border-l-0' : 'rounded-r border-r-0'} text-white bg-black hover:bg-gray-800 focus:outline-none transition-all`}
                >
                  {isSearchingAI ? <Sparkles className="animate-spin w-5 h-5" /> : t('تلاش', 'Search')}
                </button>

                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-full right-0 w-full mt-1 bg-white border border-gray-200 rounded shadow-lg overflow-hidden z-50">
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className={`px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-50 text-gray-700 ${isUrdu ? 'text-right' : 'text-left'}`}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </form>

            <div className="bg-white">
              {currentItems.length > 0 ? (
                <div className="flex flex-col">
                  {currentItems.map(fatwa => (
                    <FatwaCard key={fatwa.id} fatwa={fatwa} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border border-dashed border-gray-300 rounded bg-gray-50">
                  <h3 className="text-lg font-bold text-gray-900">{t('کوئی فتویٰ نہیں ملا', 'No fatwas found')}</h3>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-8 gap-2 font-sans dir-ltr">
                    <button 
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
                    >
                        Prev
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-black text-white border-black' : 'hover:bg-gray-100'}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button 
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
          </div>

          {/* SIDEBAR */}
          <div className="lg:w-1/4">
            <div className="bg-white border border-gray-200 rounded shadow-sm sticky top-20">
              <div className={`bg-gray-800 text-white px-4 py-3 rounded-t ${isUrdu ? 'text-right' : 'text-left'}`}>
                <h3 className={`font-bold text-lg flex items-center ${isUrdu ? 'justify-end' : 'justify-start'} gap-2`}>
                    {t('فتاویٰ کے ابواب', 'Categories')} <Filter className="w-4 h-4" />
                </h3>
              </div>
              <div className="divide-y divide-gray-100">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => {
                        setSelectedCategory(cat.labelUrdu);
                        window.scrollTo(0, 0);
                    }}
                    className={`w-full px-4 py-3 transition-colors flex items-center justify-between group ${
                      selectedCategory === cat.labelUrdu || (selectedCategory === 'All' && cat.id === 'all')
                        ? 'bg-gray-100 text-black font-bold' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                    } ${isUrdu ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}
                  >
                    <span>{isUrdu ? cat.labelUrdu : cat.labelEnglish}</span>
                    {selectedCategory === cat.labelUrdu && <ChevronLeft className={`w-4 h-4 ${isUrdu ? '' : 'rotate-180'}`} />}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BrowsePage;