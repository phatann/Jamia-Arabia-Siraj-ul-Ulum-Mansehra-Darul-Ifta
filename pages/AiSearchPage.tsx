import React, { useState } from 'react';
import { searchAiSir } from '../services/geminiService';
import { Search, Sparkles, ExternalLink, Globe } from 'lucide-react';
import { useApp } from '../context/AppContext';

const AiSearchPage: React.FC = () => {
  const { language, t } = useApp();
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<{text: string, sources: any[]} | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    setResult(null);
    const response = await searchAiSir(query);
    setResult(response);
    setLoading(false);
  };

  const isUrdu = language === 'ur';

  return (
    <div className={`min-h-screen bg-white py-12 ${isUrdu ? 'font-urdu' : 'font-sans'}`}>
      <div className="container mx-auto px-4 max-w-3xl">
        
        <div className="text-center mb-10">
           <div className="inline-block p-3 rounded-full bg-black mb-4 animate-fade-in">
              <Sparkles className="w-8 h-8 text-white" />
           </div>
           <h1 className="text-4xl font-bold text-gray-900 mb-3">
             {t('اے آئی سر - سمارٹ تلاش', 'AI Sir - Smart Search')}
           </h1>
           <p className="text-gray-500 text-lg">
             {t(
               'مستند دینی معلومات کے لیے دارالافتاء دیوبند اور دیگر ذرائع سے تلاش کریں۔', 
               'Search authorized Deoband sources and web for Islamic knowledge.'
             )}
           </p>
        </div>

        <form onSubmit={handleSearch} className="mb-10 relative">
            <div className={`flex rounded-lg shadow-lg overflow-hidden border border-gray-300 focus-within:ring-2 focus-within:ring-black ${isUrdu ? 'flex-row-reverse' : 'flex-row'}`}>
                <input 
                  type="text" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t('...یہاں لکھیں', 'Ask anything...')}
                  className={`w-full p-4 text-lg outline-none ${isUrdu ? 'text-right' : 'text-left'}`}
                  dir={isUrdu ? 'rtl' : 'ltr'}
                />
                <button 
                  type="submit" 
                  disabled={loading}
                  className="bg-black text-white px-8 py-3 font-bold hover:bg-gray-800 transition-colors flex items-center justify-center min-w-[100px]"
                >
                    {loading ? <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div> : <Search className="w-6 h-6" />}
                </button>
            </div>
        </form>

        {result && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm animate-fade-in">
                <div className="mb-6">
                    <h2 className={`text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 ${isUrdu ? 'flex-row-reverse' : 'flex-row'}`}>
                        <Globe className="w-5 h-5 text-gray-600" />
                        {t('اے آئی کا جواب', 'AI Response')}
                    </h2>
                    <div className={`prose max-w-none text-gray-800 leading-loose text-lg ${isUrdu ? 'text-right' : 'text-left'}`} dir={isUrdu ? 'rtl' : 'ltr'}>
                        <p>{result.text}</p>
                    </div>
                </div>

                {result.sources.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <h3 className={`text-sm font-bold text-gray-500 uppercase tracking-wide mb-3 ${isUrdu ? 'text-right' : 'text-left'}`}>
                            {t('حوالہ جات / ویب لنکس', 'Sources & Web Links')}
                        </h3>
                        <div className="grid grid-cols-1 gap-2">
                            {result.sources.map((chunk, idx) => {
                                const url = chunk.web?.uri;
                                const title = chunk.web?.title || 'Web Source';
                                if (!url) return null;
                                return (
                                    <a 
                                      key={idx} 
                                      href={url} 
                                      target="_blank" 
                                      rel="noreferrer"
                                      className={`block bg-white border border-gray-200 p-3 rounded hover:bg-gray-100 transition-colors flex items-center justify-between group ${isUrdu ? 'flex-row-reverse' : 'flex-row'}`}
                                    >
                                        <div className={`flex flex-col ${isUrdu ? 'text-right' : 'text-left'}`}>
                                            <span className="font-bold text-gray-800 text-sm group-hover:text-black">{title}</span>
                                            <span className="text-xs text-gray-400 truncate max-w-[250px]">{url}</span>
                                        </div>
                                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-black" />
                                    </a>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>
        )}

      </div>
    </div>
  );
};

export default AiSearchPage;