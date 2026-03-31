// src/features/caregiver/components/CalendarSection.tsx

import { Calendar } from 'lucide-react';
import type { UpcomingAppointment } from '../types';

// Componente para un solo item de la lista
const AppointmentItem: React.FC<{ appointment: UpcomingAppointment }> = ({ appointment }) => (
  <div className="flex items-center gap-4 rounded-lg bg-white/70 p-3 transition-all duration-300 hover:bg-white">
    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-gradient-primary text-xl shadow-sm">
      {appointment.petAvatar}
    </div>
    <div>
      <p className="font-semibold text-neutral-800">
        {appointment.petName} - {appointment.service}
      </p>
      <p className="text-sm text-neutral-500">{appointment.time}</p>
    </div>
  </div>
);

interface CalendarSectionProps {
  appointments: UpcomingAppointment[];
}

// --- LÍNEA CLAVE ---
// Asegúrate de que la palabra 'export' esté aquí
export const CalendarSection: React.FC<CalendarSectionProps> = ({ appointments }) => {
  // Datos para el calendario (en una implementación real, esto sería dinámico)
  const calendarDays = ['L', 'M', 'X', 'J', 'V', 'S', 'D', '16', '17', '18', '19', '20', '21', '22'];
  const today = 19;
  const bookedDays = [20, 21, 22, 25];

  return (
    <aside className="h-full rounded-3xl border border-white/20 bg-white/60 p-6 shadow-lg backdrop-blur-2xl">
      <h2 className="font-display text-2xl font-bold text-neutral-800 mb-6 flex items-center gap-3">
        <Calendar className="text-pet-orange" />
        Próximas Citas
      </h2>

      {/* Mini Calendario */}
      <div className="mb-6 rounded-lg bg-pet-teal/5 p-4 text-center">
        <div className="font-semibold text-neutral-700 mb-3">Septiembre 2025</div>
        <div className="grid grid-cols-7 gap-1 text-sm">
          {calendarDays.map((day) => {
            const isDayNumber = !isNaN(Number(day));
            const dayNumber = Number(day);
            return (
                <div
                key={day.toString()} // Use a unique identifier from your data
                className={`flex h-8 w-8 items-center justify-center rounded-full
                    ${!isDayNumber && 'font-medium text-neutral-400'}
                    ${isDayNumber && dayNumber === today && 'bg-pet-teal text-white'}
                    ${isDayNumber && bookedDays.includes(dayNumber) && 'bg-pet-orange/20 text-pet-orange font-bold'}
                `}
                >
                {day}
                </div>
            );
            })}
        </div>
      </div>
      
      {/* Lista de Próximas Citas */}
      <div className="space-y-3">
        {appointments.length > 0 ? (
          appointments.map(apt => <AppointmentItem key={apt.id} appointment={apt} />)
        ) : (
          <p className="text-center text-neutral-500 py-4">No tienes citas próximas en la agenda.</p>
        )}
      </div>
    </aside>
  );
};
