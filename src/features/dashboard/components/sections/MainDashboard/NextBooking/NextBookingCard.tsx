// ===========================================
// sections/NextAppointment/NextAppointmentCard.tsx
// ===========================================

import { Calendar, Clock, MapPin, PawPrint } from 'lucide-react';
import { formatDateTime, getTimeUntilAppointment } from '@/utils/dateUtils';

import type{ Appointment } from '@/types/dashboardData';
import BookingActions from './BookingActions';
import React from 'react';
import { getStatusColor } from '@/utils/dashboardUtils';

interface NextAppointmentCardProps {
  nextAppointment: Appointment;
  onContact: (appointment: Appointment) => void;
  onViewDetails: (appointment: Appointment) => void;
  onReschedule: (appointment: Appointment) => void;
  className?: string;
}

const NextAppointmentCard: React.FC<NextAppointmentCardProps> = ({
  nextAppointment,
  onContact,
  onViewDetails,
  onReschedule,
  className = ''
}) => {
  const appointmentDateTime = formatDateTime(nextAppointment.startTime);
  const statusColor = getStatusColor(nextAppointment.status);
  const estimatedDuration = 3; // Horas estimadas por defecto
  const hourlyRate = typeof nextAppointment.totalPrice === 'number' 
    ? (nextAppointment.totalPrice / estimatedDuration).toFixed(2)
    : '0.00';

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 ${className}`}>
      {/* Header con título y estado */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Próxima Cita</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {getTimeUntilAppointment(nextAppointment.startTime)}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 bg-${statusColor}-500 rounded-full animate-pulse`}></div>
          <span className={`text-sm font-semibold text-${statusColor}-700 dark:text-${statusColor}-400 bg-${statusColor}-100 dark:bg-${statusColor}-500/20 px-3 py-1 rounded-full`}>
            {nextAppointment.statusLabel}
          </span>
        </div>
      </div>

      {/* Contenido principal en grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Información de la mascota */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center">
              <PawPrint className="w-8 h-8 text-orange-600" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                {nextAppointment.petName}
              </h4>
              <p className="text-orange-600 dark:text-orange-400 font-medium">Cita con cuidador</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {nextAppointment.sitterName}
              </p>
            </div>
          </div>
        </div>
        
        {/* Información de horario y precio */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="font-bold text-gray-900 dark:text-white">
                {appointmentDateTime.date} - {appointmentDateTime.time}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Duración estimada: {estimatedDuration} hora{estimatedDuration !== 3 ? 's' : ''}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-500/20 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Precio: ${nextAppointment.totalPrice}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Por hora: ${hourlyRate}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Acciones */}
      <BookingActions 
        appointment={nextAppointment}
        onContact={onContact}
        onViewDetails={onViewDetails}
        onReschedule={onReschedule}
      />
    </div>
  );
};

export default NextAppointmentCard;
