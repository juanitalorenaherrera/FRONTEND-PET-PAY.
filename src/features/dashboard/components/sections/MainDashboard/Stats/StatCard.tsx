// ===========================================
// sections/Stats/StatCard.tsx
// ===========================================

import type { ElementType } from 'react';
import React from 'react';

type StatColor = 'blue' | 'green' | 'orange' | 'purple' | 'red' | 'yellow' | 'gray';

// Mapeo de colores a clases completas de Tailwind
const colorClasses: Record<StatColor, { 
  bg: string; 
  text: string; 
  indicator: string;
  urgent: string;
}> = {
  blue:   { 
    bg: 'from-blue-100 to-blue-200',   
    text: 'text-blue-600',
    indicator: 'bg-blue-500',
    urgent: 'bg-blue-100 border-blue-200'
  },
  green:  { 
    bg: 'from-green-100 to-green-200', 
    text: 'text-green-600',
    indicator: 'bg-green-500',
    urgent: 'bg-green-100 border-green-200'
  },
  orange: { 
    bg: 'from-orange-100 to-orange-200', 
    text: 'text-orange-600',
    indicator: 'bg-orange-500',
    urgent: 'bg-orange-100 border-orange-200'
  },
  purple: { 
    bg: 'from-purple-100 to-purple-200', 
    text: 'text-purple-600',
    indicator: 'bg-purple-500',
    urgent: 'bg-purple-100 border-purple-200'
  },
  red:    { 
    bg: 'from-red-100 to-red-200',     
    text: 'text-red-600',
    indicator: 'bg-red-500',
    urgent: 'bg-red-100 border-red-200'
  },
  yellow: { 
    bg: 'from-yellow-100 to-yellow-200', 
    text: 'text-yellow-600',
    indicator: 'bg-yellow-500',
    urgent: 'bg-yellow-100 border-yellow-200'
  },
  gray:   { 
    bg: 'from-gray-100 to-gray-200',   
    text: 'text-gray-600',
    indicator: 'bg-gray-500',
    urgent: 'bg-gray-100 border-gray-200'
  },
};

interface StatCardProps {
  icon: ElementType;
  title: string;
  value: string | number;
  change: string;
  color?: StatColor;
  isUrgent?: boolean;
  showIndicator?: boolean;
  onClick?: () => void;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  title,
  value,
  change,
  color = 'blue',
  isUrgent = false,
  showIndicator = false,
  onClick,
  className = ''
}) => {
  const handleClick = () => {
    if (onClick) {
      console.log('StatCard clicked:', title);
      onClick();
    }
  };

  const selectedColor = colorClasses[color] || colorClasses.blue;
  
  // Determinar estilos basados en urgencia
  const containerClasses = isUrgent
    ? `bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900/50 hover:bg-red-100 dark:hover:bg-red-900/40`
    : `bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:shadow-lg`;

  const valueClasses = isUrgent
    ? `text-red-700 dark:text-red-400`
    : `text-gray-900 dark:text-white`;

  return (
    <button 
      className={`
        ${containerClasses}
        w-full text-left block
        rounded-2xl p-4 sm:p-5 shadow-sm border transition-all duration-300
        ${onClick ? 'cursor-pointer hover:scale-105' : ''} 
        ${className}
      `}
      onClick={handleClick}
    >
      <div className="flex items-center gap-3 sm:gap-4 w-full">
        {/* Ícono con indicador */}
        <div className="relative shrink-0">
          <div className={`w-12 h-12 bg-gradient-to-br ${selectedColor.bg} rounded-xl flex items-center justify-center shadow-lg`}>
            <Icon className={`w-6 h-6 ${selectedColor.text}`} />
          </div>
          
          {/* Indicador de estado */}
          {showIndicator && (
            <div className={`
              absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white shadow-lg
              ${isUrgent ? 'bg-red-500 animate-pulse' : selectedColor.indicator}
            `} />
          )}
        </div>
        
        {/* Contenido principal */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center flex-wrap gap-1 sm:gap-2 mb-1">
            <p className={`text-xl sm:text-2xl font-bold leading-none ${valueClasses}`}>
              {value}
            </p>
            {isUrgent && (
              <span className="text-[10px] sm:text-xs bg-red-100 text-red-700 px-1.5 sm:px-2 py-0.5 rounded-full font-medium leading-none">
                Urgente
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
            {title}
          </p>
        </div>
        
        {/* Información de cambio */}
        <div className="text-right min-w-0 flex-shrink-0 flex flex-col items-end">
          <p className={`text-xs font-medium ${
            isUrgent 
              ? 'text-red-600' 
              : selectedColor.text
          } truncate max-w-20 sm:max-w-24`}>
            {change}
          </p>
          {onClick && (
            <div className="mt-1">
              <div className={`w-2 h-2 rounded-full ${selectedColor.indicator} opacity-60`} />
            </div>
          )}
        </div>
      </div>

      {/* Barra de progreso para estadísticas numéricas */}
      {typeof value === 'number' && value > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
            <div 
              className={`h-1.5 rounded-full transition-all duration-500 ${
                isUrgent ? 'bg-red-500' : selectedColor.indicator
              }`}
              style={{ 
                width: `${Math.min((value / 10) * 100, 100)}%` 
              }}
            />
          </div>
        </div>
      )}
    </button>
  );
};

export { StatCard };
export type { StatCardProps, StatColor };
