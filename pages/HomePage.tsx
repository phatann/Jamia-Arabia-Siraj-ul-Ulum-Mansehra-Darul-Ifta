import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_FATWAS, CATEGORIES } from '../constants';
import FatwaCard from '../components/FatwaCard';
import { ArrowRight, Book, Star } from 'lucide-react';

const HomePage: React.FC = () => {
  const featuredFatwas = MOCK_FATWAS.filter(f => f.featured).slice(0, 3);
  const latestFatwas = MOCK_FATWAS.slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Classic White/Maroon Style */}
      <section className="bg-white relative overflow-hidden border-b border-gray-200">
        <div className="absolute inset-0 opacity-5 pattern-islamic"></div>
        <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
                <div className="inline-block px-3 py-1 bg-primary-50 text-primary-800 text-xs font-bold uppercase tracking-widest mb-4 border border-primary-100 rounded">
                    Darul Ifta Online
                </div>
                <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-6 leading-tight">
                    Guidance from the <br />
                    <span className="text-primary-700">Light of Knowledge</span>
                </h1>
                <p className="text-lg text-gray-600 mb-8 max-w-xl leading-relaxed">
                    Authentic Islamic rulings derived from the Quran and Sunnah by qualified Muftis of Jamia Arabia Siraj-ul-Ulum Mansehra.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <Link 
                    to="/ask" 
                    className="bg-primary-700 hover:bg-primary-800 text-white px-8 py-3 rounded shadow-sm font-semibold text-lg transition-all hover:shadow-md flex items-center justify-center"
                    >
                    Ask a Question
                    </Link>
                    <Link 
                    to="/browse" 
                    className="bg-white hover:bg-gray-50 text-primary-800 border-2 border-primary-100 hover:border-primary-300 px-8 py-3 rounded font-semibold text-lg transition-all flex items-center justify-center"
                    >
                    Search Fatwas
                    </Link>
                </div>
            </div>
            {/* Decorative Element / Geometric Art */}
            <div className="md:w-5/12 flex justify-center">
                <div className="relative w-64 h-64 md:w-80 md:h-80 opacity-90">
                     <div className="absolute inset-0 border-8 border-primary-50 rounded-full animate-[spin_60s_linear_infinite]"></div>
                     <div className="absolute inset-4 border-4 border-primary-100 rounded-full border-dashed animate-[spin_40s_linear_infinite_reverse]"></div>
                     <div className="absolute inset-0 flex items-center justify-center">
                         <Star className="w-32 h-32 text-primary-100" fill="currentColor" />
                     </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured & Latest Section */}
      <section className="py-12 container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Sidebar: Categories & Important */}
            <div className="lg:w-1/3 space-y-8">
               {/* Categories */}
               <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-xl font-serif font-bold text-primary-900 mb-4 pb-2 border-b border-gray-100">
                      Fatwa Categories
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {CATEGORIES.map((cat, idx) => (
                        <Link 
                        key={idx} 
                        to={`/browse?category=${encodeURIComponent(cat)}`}
                        className="flex items-center p-3 rounded hover:bg-primary-50 hover:text-primary-700 text-gray-700 transition-colors group"
                        >
                        <span className="w-2 h-2 bg-primary-200 rounded-full mr-3 group-hover:bg-primary-600 transition-colors"></span>
                        {cat}
                        </Link>
                    ))}
                  </div>
               </div>

               {/* Important Rulings */}
               <div className="bg-primary-900 rounded-lg p-6 text-white shadow-lg">
                <h3 className="text-xl font-serif font-bold mb-6 flex items-center text-accent-100">
                  <Star className="w-5 h-5 mr-2 text-accent-500" fill="currentColor" />
                  Featured Rulings
                </h3>
                <div className="space-y-6">
                  {featuredFatwas.map(fatwa => (
                    <div key={fatwa.id} className="border-b border-primary-800 pb-4 last:border-0 last:pb-0">
                      <Link to={`/fatwa/${fatwa.id}`} className="block group">
                        <span className="text-xs text-accent-400 font-semibold uppercase tracking-wider">{fatwa.category}</span>
                        <h4 className="font-medium text-white group-hover:text-accent-200 transition-colors mt-1">
                          {fatwa.questionTitle}
                        </h4>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content: Latest Fatwas */}
            <div className="lg:w-2/3">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-800">
                    Latest Questions
                </h2>
                <Link to="/browse" className="text-primary-700 hover:text-primary-900 font-medium flex items-center text-sm border border-primary-100 px-4 py-2 rounded hover:bg-primary-50 transition-colors">
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
              
              <div className="grid gap-6">
                {latestFatwas.map(fatwa => (
                  <FatwaCard key={fatwa.id} fatwa={fatwa} />
                ))}
              </div>
            </div>

          </div>
      </section>
    </div>
  );
};

export default HomePage;