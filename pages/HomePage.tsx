import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_FATWAS, CATEGORIES } from '../constants';
import FatwaCard from '../components/FatwaCard';
import { ArrowRight, Book } from 'lucide-react';

const HomePage: React.FC = () => {
  const featuredFatwas = MOCK_FATWAS.filter(f => f.featured).slice(0, 3);
  const latestFatwas = MOCK_FATWAS.slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-primary-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pattern-islamic"></div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10 text-center">
          <div className="inline-block p-2 px-4 rounded-full bg-primary-700/50 border border-primary-600 text-primary-100 text-sm font-medium mb-6 backdrop-blur-sm">
            Welcome to the Online Darul Ifta
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
            Guidance for a <br />
            <span className="text-accent-400">Righteous Life</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Authentic Islamic rulings derived from the Quran and Sunnah by qualified Muftis of Jamia Arabia Siraj-ul-Ulum Mansehra.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/ask" 
              className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-3 rounded-md font-semibold text-lg transition-colors shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              Ask a Question
            </Link>
            <Link 
              to="/browse" 
              className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-3 rounded-md font-semibold text-lg transition-colors flex items-center justify-center backdrop-blur-sm"
            >
              Browse Fatwas
            </Link>
          </div>
        </div>
        
        {/* Decorative curve at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gray-50" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }}></div>
      </section>

      {/* Categories Grid */}
      <section className="py-12 container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-800">Browse by Category</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat, idx) => (
            <Link 
              key={idx} 
              to={`/browse?category=${encodeURIComponent(cat)}`}
              className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-primary-300 hover:-translate-y-1 transition-all duration-300 text-center group"
            >
              <div className="w-12 h-12 mx-auto bg-primary-50 rounded-full flex items-center justify-center text-primary-600 mb-3 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                <Book className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-700 group-hover:text-primary-700">{cat}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured & Latest Section */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Main Content: Latest Fatwas */}
            <div className="lg:w-2/3">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-800 border-l-4 border-accent-500 pl-4">Latest Fatwas</h2>
                <Link to="/browse" className="text-primary-600 hover:text-primary-800 font-medium flex items-center text-sm">
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
              
              <div className="grid gap-6">
                {latestFatwas.map(fatwa => (
                  <FatwaCard key={fatwa.id} fatwa={fatwa} />
                ))}
              </div>
            </div>

            {/* Sidebar: Featured/Important */}
            <div className="lg:w-1/3">
              <div className="bg-primary-50 rounded-xl p-6 border border-primary-100 sticky top-24">
                <h3 className="text-xl font-serif font-bold text-primary-900 mb-6 flex items-center">
                  <span className="w-2 h-2 bg-accent-500 rounded-full mr-2"></span>
                  Important Rulings
                </h3>
                <div className="space-y-6">
                  {featuredFatwas.map(fatwa => (
                    <div key={fatwa.id} className="border-b border-primary-200 pb-4 last:border-0 last:pb-0">
                      <Link to={`/fatwa/${fatwa.id}`} className="block group">
                        <span className="text-xs text-primary-600 font-semibold uppercase tracking-wider">{fatwa.category}</span>
                        <h4 className="font-medium text-gray-800 group-hover:text-primary-700 transition-colors mt-1">
                          {fatwa.questionTitle}
                        </h4>
                      </Link>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-primary-200">
                   <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-bold text-gray-800 mb-2">Daily Hadith</h4>
                      <p className="text-sm text-gray-600 italic">"The best among you are those who have the best manners and character."</p>
                      <p className="text-xs text-gray-400 mt-2 text-right">- Sahih Bukhari</p>
                   </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;