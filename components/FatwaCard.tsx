import React from 'react';
import { Fatwa } from '../types';
import { Calendar, Eye, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FatwaCardProps {
  fatwa: Fatwa;
}

const FatwaCard: React.FC<FatwaCardProps> = ({ fatwa }) => {
  return (
    <Link 
      to={`/fatwa/${fatwa.id}`}
      className="group block bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-primary-700 bg-primary-50 rounded-full">
            {fatwa.category}
          </span>
          <span className="text-xs text-gray-400 font-mono">{fatwa.fatwaNumber}</span>
        </div>
        
        <h3 className="text-lg font-bold text-gray-800 font-serif mb-2 group-hover:text-primary-700 transition-colors line-clamp-2">
          {fatwa.questionTitle}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {fatwa.questionDetails}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-gray-400 text-xs">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              {fatwa.date}
            </span>
            <span className="flex items-center">
              <Eye className="w-3 h-3 mr-1" />
              {fatwa.views}
            </span>
          </div>
          <span className="flex items-center text-primary-600 font-medium group-hover:translate-x-1 transition-transform">
            Read Answer <ArrowRight className="w-3 h-3 ml-1" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default FatwaCard;