import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_FATWAS } from '../constants';
import { Calendar, Tag, Share2, Printer, ChevronLeft } from 'lucide-react';

const FatwaDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const fatwa = MOCK_FATWAS.find(f => f.id === id);

  if (!fatwa) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800">Fatwa Not Found</h2>
        <Link to="/browse" className="text-primary-600 mt-4 hover:underline">Return to Browse</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link to="/browse" className="inline-flex items-center text-gray-500 hover:text-primary-600 mb-6 transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to List
        </Link>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gray-50 px-8 py-6 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
             <div>
                <span className="inline-block px-3 py-1 text-xs font-semibold text-primary-800 bg-primary-100 rounded-full mb-3">
                  {fatwa.category}
                </span>
                <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 leading-snug">
                  {fatwa.questionTitle}
                </h1>
             </div>
             <div className="text-right flex flex-col items-end">
                <span className="text-sm font-mono text-gray-500 bg-white px-2 py-1 rounded border border-gray-200">
                    Fatwa ID: {fatwa.fatwaNumber}
                </span>
                <div className="flex items-center text-gray-500 text-sm mt-2">
                    <Calendar className="w-4 h-4 mr-1" /> {fatwa.date}
                </div>
             </div>
          </div>

          {/* Body */}
          <div className="p-8">
            {/* Question */}
            <div className="mb-10">
              <h2 className="text-lg font-bold text-red-700 mb-3 border-b border-red-100 pb-2 inline-block">
                Question
              </h2>
              <p className="text-lg text-gray-800 leading-relaxed font-sans">
                {fatwa.questionDetails}
              </p>
            </div>

            {/* Answer */}
            <div className="bg-primary-50/50 p-6 rounded-xl border border-primary-100">
              <h2 className="text-lg font-bold text-primary-800 mb-4 border-b border-primary-200 pb-2 inline-block">
                Answer
              </h2>
              <div className="prose prose-lg text-gray-800 font-serif leading-loose">
                 {/* In a real app, this would be sanitized HTML */}
                 <p>{fatwa.answer}</p>
              </div>
              
              <div className="mt-8 pt-6 border-t border-primary-200">
                 <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
                    <div>
                        <p className="font-bold text-gray-900">Darul Ifta</p>
                        <p className="text-sm text-gray-600">Jamia Arabia Siraj-ul-Ulum Mansehra</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                        {/* Stamp simulation */}
                        <div className="w-24 h-24 border-4 border-double border-primary-800 rounded-full flex items-center justify-center opacity-20 rotate-12">
                            <span className="text-xs font-bold text-center uppercase">Official<br/>Seal</span>
                        </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="bg-gray-50 px-8 py-4 border-t border-gray-200 flex justify-between items-center">
             <div className="flex space-x-2">
                 <span className="text-xs text-gray-500 flex items-center">
                     <Tag className="w-3 h-3 mr-1" /> {fatwa.category}
                 </span>
             </div>
             <div className="flex space-x-3">
                 <button className="flex items-center text-sm text-gray-600 hover:text-primary-700 transition-colors">
                     <Share2 className="w-4 h-4 mr-1" /> Share
                 </button>
                 <button 
                    onClick={() => window.print()} 
                    className="flex items-center text-sm text-gray-600 hover:text-primary-700 transition-colors"
                 >
                     <Printer className="w-4 h-4 mr-1" /> Print
                 </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FatwaDetailPage;