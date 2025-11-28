import React from 'react';
import { ArrowRight } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actionText?: string;
  onAction?: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, actionText = "View All", onAction }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-end mb-8 border-b border-cream-200 pb-4">
      <div>
        <h2 className="text-2xl md:text-3xl font-display font-extrabold text-warm-text relative inline-block">
          {title}
          <span className="absolute -bottom-4 left-0 w-1/2 h-1 bg-agri-green rounded-full"></span>
        </h2>
        {subtitle && <p className="text-warm-secondary mt-2 text-sm md:text-base">{subtitle}</p>}
      </div>
      {onAction && (
        <button 
          onClick={onAction}
          className="hidden sm:flex items-center text-agri-green font-semibold hover:text-agri-darkGreen transition-colors mt-4 sm:mt-0 cursor-pointer"
        >
          {actionText}
          <ArrowRight size={18} className="ml-2" />
        </button>
      )}
    </div>
  );
};

export default SectionHeader;