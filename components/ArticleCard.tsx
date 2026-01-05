import React from 'react';
import { ArticleContent } from '../types';
import { ArrowRight, Clock } from 'lucide-react';

interface ArticleCardProps {
  article: ArticleContent;
  onClick: (id: string) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onClick }) => {
  return (
    <div 
      onClick={() => onClick(article.id)}
      className="group cursor-pointer bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={article.coverImage} 
          alt={article.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-journal-accent text-white text-xs font-bold px-3 py-1 uppercase tracking-wide">
          {article.category}
        </div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-serif font-bold text-journal-900 mb-2 leading-tight group-hover:text-journal-blue transition-colors">
          {article.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
          {article.summary}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
          <div className="flex items-center text-gray-500 text-xs">
            <Clock size={14} className="mr-1" />
            <span>{article.readTime} okuma</span>
          </div>
          <span className="flex items-center text-journal-blue font-semibold text-sm group-hover:translate-x-1 transition-transform">
            Oku <ArrowRight size={16} className="ml-1" />
          </span>
        </div>
      </div>
    </div>
  );
};
