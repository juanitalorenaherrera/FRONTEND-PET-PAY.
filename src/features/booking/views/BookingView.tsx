// features/booking/pages/BookingsView.tsx - NUEVO ARCHIVO

import { useEffect } from 'react';

import { BookingsOverview } from '@/features/booking/components/BookingOverview';
//import { LoadingSpinner } from '../../../components/ui/LoadingSpinner';
import { useAuthStore } from '@/store/AuthStore';
import { useBookingStore } from '@/store/BookingStore';

export function BookingsViewContent() {
	const loadBookings = useBookingStore((state: any) => state.loadBookings);
	const isLoading = useBookingStore((state: any) => state.isLoading);
	const user = useAuthStore((state) => state.profile);

    // LÓGICA DE CARGA CENTRALIZADA: Este es el lugar correcto para el useEffect.
    useEffect(() => {
        if (user?.id && isLoading) {
            loadBookings();
        }
    }, [user, isLoading, loadBookings]);


    if (!user) {
        return <div className="text-gray-600 dark:text-gray-400">Por favor, inicia sesión para ver tus citas.</div>;
    }

    return (
        <div className="container mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mis Citas</h1>
                <p className="text-gray-600 dark:text-gray-400">Aquí puedes ver y gestionar todas tus reservas.</p>
            </header>
            <main>
                <BookingsOverview />
            </main>
        </div>
    );
}
