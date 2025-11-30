import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MOCK_FATWAS, CATEGORIES } from '../constants';
import FatwaCard from '../components/FatwaCard';
import { ArrowRight, Search, Book, Star, ChevronRight } from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  const featuredFatwas = MOCK_FATWAS.filter(f => f.featured).slice(0, 3);
  const latestFatwas = MOCK_FATWAS.slice(0, 8); // Show more items in list view

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/browse?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pattern-islamic">
      
      {/* Search & Welcome Section - "Deoband Style" Box */}
      <section className="bg-white border-b border-gray-200 py-10 shadow-sm">
        <div className="container mx-auto px-4">
           <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-900 mb-6">
                 Welcome to the Online Darul Ifta
              </h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                 Search our database of Islamic rulings issued by the Muftis of Jamia Arabia Siraj-ul-Ulum Mansehra.
              </p>

              <div className="bg-primary-50 p-6 rounded-lg border border-primary-100 shadow-inner max-w-3xl mx-auto">
                 <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-grow">
                        <input 
                            type="text" 
                            placeholder="Type keywords here (e.g. Namaz, Zakat, Nikah)..." 
                            className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="bg-primary-700 hover:bg-primary-800 text-white px-8 py-3 rounded font-bold shadow-sm transition-colors flex items-center justify-center"
                    >
                        <Search className="w-5 h-5 mr-2" />
                        Search Fatwa
                    </button>
                 </form>
                 <div className="mt-3 text-sm text-gray-500 flex justify-center gap-4">
                    <Link to="/browse" className="hover:text-primary-700 underline">Advanced Search</Link>
                    <Link to="/ask" className="hover:text-primary-700 underline">Ask New Question</Link>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Main Content Area - 2 Columns */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Column: Latest Fatwas */}
            <div className="lg:w-3/4">
               <div className="bg-white border border-gray-200 rounded-t-lg border-t-4 border-t-primary-800 p-6 mb-6 shadow-sm">
                  <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-100">
                      <h3 className="text-2xl font-serif font-bold text-gray-800 flex items-center">
                          <Book className="w-6 h-6 mr-2 text-primary-700" />
                          Latest Fatwas
                      </h3>
                      <Link to="/browse" className="text-primary-700 text-sm font-bold hover:underline">
                          View All &rarr;
                      </Link>
                  </div>
                  
                  <div className="space-y-4">
                      {latestFatwas.map(fatwa => (
                          <FatwaCard key={fatwa.id} fatwa={fatwa} />
                      ))}
                  </div>
               </div>
            </div>

            {/* Right Column: Sidebar (Categories & Featured) */}
            <div className="lg:w-1/4 space-y-6">
                
                {/* Ask Button Widget */}
                <Link to="/ask" className="block bg-secondary-600 hover:bg-secondary-700 text-white text-center py-4 px-6 rounded shadow-md transition-colors group">
                    <span className="block text-xl font-bold font-serif mb-1 group-hover:scale-105 transition-transform">Ask a Question</span>
                    <span className="text-secondary-100 text-sm">Submit your query to the Mufti</span>
                </Link>

                {/* Categories Widget */}
                <div className="bg-white border border-gray-200 rounded shadow-sm">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                        <h4 className="font-bold text-gray-800 font-serif">Categories</h4>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {CATEGORIES.map((cat, idx) => (
                            <Link 
                                key={idx} 
                                to={`/browse?category=${encodeURIComponent(cat)}`}
                                className="block px-4 py-2.5 text-sm text-gray-600 hover:bg-primary-50 hover:text-primary-700 hover:pl-5 transition-all flex justify-between items-center"
                            >
                                {cat}
                                <ChevronRight className="w-3 h-3 text-gray-300" />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Important Rulings Widget */}
                <div className="bg-primary-900 text-white rounded shadow-sm overflow-hidden">
                    <div className="px-4 py-3 border-b border-primary-800 bg-primary-950">
                        <h4 className="font-bold font-serif flex items-center">
                            <Star className="w-4 h-4 mr-2 text-accent-500" fill="currentColor" />
                            Important Rulings
                        </h4>
                    </div>
                    <div className="divide-y divide-primary-800">
                        {featuredFatwas.map(fatwa => (
                            <Link key={fatwa.id} to={`/fatwa/${fatwa.id}`} className="block px-4 py-3 hover:bg-primary-800 transition-colors">
                                <p className="text-xs text-accent-400 font-bold mb-1 uppercase">{fatwa.category}</p>
                                <p className="text-sm font-medium leading-snug">{fatwa.questionTitle}</p>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Info Widget */}
                <div className="bg-white border border-gray-200 rounded p-4 text-center shadow-sm">
                    <h5 className="font-bold text-gray-800 mb-2 font-serif">Contact Us</h5>
                    <p className="text-sm text-gray-600 mb-2">Jamia Arabia Siraj-ul-Ulum</p>
                    <p className="text-sm text-gray-600">Mansehra, KPK</p>
                    <p className="text-primary-700 font-bold mt-2">+92 316 5798851</p>
                </div>

            </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;