// ===========================================
// features/booking/utils/bookingUtils.ts - Utilities Completas
// ===========================================

import type {
	BookingFilters,
	BookingSummary,
	BookingDetail,
} from '@/features/booking/types';
import { BookingStatus } from '@/features/booking/types';

export const shouldRefreshCache = (lastFetch: number | null, maxAge: number): boolean => {
    if (!lastFetch) return true;
    return Date.now() - lastFetch > maxAge;
};

export const filterAndSortBookings = (bookings: BookingSummary[], filters: BookingFilters): BookingSummary[] => {
    let filtered = [...bookings];
    
    // Filter by status
    if (filters.status && filters.status.length > 0) {
        filtered = filtered.filter(booking => filters.status!.includes(booking.status));
    }
    
    // Filter by search term
    if (filters.search?.trim()) {
        const searchTerm = filters.search.toLowerCase().trim();
        filtered = filtered.filter(booking => 
            booking.petName.toLowerCase().includes(searchTerm) ||
            booking.sitterName.toLowerCase().includes(searchTerm)
        );
    }
    
    // Sort
    filtered.sort((a, b) => {
        let comparison = 0;
        
        switch (filters.sortBy) {
            case 'startTime':
                comparison = new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
                break;
            case 'totalPrice':
                comparison = a.totalPrice - b.totalPrice;
                break;
            case 'createdAt':
                // Assuming we have createdAt in the future
                comparison = a.id - b.id; // Fallback to ID for now
                break;
            default:
                comparison = 0;
        }
        
        return filters.sortOrder === 'desc' ? -comparison : comparison;
    });
    
    return filtered;
};

export const formatBookingDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);

    const isToday = date.toDateString() === today.toDateString();
    const isTomorrow = date.toDateString() === tomorrow.toDateString();

    let dateText: string;
    if (isToday) {
        dateText = 'Hoy';
    } else if (isTomorrow) {
        dateText = 'Mañana';
    } else {
        dateText = date.toLocaleDateString('es-ES', { 
            day: 'numeric', 
            month: 'short',
            year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
        });
    }

    const timeText = date.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false
    });

    return { date: dateText, time: timeText, full: `${dateText} ${timeText}` };
};

export const isBookingUrgent = (booking: BookingSummary, hoursThreshold: number = 24): boolean => {
    const bookingDate = new Date(booking.startTime);
    const now = new Date();
    const hoursDiff = (bookingDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    
    return hoursDiff <= hoursThreshold && 
           hoursDiff > 0 &&
           (booking.status === BookingStatus.CONFIRMED || booking.status === BookingStatus.PENDING);
};

export const getBookingTimeStatus = (booking: BookingSummary) => {
    const now = new Date();
    const startTime = new Date(booking.startTime);
    
    if (startTime > now) {
        return { 
            status: 'upcoming', 
            label: 'Próximo',
            color: 'blue' 
        };
    }
    
    if (booking.status === BookingStatus.IN_PROGRESS) {
        return { 
            status: 'active', 
            label: 'En curso',
            color: 'green' 
        };
    }
    
    return { 
        status: 'past', 
        label: 'Pasado',
        color: 'gray' 
    };
};

export const validateBookingData = (data: Partial<BookingDetail>): string | null => {
    if (!data.petId) return 'La mascota es obligatoria.';
    if (!data.sitterId) return 'El cuidador es obligatorio.';
    if (!data.startTime) return 'La fecha y hora son obligatorias.';
    if (!data.endTime) return 'La fecha y hora son obligatorias.';
    
    return null;
};
