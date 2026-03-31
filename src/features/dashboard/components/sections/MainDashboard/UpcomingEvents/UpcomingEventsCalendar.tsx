// ===========================================
// sections/UpcomingEvents/UpcomingEventsCalendar.tsx
// ===========================================

import type { Appointment, Stats } from '@/types/dashboardData';

import { Calendar } from 'lucide-react';
import EventCard from './EventCard';
import React from 'react';
import { generateUpcomingEvents } from '@/utils/dashboardUtils';

interface UpcomingEventsCalendarProps {
  stats: Stats;
  nextAppointment: Appointment | null;
  onEventClick?: (eventId: string) => void;
  onViewCalendar?: () => void;
  className?: string;
}

const UpcomingEventsCalendar: React.FC<UpcomingEventsCalendarProps> = ({
  stats,
  nextAppointment,
  onEventClick,
  onViewCalendar,
  className = ''
}) => {
  const events = generateUpcomingEvents(stats, nextAppointment);

  const handleEventClick = (eventId: string) => {
    console.log(`Event clicked: ${eventId}`);
    onEventClick?.(eventId);
  };

  const handleViewCalendar = () => {
    console.log('View calendar clicked');
    onViewCalendar?.();
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900 dark:text-white">Próximos Eventos</h3>
        <button 
          onClick={handleViewCalendar}
          className="
            text-orange-600 hover:text-orange-700 text-sm font-medium 
            focus:outline-none focus:ring-2 focus:ring-orange-500 
            focus:ring-offset-2 rounded-lg px-2 py-1 transition-colors
          "
        >
          Ver calendario
        </button>
      </div>
      
      {/* Lista de eventos */}
      <div className="space-y-3">
        {events.map((event, index) => (
          <EventCard
            key={event.id}
            event={event}
            isHighlighted={index === 0}
            onClick={() => handleEventClick(event.id)}
          />
        ))}
        
        {/* Estado vacío */}
        {events.length === 0 && (
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400 mb-2">No hay eventos próximos</p>
            <button
              onClick={handleViewCalendar}
              className="text-orange-600 hover:text-orange-700 text-sm font-medium"
            >
              Ver calendario completo
            </button>
          </div>
        )}
      </div>

      {/* Footer con más información */}
      {events.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Mostrando los próximos {events.length} eventos
          </p>
        </div>
      )}
    </div>
  );
};

export default UpcomingEventsCalendar;
