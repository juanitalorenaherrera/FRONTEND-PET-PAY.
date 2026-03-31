import { create } from 'zustand';

export interface Booking {
	id: string;
	petId: string;
	sitterId: string;
	date: string;
	status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
}

interface BookingState {
	bookings: Booking[];
    isLoading: boolean;
    error: string | null;
	addBooking: (booking: Booking) => void;
    loadBookings: () => Promise<void>;
    refreshBookings: () => Promise<void>;
}

export const useBookingStore = create<BookingState>((set, get) => ({
	bookings: [
		{ id: '1', petId: 'p1', sitterId: 's1', date: '2026-04-01', status: 'CONFIRMED' },
		{ id: '2', petId: 'p2', sitterId: 's2', date: '2026-04-05', status: 'PENDING' }
	],
    isLoading: false,
    error: null,
	addBooking: (booking) => set((state) => ({ bookings: [...state.bookings, booking] })),
    loadBookings: async () => {
        set({ isLoading: true, error: null });
        try {
            // Simulación
            await new Promise(resolve => setTimeout(resolve, 500));
            set({ isLoading: false });
        } catch (err) {
            set({ isLoading: false, error: 'Error al cargar reservas' });
        }
    },
    refreshBookings: async () => {
        await get().loadBookings();
    }
}));
