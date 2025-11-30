import React from 'react';
import { Fatwa } from '../types';
import { Calendar, Eye, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FatwaCardProps {
  fatwa: Fatwa;
}

const FatwaCard: React.FC<FatwaCardProps> = ({ fatwa }) => {
  return (
    <Link 
      to={`/fatwa/${fatwa.id}`}
      className="block group bg-white hover:bg-gray-50 p-4 border border-gray-100 rounded transition-colors"
    >
      <div className="flex flex-col md:flex-row gap-4 items-start">
        {/* Icon/ID Section */}
        <div className="hidden md:flex flex-col items-center justify-center bg-primary-50 text-primary-700 w-16 h-16 rounded flex-shrink-0 border border-primary-100">
           <FileText className="w-6 h-6 mb-1" />
           <span className="text-[10px] font-mono font-bold">{fatwa.id}</span>
        </div>

        {/* Content Section */}
        <div className="flex-grow">
            <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="px-2 py-0.5 text-xs font-bold text-white bg-primary-700 rounded-sm">
                    {fatwa.category}
                </span>
                <span className="text-xs text-gray-400 flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {fatwa.date}
                </span>
            </div>
            
            <h3 className="text-lg font-serif font-bold text-gray-900 group-hover:text-primary-700 transition-colors mb-2">
                {fatwa.questionTitle}
            </h3>
            
            <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                {fatwa.questionDetails}
            </p>
        </div>

        {/* Action/Meta */}
        <div className="flex md:flex-col items-center justify-between w-full md:w-auto mt-2 md:mt-0 md:pl-4 md:border-l md:border-gray-100 text-xs text-gray-400 min-w-[80px]">
            <span className="flex items-center" title="Views">
                <Eye className="w-3 h-3 mr-1" /> {fatwa.views}
            </span>
            <span className="hidden md:inline-block mt-2 px-3 py-1 bg-white border border-gray-300 rounded text-gray-600 group-hover:border-primary-500 group-hover:text-primary-700 transition-colors">
                Read
            </span>
        </div>
      </div>
    </Link>
  );
};

export default FatwaCard;