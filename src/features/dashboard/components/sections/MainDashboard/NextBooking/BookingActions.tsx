// ===========================================
// sections/NextAppointment/AppointmentActions.tsx
// ===========================================

import { Calendar, MapPin, Phone } from 'lucide-react';

import type { Appointment } from '@/types/dashboardData';
import React from 'react';

interface AppointmentActionsProps {
  appointment: Appointment;
  onContact: (appointment: Appointment) => void;
  onViewDetails: (appointment: Appointment) => void;
  onReschedule: (appointment: Appointment) => void;
  className?: string;
}

const AppointmentActions: React.FC<AppointmentActionsProps> = ({ 
  appointment, 
  onContact, 
  onViewDetails, 
  onReschedule,
  className = '' 
}) => {
  const handleContact = () => {
    console.log('Contacting sitter:', appointment.id);
    onContact(appointment);
  };

  const handleViewDetails = () => {
    console.log('Viewing appointment details:', appointment.id);
    onViewDetails(appointment);
  };

  const handleReschedule = () => {
    console.log('Rescheduling appointment:', appointment.id);
    onReschedule(appointment);
  };

  return (
    <div className={`flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100 dark:border-gray-700 ${className}`}>
      <button 
        onClick={handleContact}
        className="flex-1 justify-center flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
      >
        <Phone className="w-4 h-4" />
        <span className="font-medium">Contactar</span>
      </button>
      
      <button 
        onClick={handleViewDetails}
        className="flex-1 justify-center flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
      >
        <MapPin className="w-4 h-4" />
        <span className="font-medium">Ver Detalles</span>
      </button>
      
      <button 
        onClick={handleReschedule}
        className="flex-1 justify-center flex items-center gap-2 px-6 py-3 border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
      >
        <Calendar className="w-4 h-4" />
        <span className="font-medium">Reagendar</span>
      </button>
    </div>
  );
};

export default AppointmentActions;
