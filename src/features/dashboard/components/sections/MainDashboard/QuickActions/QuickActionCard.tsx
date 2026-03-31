// ===========================================
// sections/QuickActions/QuickActionCard.tsx
// ===========================================

import type { QuickAction } from './QuickActionsSection';
import React from 'react';

interface QuickActionCardProps {
  action: QuickAction;
  onClick: () => void;
  className?: string;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({
  action,
  onClick,
  className = ''
}) => {
  return (
    <button 
      onClick={onClick}
      className={`
        group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 
        hover:shadow-lg ${action.hoverColor} hover:-translate-y-1 
        transition-all duration-300 focus:outline-none focus:ring-2 
        focus:ring-orange-500 focus:ring-offset-2 ${className}
      `}
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <div className={`
          w-16 h-16 bg-gradient-to-br ${action.bgColor} rounded-2xl 
          flex items-center justify-center group-hover:scale-110 
          transition-transform duration-300 shadow-lg
        `}>
          <action.icon className={`w-8 h-8 ${action.color}`} />
        </div>
        
        <div>
          <span className="font-semibold text-gray-900 dark:text-white block">{action.title}</span>
          {action.description && (
            <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">{action.description}</span>
          )}
        </div>
      </div>
    </button>
  );
};

export default QuickActionCard;
