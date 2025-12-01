import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Calendar, Printer, Share2, ChevronRight, ChevronLeft, Book, Eye, Download } from 'lucide-react';

const FatwaDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { fatwas, language, t } = useApp();
  const fatwa = fatwas.find(f => f.id === id);

  if (!fatwa) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('فتویٰ نہیں ملا', 'Fatwa Not Found')}</h2>
        <Link to="/browse" className="text-black hover:underline text-xl">{t('فہرست کی طرف واپس', 'Back to List')}</Link>
      </div>
    );
  }

  const isUrdu = language === 'ur';

  const handleDownload = () => {
    const textContent = `
-------------------------------------------------------
${t('جامعہ عربیہ سراج العلوم مانسہرہ', 'JAMIA ARABIA SIRAJ-UL-ULUM MANSEHRA')}
${t('دارالافتاء آن لائن', 'DARUL IFTA ONLINE')}
-------------------------------------------------------

${t('فتویٰ نمبر', 'Fatwa Number')}: ${fatwa.fatwaNumber}
${t('تاریخ', 'Date')}: ${fatwa.date}
${t('کیٹیگری', 'Category')}: ${fatwa.category}

=======================================================
${t('سوال', 'QUESTION')}:
${fatwa.questionTitle}

${fatwa.questionDetails}
=======================================================

${t('الجواب', 'ANSWER')}:

${fatwa.answer}

=======================================================
${t('مفتی', 'Mufti')}: ${fatwa.muftiName}
${fatwa.references ? `\n${t('حوالہ جات', 'References')}:\n` + fatwa.references.join('\n') : ''}

-------------------------------------------------------
Downloaded from: https://darulifta-deoband.com
`;

    const element = document.createElement("a");
    const file = new Blob([textContent], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `Fatwa-${fatwa.fatwaNumber.replace(/\//g, '-')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className={`min-h-screen bg-gray-50 py-8 ${isUrdu ? 'font-urdu' : 'font-sans'}`}>
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Navigation Breadcrumb (Hidden on Print) */}
        <div className={`flex items-center gap-2 mb-4 text-sm text-gray-500 print:hidden ${isUrdu ? 'flex-row-reverse' : 'flex-row'}`}>
            <Link to="/" className="inline-flex items-center hover:text-black transition-colors">
               {t('صفحہ اول', 'Home')} {isUrdu ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </Link>
            <Link to="/browse" className="inline-flex items-center hover:text-black transition-colors">
              {t('فتاویٰ لسٹ', 'Fatwa List')} {isUrdu ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </Link>
            <span className="font-bold text-black">{fatwa.fatwaNumber}</span>
        </div>

        {/* Paper Container */}
        <div className="bg-white shadow-xl border border-gray-200 print:shadow-none print:border-none print:w-full">
          
          {/* Header Info Table Style */}
          <div className="border-b-2 border-gray-800 bg-gray-100 p-6 print:bg-white print:border-b-4 print:border-black">
             <div className={`flex justify-between items-start gap-4 ${isUrdu ? 'md:flex-row-reverse flex-col text-right' : 'md:flex-row flex-col text-left'}`}>
                <div className="w-full">
                   <h1 className="text-2xl md:text-3xl font-bold text-black leading-normal mb-2">
                       {fatwa.questionTitle}
                   </h1>
                   <div className={`flex gap-4 text-sm text-gray-600 mt-2 ${isUrdu ? 'flex-row-reverse' : 'flex-row'}`}>
                       <span className="font-bold text-black bg-white px-2 border rounded">{fatwa.category}</span>
                       <span className="text-gray-400">|</span>
                       <span className="font-mono font-bold">{fatwa.fatwaNumber}</span>
                   </div>
                </div>
                <div className={`flex flex-col gap-1 text-xs text-gray-500 min-w-max ${isUrdu ? 'items-end' : 'items-start'}`}>
                   <div className="flex items-center gap-1 bg-white px-2 py-1 border rounded print:hidden">
                      <Eye className="w-3 h-3" /> <span>{fatwa.views}</span>
                   </div>
                   <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {fatwa.date}
                   </div>
                </div>
             </div>
          </div>

          {/* Content Body */}
          <div className={`p-8 md:p-12 ${isUrdu ? 'text-right' : 'text-left'}`}>
            
            {/* Question Section */}
            <div className="mb-10">
               <div className={`flex items-center mb-4 border-b border-gray-200 pb-2 ${isUrdu ? 'flex-row-reverse' : 'flex-row'}`}>
                   <span className="text-2xl font-bold text-gray-900 bg-gray-100 px-4 py-1 rounded print:bg-transparent print:p-0">
                     {t('سوال', 'Question')}
                   </span>
               </div>
               <p className="text-xl text-gray-800 leading-loose text-justify" dir={isUrdu ? 'rtl' : 'ltr'}>
                   {fatwa.questionDetails}
               </p>
            </div>

            {/* Answer Section */}
            <div className="mb-8">
               <div className={`flex items-center mb-6 border-b border-gray-200 pb-2 ${isUrdu ? 'flex-row-reverse' : 'flex-row'}`}>
                   <span className="text-2xl font-bold text-black bg-gray-100 px-4 py-1 rounded print:bg-transparent print:p-0">
                     {t('الجواب حامداً و مصلیاً', 'The Answer')}
                   </span>
               </div>
               
               <div className="prose prose-xl max-w-none text-black leading-loose text-justify" dir={isUrdu ? 'rtl' : 'ltr'}>
                  <p>{fatwa.answer}</p>
               </div>
            </div>

            {/* References Section - Boxed */}
            {fatwa.references && fatwa.references.length > 0 && (
                <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200 print:border-black print:bg-white">
                    <h3 className={`text-lg font-bold text-gray-800 mb-3 flex items-center border-b border-gray-300 pb-2 ${isUrdu ? 'justify-end' : 'justify-start'}`}>
                         {isUrdu && <Book className="w-4 h-4 ml-2" />}
                         {t('حوالہ جات و مصادر', 'References & Sources')}
                         {!isUrdu && <Book className="w-4 h-4 ml-2" />}
                    </h3>
                    <ul className={`space-y-2 text-gray-700 text-lg list-none ${isUrdu ? 'text-right' : 'text-left'}`}>
                        {fatwa.references.map((ref, idx) => (
                            <li key={idx} className={`flex items-start gap-2 ${isUrdu ? 'justify-end' : 'justify-start'}`}>
                                <span>{ref}</span>
                                <span className="text-black font-bold mt-2 text-xs">•</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            
            {/* Signature / Seal Area */}
            <div className={`mt-16 flex items-end pt-8 border-t-2 border-gray-100 print:border-black ${isUrdu ? 'flex-row-reverse justify-between' : 'flex-row justify-between'}`}>
                <div className="text-center w-48">
                    <p className="font-bold text-lg text-black mb-2">{t('واللہ اعلم بالصواب', 'Allah Knows Best')}</p>
                    <div className="h-24 w-full flex items-center justify-center relative">
                        {/* CSS Seal Simulation */}
                        <div className="absolute border-4 border-double border-black rounded-full w-24 h-24 flex items-center justify-center opacity-30">
                            <span className="text-[8px] text-center font-sans font-bold">OFFICIAL<br/>SEAL</span>
                        </div>
                        <p className="font-urdu font-bold text-xl relative z-10">{fatwa.muftiName}</p>
                    </div>
                    <p className="text-sm text-gray-500 mt-2 font-bold">{t('دارالافتاء جامعہ سراج العلوم', 'Darul Ifta Jamia Siraj-ul-Ulum')}</p>
                </div>
                
                <div className="print:hidden flex gap-2">
                     <button 
                        onClick={handleDownload} 
                        className="flex items-center gap-2 bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 transition-colors mb-2"
                     >
                        <Download className="w-4 h-4" /> {t('ڈاؤنلوڈ', 'Download')}
                     </button>
                     <button 
                        onClick={() => window.print()} 
                        className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors mb-2"
                     >
                        <Printer className="w-4 h-4" /> {t('پرنٹ کریں', 'Print')}
                     </button>
                </div>
            </div>

          </div>

          {/* Footer Disclaimer */}
          <div className="bg-gray-100 p-4 text-center border-t border-gray-300 text-xs text-gray-500 font-urdu print:bg-white print:text-black">
             {t(
               'یہ فتویٰ صرف مذکورہ سوال کے جواب میں ہے۔ حالات کی تبدیلی سے حکم بدل سکتا ہے۔',
               'This Fatwa is specifically for the asked question. Rulings may change with circumstances.'
             )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default FatwaDetailPage;