import React from 'react';
import { Fatwa } from '../types';
import { Link } from 'react-router-dom';
import { Calendar, Tag } from 'lucide-react';

interface FatwaCardProps {
  fatwa: Fatwa;
}

const FatwaCard: React.FC<FatwaCardProps> = ({ fatwa }) => {
  return (
    <div className="border-b border-gray-200 py-4 hover:bg-gray-50 transition-colors px-2">
      <div className="flex flex-col text-right">
        
        {/* Top Row: Date & ID */}
        <div className="flex flex-row-reverse justify-between items-center mb-2 text-xs text-gray-500 font-urdu">
           <span className="flex items-center dir-rtl gap-1">
              <Calendar className="w-3 h-3" /> {fatwa.date}
           </span>
           <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-mono">
              {fatwa.fatwaNumber.split('/')[0]}
           </span>
        </div>

        {/* Title */}
        <Link 
          to={`/fatwa/${fatwa.id}`}
          className="text-xl md:text-2xl font-bold font-urdu text-primary-800 hover:text-secondary-600 transition-colors mb-2 leading-relaxed"
        >
          {fatwa.questionTitle}
        </Link>

        {/* Snippet */}
        <p className="text-gray-600 font-urdu text-base leading-loose line-clamp-2" dir="rtl">
          {fatwa.questionDetails}
        </p>
        
        {/* Category Tag */}
        <div className="mt-2 flex justify-end">
           <span className="text-xs font-urdu text-secondary-700 bg-secondary-50 px-2 py-0.5 rounded flex items-center gap-1">
              <Tag className="w-3 h-3" /> {fatwa.category}
           </span>
        </div>

      </div>
    </div>
  );
};

export default FatwaCard;
