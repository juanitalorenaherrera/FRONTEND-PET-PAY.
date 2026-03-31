// src/features/caregiver/hooks/useCaretakerDashboard.ts

import { useCallback, useEffect, useState } from 'react';

import { BookingStatus } from '@/features/booking/types';
import type { CaretakerDashboardData } from '../types';
import { getSitterDashboardData } from '@/services/dashboardService';
import { toast } from 'sonner';
import { updateBookingStatus } from '@/services/bookingService';
import { useAuthStore } from '@/store/AuthStore';

// CORRECCIÓN 1: Importamos el ENUM, no solo el tipo.


export const useCaretakerDashboard = () => {
    const [data, setData] = useState<CaretakerDashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const { profile: user } = useAuthStore();

    const fetchData = useCallback(async () => {
        if (!user?.id) {
            setError("Usuario no autenticado.");
            toast.error("No estás autenticado", { description: "Por favor, inicia sesión de nuevo." });
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const dashboardData = await getSitterDashboardData(Number(user.id));
            setData(dashboardData);
            
            // CORRECCIÓN 2: Volvemos a usar user.firstName.
            toast.success(`¡Tus datos están listos, ${user.firstName}! 🐾`);

        } catch (err) {
            const errorMessage = 'Error al cargar tu dashboard';
            console.error(errorMessage, err);
            toast.error(errorMessage, { description: 'Refresca la página para intentarlo de nuevo.' });
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleUpdateRequest = async (bookingId: string, status: BookingStatus, messages: { loading: string, success: string, error: string }) => {
        const numericBookingId = Number(bookingId);
        toast.promise(updateBookingStatus(numericBookingId, status), {
            loading: messages.loading,
            success: () => {
                fetchData();
                return messages.success;
            },
            error: messages.error,
        });
    };

    const handleAcceptRequest = (bookingId: string) => {
        // CORRECCIÓN 1: Usamos el miembro del enum.
        handleUpdateRequest(bookingId, BookingStatus.CONFIRMED, {
            loading: 'Aceptando la solicitud...',
            success: '¡Solicitud aceptada con éxito! 🎉',
            error: 'Error al aceptar la solicitud',
        });
    };

    const handleRejectRequest = (bookingId: string) => {
        // CORRECCIÓN 1: Usamos el miembro del enum.
        handleUpdateRequest(bookingId, BookingStatus.CANCELLED, {
            loading: 'Rechazando la solicitud...',
            success: 'La solicitud ha sido rechazada.',
            error: 'Error al rechazar la solicitud',
        });
    };

    return {
        data,
        loading,
        error,
        user,
        actions: {
            retry: fetchData,
            acceptRequest: handleAcceptRequest,
            rejectRequest: handleRejectRequest,
        },
    };
};
