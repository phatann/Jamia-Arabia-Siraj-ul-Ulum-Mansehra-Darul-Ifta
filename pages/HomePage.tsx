import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MOCK_FATWAS, CATEGORIES } from '../constants';
import FatwaCard from '../components/FatwaCard';
import { Search, ChevronLeft, BookOpen, Star } from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  const featuredFatwas = MOCK_FATWAS.filter(f => f.featured).slice(0, 5);
  const latestFatwas = MOCK_FATWAS.slice(0, 10);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/browse?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pattern-islamic">
      
      {/* Search Section */}
      <section className="bg-white border-b border-gray-200 py-12 shadow-sm">
        <div className="container mx-auto px-4">
           <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-urdu font-bold text-primary-900 mb-4 leading-tight">
                 دارالافتاء آن لائن
              </h2>
              <p className="text-gray-600 mb-8 text-lg font-urdu">
                 جامعہ عربیہ سراج العلوم مانسہرہ کے مستند مفتیان کرام کے فتاویٰ کا عظیم ذخیرہ
              </p>

              <div className="bg-primary-50 p-2 rounded-lg border border-primary-200 shadow-inner">
                 <form onSubmit={handleSearch} className="flex flex-row-reverse gap-0">
                    <button 
                        type="submit" 
                        className="bg-primary-700 hover:bg-primary-800 text-white px-6 py-3 rounded-l-md font-urdu text-lg shadow-sm transition-colors"
                    >
                        تلاش کریں
                    </button>
                    <input 
                        type="text" 
                        placeholder="...یہاں لکھیں (مثلاً: نماز، زکوٰۃ، نکاح)" 
                        className="w-full px-4 py-3 text-right font-urdu text-lg border-y border-r border-gray-300 rounded-r-md focus:ring-0 focus:border-primary-500 outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        dir="rtl"
                    />
                 </form>
              </div>
              <div className="mt-4 flex justify-center gap-6 font-urdu text-sm text-gray-500">
                  <Link to="/ask" className="hover:text-primary-700 border-b border-dashed border-gray-400 pb-1">نیا سوال پوچھیں</Link>
                  <Link to="/browse" className="hover:text-primary-700 border-b border-dashed border-gray-400 pb-1">ایڈوانس تلاش</Link>
              </div>
           </div>
        </div>
      </section>

      {/* Main Content - RTL Layout */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row-reverse gap-8">
            
            {/* Right Column (Main Content) */}
            <div className="lg:w-3/4">
               {/* New Fatwas Header */}
               <div className="flex flex-row-reverse justify-between items-center mb-6 pb-2 border-b-2 border-primary-100">
                  <h3 className="text-2xl md:text-3xl font-urdu font-bold text-primary-900 flex items-center flex-row-reverse">
                      <BookOpen className="w-6 h-6 ml-3 text-secondary-600" />
                      تازہ ترین فتاویٰ
                  </h3>
                  <Link to="/browse" className="text-primary-700 font-urdu text-lg hover:underline">
                      سب دیکھیں
                  </Link>
               </div>
               
               <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                  <div className="divide-y divide-gray-100">
                      {latestFatwas.map(fatwa => (
                          <FatwaCard key={fatwa.id} fatwa={fatwa} />
                      ))}
                  </div>
               </div>
            </div>

            {/* Left Column (Sidebar) */}
            <div className="lg:w-1/4 space-y-6">
                
                {/* Ask Widget */}
                <Link to="/ask" className="block bg-secondary-700 hover:bg-secondary-800 text-white text-center py-6 px-4 rounded-lg shadow-md transition-all group">
                    <span className="block text-3xl font-urdu font-bold mb-2">فتویٰ پوچھیں</span>
                    <span className="text-secondary-100 font-urdu text-sm">اپنے شرعی مسائل کا حل جاننے کے لیے</span>
                </Link>

                {/* Categories Widget - Deoband Style */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="bg-primary-50 px-4 py-3 border-b border-primary-100 text-right">
                        <h4 className="font-bold text-primary-900 font-urdu text-xl">فتاویٰ کے ابواب</h4>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {CATEGORIES.slice(1).map((cat) => ( // Skip 'All'
                            <Link 
                                key={cat.id} 
                                to={`/browse?category=${encodeURIComponent(cat.labelUrdu)}`}
                                className="block px-4 py-3 text-right font-urdu text-gray-700 hover:bg-gray-50 hover:text-primary-700 hover:pr-6 transition-all flex flex-row-reverse justify-between items-center group"
                            >
                                <span className="text-lg">{cat.labelUrdu}</span>
                                <ChevronLeft className="w-4 h-4 text-gray-300 group-hover:text-primary-400" />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Important Fatwas */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                    <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 text-right">
                        <h4 className="font-bold font-urdu text-xl text-gray-800 flex items-center justify-end">
                            اہم فتاویٰ <Star className="w-4 h-4 ml-2 text-accent-500 fill-current" />
                        </h4>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {featuredFatwas.map(fatwa => (
                            <Link key={fatwa.id} to={`/fatwa/${fatwa.id}`} className="block px-4 py-3 hover:bg-gray-50 transition-colors text-right">
                                <p className="text-xs text-secondary-600 font-urdu mb-1">{fatwa.category}</p>
                                <p className="text-base font-urdu text-gray-800 leading-snug">{fatwa.questionTitle}</p>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Contact Widget */}
                <div className="bg-primary-900 text-white rounded-lg p-6 text-center shadow-lg" id="contact">
                    <h5 className="font-bold text-xl font-urdu mb-2">رابطہ برائے دارالافتاء</h5>
                    <p className="font-urdu text-primary-200 mb-1">جامعہ عربیہ سراج العلوم مانسہرہ</p>
                    <p className="font-urdu text-primary-200">خیبر پختونخوا، پاکستان</p>
                    <div className="mt-4 pt-4 border-t border-primary-800">
                        <p className="text-2xl font-bold dir-ltr">+92 316 5798851</p>
                    </div>
                </div>

            </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
