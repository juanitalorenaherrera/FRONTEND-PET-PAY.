// src/services/dashboardService.ts

import { Bone, Home, Wind } from 'lucide-react';
import type { DashboardData, Pet } from '@/types/dashboardData';
import { getBookingById, getBookingsByUser } from './bookingService';

import { BookingStatus } from '@/features/booking/types';
import type { CaretakerDashboardData } from '@/features/caregiver/types/index';
import type { DashboardStatsData } from '@/types/DashboardStatsData';
import type { PetSummaryResponse } from '@/types/pets';
import { Role } from '@/features/auth/types/authStore';
import axios from '@/services/auth';
import { getMockDashboardData } from './mockDashboardService';
import { getServicesBySitterForDashboard } from './sitterService';

const API_URL = '/api/dashboard';

/**
 * Obtiene las estadísticas del dashboard
 * @returns Promise<DashboardStatsData>
 */
export const getDashboardStats = async (): Promise<DashboardStatsData> => {
    try {
        const response = await axios.get<DashboardStatsData>(`${API_URL}/stats`);
        return response.data;
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        throw new Error('No se pudieron cargar las estadísticas del dashboard');
    }
};

/**
 * Obtiene todos los datos del dashboard principal optimizado
 * @returns Promise<DashboardData>
 */
export const getDashboardData = async (): Promise<DashboardData> => {
    try {
        console.log('🔄 Iniciando carga de datos del dashboard...');
        console.log('📡 API URL:', import.meta.env.VITE_API_URL);
        
        const [statsResponse, mainResponse, sittersResponse] = await Promise.all([
            axios.get<DashboardStatsData>(`${API_URL}/stats`),
            axios.get(`${API_URL}/main`),
            axios.get(`${API_URL}/sitter-profiles`)
        ]);

        // Pets se obtienen via el store/PetStore con /api/pets/account/{accountId}/active
        // No se llama aquí para evitar redundancia — el MainDashboard los lee del store
        const userPets: Pet[] = [];
        
        console.log('✅ Datos del dashboard cargados correctamente');
        return {
            ...mainResponse.data,
            stats: statsResponse.data,
            userPets,
            recentSitters: sittersResponse.data,
            nextAppointment: null
        };
    } catch (error: unknown) {
        const axiosError = error as { message?: string; response?: { status?: number; statusText?: string }; config?: { url?: string; baseURL?: string }; code?: string };
        
        console.error('❌ Error detallado:', {
            message: axiosError.message,
            status: axiosError.response?.status,
            statusText: axiosError.response?.statusText,
            url: axiosError.config?.url,
            baseURL: axiosError.config?.baseURL
        });
        
        if (axiosError.code === 'ECONNREFUSED' || axiosError.code === 'ERR_NETWORK' || axiosError.response?.status === 500) {
            console.warn('⚠️ Backend no disponible o con errores, usando datos mock...');
            return await getMockDashboardData();
        }
        
        throw new Error(`No se pudieron cargar los datos del dashboard: ${axiosError.message || 'Error desconocido'}`);
    }
};

// Funciones individuales mantenidas para compatibilidad pero optimizadas
export const getNextAppointment = async () => {
    const { nextAppointment } = await getDashboardData();
    return nextAppointment;
};

export const getUserPetsForDashboard = async (): Promise<Pet[]> => {
    const { userPets } = await getDashboardData();
    return userPets;
};

export const getRecentSitters = async () => {
    const { recentSitters } = await getDashboardData();
    return recentSitters;
};

// NOTE: /api/pets/summary does not exist — use PetStore which calls /api/pets/account/{accountId}/active
export const getPetsSummary = async (accountId: number): Promise<PetSummaryResponse[]> => {
    try {
        const response = await axios.get<PetSummaryResponse[]>(`/api/pets/account/${accountId}/active`);
        return response.data;
    } catch (error) {
        console.error('Error fetching pets summary:', error);
        throw new Error('No se pudo cargar el resumen de mascotas');
    }
};

/**
 * Obtiene y ensambla todos los datos para el dashboard del cuidador de forma robusta.
 * @param userId - El ID del usuario cuidador.
 * @returns Una promesa con los datos del dashboard.
 */
export const getSitterDashboardData = async (userId: number): Promise<CaretakerDashboardData> => {
  try {
    const [pendingBookings, confirmedBookings, sitterServices] = await Promise.all([
      getBookingsByUser(userId, Role.SITTER, { status: BookingStatus.PENDING }),
      getBookingsByUser(userId, Role.SITTER, { status: BookingStatus.CONFIRMED }),
      getServicesBySitterForDashboard(userId) // Usamos la nueva función segura
    ]);

    // --- CORRECCIÓN CLAVE PARA EVITAR EL ERROR '.map' ---
    // Si la API no devuelve la estructura esperada, usamos un array vacío como fallback.
    const pendingBookingsContent = pendingBookings?.content ?? [];
    const confirmedBookingsContent = confirmedBookings?.content ?? [];

    const pendingDetailsPromises = pendingBookingsContent.map(booking => getBookingById(booking.id));
    const confirmedDetailsPromises = confirmedBookingsContent.map(booking => getBookingById(booking.id));

    const [pendingBookingsDetails, confirmedBookingsDetails] = await Promise.all([
        Promise.all(pendingDetailsPromises),
        Promise.all(confirmedDetailsPromises)
    ]);

    // El resto del mapeo ya está corregido y funcionará con estos datos seguros
    const requests = pendingBookingsDetails.map(b => ({
      id: b.id.toString(), petName: b.petName, ownerName: b.bookedByUserName,
      dates: `${new Date(b.startTime).toLocaleDateString()} - ${new Date(b.endTime).toLocaleDateString()}`,
      serviceType: b.serviceName, earnings: b.totalPrice, petAvatar: '🐾'
    }));
    const appointments = confirmedBookingsDetails.map(b => ({
      id: b.id.toString(), petName: b.petName, service: b.serviceName,
      time: `Confirmada para: ${new Date(b.startTime).toLocaleDateString()}`, petAvatar: '🐶'
    }));
    const services = sitterServices.map(s => ({
        id: s.id.toString(), title: s.serviceType, price: `$${s.price}/${s.serviceType === 'HOURLY' ? 'hr' : 'día'}`,
        icon: s.serviceType.toLowerCase().includes('paseo') ? Wind : (s.serviceType.toLowerCase().includes('alojamiento') ? Home : Bone)
    }));
    const stats = {
        pendingRequests: pendingBookings?.totalElements ?? 0,
        confirmedBookings: confirmedBookings?.totalElements ?? 0,
        monthlyEarnings: confirmedBookingsContent.reduce((sum, b) => sum + b.totalPrice, 0),
        averageRating: 4.9,
    };

    return { stats, requests, appointments, services };

  } catch (error) {
    console.error(`Error ensamblando los datos del dashboard para el cuidador ${userId}:`, error);
    throw new Error('No se pudieron cargar los datos del dashboard');
  }
};
