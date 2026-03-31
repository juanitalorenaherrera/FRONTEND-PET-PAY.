import { BookingStatus } from '../types';

export const BOOKING_CONFIG = {
    STATUSES: {
        [BookingStatus.PENDING]: { label: 'Pendiente', color: 'yellow' },
        [BookingStatus.CONFIRMED]: { label: 'Confirmada', color: 'blue' },
        [BookingStatus.IN_PROGRESS]: { label: 'En Progreso', color: 'green' },
        [BookingStatus.COMPLETED]: { label: 'Completada', color: 'gray' },
        [BookingStatus.CANCELLED]: { label: 'Cancelada', color: 'red' },
    },
    PAGINATION: {
        DEFAULT_PAGE_SIZE: 15,
    },
} as const;
