// ===========================================
// sections/UpcomingEvents/EventCard.tsx
// ===========================================

import { Bell, Calendar, Clock, Heart, Scissors, Shield, Users } from 'lucide-react';

import React from 'react';
import type { UpcomingEvent } from '@/utils/dashboardUtils';

interface EventCardProps {
  event: UpcomingEvent;
  isHighlighted?: boolean;
  onClick: () => void;
  className?: string;
}

const iconMap: Record<UpcomingEvent['icon'], React.ComponentType<{ className?: string }>> = {
  'Calendar': Calendar,
  'Shield': Shield,
  'Scissors': Scissors,
  'Users': Users,
  'Heart': Heart,
  'Bell': Bell
};

// Mapeo de colores a clases de Tailwind
const colorClasses: Record<UpcomingEvent['color'], {
  bg: string;
  text: string;
  highlight: string;
  border: string;
  indicator: string;
}> = {
  orange: {
    bg: 'bg-orange-500',
    text: 'text-orange-900 dark:text-orange-400',
    highlight: 'bg-orange-50 dark:bg-orange-500/10',
    border: 'border-orange-100 dark:border-orange-500/20',
    indicator: 'bg-orange-500'
  },
  blue: {
    bg: 'bg-blue-500',
    text: 'text-blue-900 dark:text-blue-400',
    highlight: 'bg-blue-50 dark:bg-blue-500/10',
    border: 'border-blue-100 dark:border-blue-500/20',
    indicator: 'bg-blue-500'
  },
  green: {
    bg: 'bg-green-500',
    text: 'text-green-900 dark:text-green-400',
    highlight: 'bg-green-50 dark:bg-green-500/10',
    border: 'border-green-100 dark:border-green-500/20',
    indicator: 'bg-green-500'
  },
  purple: {
    bg: 'bg-purple-500',
    text: 'text-purple-900 dark:text-purple-400',
    highlight: 'bg-purple-50 dark:bg-purple-500/10',
    border: 'border-purple-100 dark:border-purple-500/20',
    indicator: 'bg-purple-500'
  },
  red: {
    bg: 'bg-red-500',
    text: 'text-red-900 dark:text-red-400',
    highlight: 'bg-red-50 dark:bg-red-500/10',
    border: 'border-red-100 dark:border-red-500/20',
    indicator: 'bg-red-500'
  },
  yellow: {
    bg: 'bg-yellow-500',
    text: 'text-yellow-900 dark:text-yellow-400',
    highlight: 'bg-yellow-50 dark:bg-yellow-500/10',
    border: 'border-yellow-100 dark:border-yellow-500/20',
    indicator: 'bg-yellow-500'
  }
};

const EventCard: React.FC<EventCardProps> = ({
  event,
  isHighlighted = false,
  onClick,
  className = ''
}) => {
  const handleClick = () => {
    console.log('Event clicked:', event.id);
    onClick();
  };

  const IconComponent = iconMap[event.icon] || Calendar;
  const colors = colorClasses[event.color] || colorClasses.blue;

  // Determinar si es un evento prioritario
  const isUrgent = event.priority === 'high';

  return (
    <button
      onClick={handleClick}
      className={`
        w-full flex items-center gap-3 p-4 rounded-xl text-left
        transition-all duration-200 group
        ${isHighlighted 
          ? `${colors.highlight} border ${colors.border} shadow-sm` 
          : 'hover:bg-gray-50 dark:hover:bg-gray-700/50 border border-transparent'
        }
        ${isUrgent ? 'ring-1 ring-red-200 shadow-sm' : ''}
        focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
        ${className}
      `}
    >
      {/* Icono del evento */}
      <div className="relative">
        <div className={`
          w-12 h-12 ${colors.bg} rounded-xl flex items-center 
          justify-center flex-shrink-0 shadow-lg group-hover:scale-105 
          transition-transform duration-200
        `}>
          <IconComponent className="w-6 h-6 text-white" />
        </div>
        
        {/* Indicador de prioridad alta */}
        {isUrgent && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse shadow-lg"></div>
        )}
      </div>
      
      {/* Contenido del evento */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p className={`
            font-bold truncate text-base
            ${isHighlighted ? colors.text : 'text-gray-900 dark:text-white'}
          `}>
            {event.title}
          </p>
          {isUrgent && (
            <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium flex-shrink-0">
              Urgente
            </span>
          )}
        </div>
        
        <p className={`
          text-sm truncate
          ${isHighlighted ? `${colors.text} opacity-70` : 'text-gray-600 dark:text-gray-400'}
        `}>
          {event.subtitle}
        </p>
        
        {/* Información de fecha y hora */}
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-gray-400 dark:text-gray-500" />
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              {event.date}
            </span>
          </div>
          {event.time && (
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-gray-400 dark:text-gray-500" />
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                {event.time}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Indicadores de estado */}
      <div className="flex-shrink-0 flex flex-col items-center gap-2">
        {/* Indicador de evento destacado */}
        {isHighlighted && (
          <div className={`w-3 h-3 ${colors.indicator} rounded-full animate-pulse shadow-sm`}></div>
        )}
        
        {/* Indicador de tipo de evento */}
        <div className="flex items-center">
          <div className={`w-2 h-2 ${colors.bg} rounded-full opacity-60`}></div>
        </div>
      </div>
    </button>
  );
};

export default EventCard;
