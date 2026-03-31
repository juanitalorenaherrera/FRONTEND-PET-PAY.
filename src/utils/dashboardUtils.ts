// ===========================================
// utils/dashboardUtils.ts - REFACTORIZADO Y ALINEADO
// ===========================================

import type { Appointment, Pet, Stats } from '@/types/dashboardData';

import { formatDateTime } from './dateUtils';

/**
 * Obtiene la imagen por defecto para una especie de mascota
 */
export const getPetImage = (species: string): string => {
  const images: Record<string, string> = {
    'Perro': 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=200&h=200&fit=crop&crop=faces',
    'Gato': 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=200&h=200&fit=crop&crop=faces',
    'Conejo': 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=200&h=200&fit=crop&crop=center',
    'Ave': 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=200&h=200&fit=crop&crop=center',
    'Pájaro': 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=200&h=200&fit=crop&crop=center',
    'Hamster': 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=200&h=200&fit=crop&crop=center',
    'Pez': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200&h=200&fit=crop&crop=center',
    'Reptil': 'https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?w=200&h=200&fit=crop&crop=center'
  };
  
  // Imagen por defecto si no se encuentra la especie
  const defaultImage = 'https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?w=200&h=200&fit=crop&crop=center';
  
  return images[species] || defaultImage;
};

/**
 * Obtiene el color asociado al estado de una cita
 */
export const getStatusColor = (status: string): 'green' | 'yellow' | 'red' | 'blue' | 'gray' => {
  const statusMap: Record<string, 'green' | 'yellow' | 'red' | 'blue' | 'gray'> = {
    // Estados confirmados
    'CONFIRMED': 'green',
    'ACTIVE': 'green',
    'COMPLETED': 'blue',
    
    // Estados pendientes
    'PENDING': 'yellow',
    'SCHEDULED': 'yellow',
    'IN_PROGRESS': 'yellow',
    
    // Estados problemáticos
    'CANCELLED': 'red',
    'FAILED': 'red',
    'EXPIRED': 'red',
    
    // Estados neutros
    'DRAFT': 'gray',
    'UNKNOWN': 'gray'
  };
  
  return statusMap[status.toUpperCase()] || 'gray';
};

/**
 * Genera un avatar por defecto usando UI Avatars
 */
export const generateDefaultAvatar = (
  name: string, 
  backgroundColor: string = 'FFA500', 
  textColor: string = 'ffffff'
): string => {
  if (!name || name.trim().length === 0) {
    return `https://ui-avatars.com/api/?name=U&background=${backgroundColor}&color=${textColor}&size=200`;
  }
  
  const cleanName = name.trim();
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(cleanName)}&background=${backgroundColor}&color=${textColor}&size=200&font-size=0.6&rounded=true`;
};

/**
 * Interface para recomendaciones del dashboard
 */
export interface Recommendation {
  id: string;
  title: string;
  description: string;
  action: string;
  priority: 'low' | 'medium' | 'high';
  category: 'health' | 'exercise' | 'grooming' | 'general';
}

/**
 * Obtiene recomendaciones basadas en las mascotas del usuario
 */
export const getRecommendation = (userPets: Pet[] = []): Recommendation => {
  // Si no hay mascotas, recomendar registrar una
  if (userPets.length === 0) {
    return {
      id: 'register-first-pet',
      title: '¡Registra tu primera mascota!',
      description: 'Comienza a cuidar mejor de tu compañero registrando su perfil completo.',
      action: 'Registrar Mascota',
      priority: 'high',
      category: 'general'
    };
  }

  // Obtener mascota activa más reciente
  const activePets = userPets.filter(pet => pet.active);
  const pet = activePets[0] || userPets[0];
  
  if (!pet) {
    return {
      id: 'no-active-pets',
      title: 'Reactiva el perfil de tu mascota',
      description: 'Parece que no tienes mascotas activas. Reactiva su perfil para recibir recomendaciones personalizadas.',
      action: 'Ver Mis Mascotas',
      priority: 'medium',
      category: 'general'
    };
  }

  // Pool de recomendaciones personalizadas
  const recommendations: Omit<Recommendation, 'id'>[] = [
    {
      title: `${pet.name} necesita ejercicio`,
      description: `Basado en su actividad reciente, ${pet.name} podría beneficiarse de un paseo extra hoy.`,
      action: 'Buscar Paseador',
      priority: 'medium',
      category: 'exercise'
    },
    {
      title: `Hora del grooming para ${pet.name}`,
      description: `${pet.name} podría necesitar un baño y corte de uñas pronto. Mantén su higiene al día.`,
      action: 'Agendar Grooming',
      priority: 'low',
      category: 'grooming'
    },
    {
      title: `Checkeo veterinario para ${pet.name}`,
      description: `Es importante mantener las vacunas y chequeos médicos al día para la salud de ${pet.name}.`,
      action: 'Ver Recordatorios',
      priority: 'high',
      category: 'health'
    },
    {
      title: `${pet.name} necesita socialización`,
      description: `La socialización es clave para el bienestar de ${pet.name}. Considera un playdate con otras mascotas.`,
      action: 'Buscar Compañía',
      priority: 'medium',
      category: 'exercise'
    }
  ];

  // Seleccionar recomendación aleatoria con ID único
  const randomRecommendation = recommendations[Math.floor(Math.random() * recommendations.length)];
  
  return {
    ...randomRecommendation,
    id: `recommendation-${pet.id}-${Date.now()}`
  };
};

/**
 * Interface para eventos próximos
 */
export interface UpcomingEvent {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  icon: 'Calendar' | 'Shield' | 'Scissors' | 'Users' | 'Heart' | 'Bell';
  color: 'orange' | 'blue' | 'green' | 'purple' | 'red' | 'yellow';
  priority: 'low' | 'medium' | 'high';
  type: 'appointment' | 'reminder' | 'grooming' | 'exercise' | 'health';
}

/**
 * Genera eventos próximos basados en estadísticas y citas
 */
export const generateUpcomingEvents = (stats: Stats, nextAppointment: Appointment | null): UpcomingEvent[] => {
  const events: UpcomingEvent[] = [];
  
  // Agregar próxima cita si existe
  if (nextAppointment) {
    try {
      const appointmentDateTime = formatDateTime(nextAppointment.startTime);
      events.push({
        id: `appointment-${nextAppointment.id}`,
        title: `Cita - ${nextAppointment.petName}`,
        subtitle: `Con ${nextAppointment.sitterName}`,
        date: appointmentDateTime.date,
        time: appointmentDateTime.time,
        icon: 'Calendar',
        color: 'orange',
        priority: 'high',
        type: 'appointment'
      });
    } catch (error) {
      console.error('Error formatting appointment date:', error);
    }
  }

  // Eventos basados en estadísticas
  if (stats.pendingReminders > 0) {
    events.push({
      id: 'pending-reminders',
      title: `${stats.pendingReminders} recordatorio${stats.pendingReminders > 1 ? 's' : ''} pendiente${stats.pendingReminders > 1 ? 's' : ''}`,
      subtitle: 'Revisa tus notificaciones',
      date: 'Hoy',
      time: '',
      icon: 'Bell',
      color: 'red',
      priority: 'high',
      type: 'reminder'
    });
  }

  // Verificar estado de vacunas
  if (stats.vaccinesChange && 
      (stats.vaccinesChange.toLowerCase().includes('pendiente') || 
       stats.vaccinesChange.toLowerCase().includes('vencida') ||
       stats.vaccinesUpToDate === '0/0')) {
    events.push({
      id: 'vaccine-reminder',
      title: 'Recordatorio de vacuna',
      subtitle: 'Mantén las vacunas al día',
      date: 'Próximamente',
      time: '',
      icon: 'Shield',
      color: 'blue',
      priority: 'high',
      type: 'health'
    });
  }

  // Agregar eventos de ejemplo si hay pocas citas reales
  if (events.length < 3) {
    const sampleEvents: UpcomingEvent[] = [
      {
        id: 'sample-grooming',
        title: 'Grooming programado',
        subtitle: 'Baño y corte de uñas',
        date: 'Miércoles',
        time: '2:00 PM',
        icon: 'Scissors',
        color: 'green',
        priority: 'medium',
        type: 'grooming'
      },
      {
        id: 'sample-walk',
        title: 'Paseo programado',
        subtitle: 'Ejercicio en el parque',
        date: 'Jueves',
        time: '9:00 AM',
        icon: 'Users',
        color: 'purple',
        priority: 'low',
        type: 'exercise'
      },
      {
        id: 'sample-checkup',
        title: 'Chequeo de rutina',
        subtitle: 'Consulta veterinaria',
        date: 'Viernes',
        time: '11:00 AM',
        icon: 'Heart',
        color: 'blue',
        priority: 'medium',
        type: 'health'
      }
    ];

    // Agregar eventos de ejemplo hasta llegar a 3 total
    const eventsToAdd = sampleEvents.slice(0, 3 - events.length);
    events.push(...eventsToAdd);
  }

  // Ordenar por prioridad (high -> medium -> low)
  const priorityOrder = { high: 3, medium: 2, low: 1 };
  events.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);

  return events.slice(0, 3); // Máximo 3 eventos
};

/**
 * Calcula el porcentaje de progreso para una estadística numérica
 */
export const calculateProgressPercentage = (current: number, max: number = 10): number => {
  if (max <= 0) return 0;
  return Math.min((current / max) * 100, 100);
};

/**
 * Formatea números para mostrar en estadísticas
 */
export const formatStatValue = (value: string | number): string => {
  if (typeof value === 'number') {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`;
    }
    return value.toString();
  }
  return value;
};

/**
 * Determina si una estadística es crítica y necesita atención
 */
export const isStatCritical = (statId: string, stats: Stats): boolean => {
  switch (statId) {
    case 'vaccines':
      return stats.vaccinesChange?.toLowerCase().includes('pendiente') ||
             stats.vaccinesChange?.toLowerCase().includes('vencida') ||
             stats.vaccinesUpToDate === '0/0';
    
    case 'reminders':
      return stats.pendingReminders > 0;
    
    case 'pets':
      return stats.activePets === 0;
    
    case 'appointments':
      return false; // Las citas no son críticas por sí mismas
    
    default:
      return false;
  }
};
