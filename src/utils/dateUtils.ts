// ===========================================
// utils/dateUtils.ts - CORREGIDO Y TIPADO
// ===========================================
export interface FormattedDateTime {
  date: string;
  time: string;
}

/**
 * Formatea una fecha y hora en strings separados para visualización
 */
export const formatDateTime = (dateTimeString: string): FormattedDateTime => {
  if (!dateTimeString) return { date: '', time: '' };
  
  const date = new Date(dateTimeString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  let dateText = '';
  if (date.toDateString() === today.toDateString()) {
    dateText = 'Hoy';
  } else if (date.toDateString() === tomorrow.toDateString()) {
    dateText = 'Mañana';
  } else {
    dateText = date.toLocaleDateString('es-CL', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    });
  }
  
  const timeText = date.toLocaleTimeString('es-CL', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  
  return { date: dateText, time: timeText };
};

/**
 * Calcula el tiempo restante hasta una cita y lo formatea en texto legible
 */
export const getTimeUntilAppointment = (dateTimeString: string): string => {
  if (!dateTimeString) return '';
  
  const appointmentTime = new Date(dateTimeString);
  const now = new Date();
  const diffMs = appointmentTime.getTime() - now.getTime();
  
  if (diffMs < 0) return 'Cita pasada';
  
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours > 24) {
    const days = Math.floor(hours / 24);
    return `En ${days} día${days > 1 ? 's' : ''}`;
  }
  
  if (hours > 0) {
    return `En ${hours} hora${hours > 1 ? 's' : ''} y ${minutes} minuto${minutes > 1 ? 's' : ''}`;
  }
  
  return `En ${minutes} minuto${minutes > 1 ? 's' : ''}`;
};

/**
 * Verifica si una fecha está dentro de un rango específico
 */
export const isWithinDays = (dateString: string, daysFromNow: number): boolean => {
  if (!dateString) return false;
  
  const targetDate = new Date(dateString);
  const today = new Date();
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + daysFromNow);
  
  return targetDate >= today && targetDate <= futureDate;
};

/**
 * Convierte una fecha a formato legible en español
 */
export const formatDate = (date: string | Date, options: Intl.DateTimeFormatOptions = {}): string => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  };
  
  return dateObj.toLocaleDateString('es-CL', defaultOptions);
};

/**
 * Convierte una hora a formato legible
 */
export const formatTime = (time: string | Date, includeSeconds: boolean = false): string => {
  if (!time) return '';
  
  const timeObj = typeof time === 'string' ? new Date(time) : time;
  
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    ...(includeSeconds && { second: '2-digit' })
  };
  
  return timeObj.toLocaleTimeString('es-CL', options);
};

/**
 * Obtiene los días de la semana en español
 */
export const getDaysOfWeek = (): string[] => [
  'Domingo', 'Lunes', 'Martes', 'Miércoles', 
  'Jueves', 'Viernes', 'Sábado'
];

/**
 * Obtiene los meses del año en español
 */
export const getMonths = (): string[] => [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

/**
 * Calcula la diferencia en días entre dos fechas
 */
export const daysDifference = (date1: string | Date, date2: string | Date): number => {
  const firstDate = typeof date1 === 'string' ? new Date(date1) : date1;
  const secondDate = typeof date2 === 'string' ? new Date(date2) : date2;
  
  const diffTime = Math.abs(secondDate.getTime() - firstDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Verifica si una fecha es de hoy
 */
export const isToday = (date: string | Date): boolean => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  
  return dateObj.toDateString() === today.toDateString();
};

/**
 * Verifica si una fecha es de mañana
 */
export const isTomorrow = (date: string | Date): boolean => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  return dateObj.toDateString() === tomorrow.toDateString();
};
