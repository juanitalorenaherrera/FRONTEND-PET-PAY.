// ===========================================
// components/UpcomingBookingCard.tsx - Versión dinámica
// ===========================================

import { Calendar, Clock, MapPin, Phone, Plus, RefreshCw, AlertCircle, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { type BookingSummary, BookingStatus } from '@/features/booking/types';

interface UpcomingBookingCardProps {
    className?: string;
    maxBookingsToShow?: number;
    onNewBooking?: () => void;
    onBookingClick?: (bookingId: number) => void;
}

interface BookingStats {
    totalThisMonth: number;
    todayCount: number;
    confirmedCount: number;
    upcomingBookings: BookingSummary[];
}

export function UpcomingBookingCard({ 
    className = '',
    maxBookingsToShow = 4,
    onNewBooking,
    onBookingClick
}: UpcomingBookingCardProps) {
    const [bookingStats, setBookingStats] = useState<BookingStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshing, setRefreshing] = useState(false);

    // Cargar datos iniciales
    useEffect(() => {
        fetchBookingStats();
    }, []);

    const fetchBookingStats = async (showRefreshing = false) => {
        if (showRefreshing) setRefreshing(true);
        setError(null);

        try {
            // Mock data since getBookingStats doesn't exist yet
            const stats: BookingStats = {
                totalThisMonth: 0,
                todayCount: 0,
                confirmedCount: 0,
                upcomingBookings: []
            };
            setBookingStats(stats);
        } catch (err) {
            console.error('Error loading booking stats:', err);
            setError('Error al cargar las reservas');
        } finally {
            setIsLoading(false);
            if (showRefreshing) setRefreshing(false);
        }
    };

    const handleRefresh = () => {
        fetchBookingStats(true);
    };

    const handleNewBooking = () => {
        console.log('New booking clicked');
        if (onNewBooking) {
            onNewBooking();
        }
    };

    const handleBookingClick = (bookingId: number) => {
        console.log('Booking clicked:', bookingId);
        if (onBookingClick) {
            onBookingClick(bookingId);
        }
    };

    // Funciones de utilidad
    const getStatusColor = (status: BookingStatus): string => {
        switch (status) {
            case BookingStatus.CONFIRMED:
                return 'bg-green-100 text-green-700 border-green-200';
            case BookingStatus.PENDING:
                return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case BookingStatus.IN_PROGRESS:
                return 'bg-blue-100 text-blue-700 border-blue-200';
            case BookingStatus.CANCELLED:
                return 'bg-red-100 text-red-700 border-red-200';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getStatusText = (status: BookingStatus): string => {
        switch (status) {
            case BookingStatus.CONFIRMED: return 'Confirmada';
            case BookingStatus.PENDING: return 'Pendiente';
            case BookingStatus.IN_PROGRESS: return 'En Progreso';
            case BookingStatus.COMPLETED: return 'Completada';
            case BookingStatus.CANCELLED: return 'Cancelada';
            default: return 'Estado';
        }
    };

    const formatDateTime = (dateString: string) => {
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
                month: 'short' 
            });
        }

        const timeText = date.toLocaleTimeString('es-ES', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });

        return { date: dateText, time: timeText };
    };

    const isUrgent = (booking: BookingSummary): boolean => {
        const bookingDate = new Date(booking.startTime);
        const now = new Date();
        const hoursDiff = (bookingDate.getTime() - now.getTime()) / (1000 * 60 * 60);
        
        return hoursDiff <= 24 && booking.status === BookingStatus.CONFIRMED;
    };

    // Estados de carga y error
    if (isLoading) {
        return (
            <div className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 ${className}`}>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">Próximas Reservas</h3>
                            <p className="text-gray-600">Cargando...</p>
                        </div>
                    </div>
                </div>
                
                <div className="flex items-center justify-center py-12">
                    <div className="flex flex-col items-center gap-3">
                        <Loader2 className="w-8 h-8 text-teal-500 animate-spin" />
                        <p className="text-gray-600">Cargando reservas...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 ${className}`}>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">Próximas Reservas</h3>
                            <p className="text-red-600">Error al cargar</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                    <div className="flex items-center justify-center">
                        <div className="flex flex-col items-center gap-3 text-center">
                            <AlertCircle className="w-8 h-8 text-red-500" />
                            <div className="space-y-1">
                                <p className="font-medium text-red-800">Error al cargar reservas</p>
                                <p className="text-sm text-red-600">{error}</p>
                            </div>
                            <button 
                                onClick={handleRefresh}
                                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Intentar de nuevo
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const upcomingBookings = bookingStats?.upcomingBookings || [];
    const bookingsToShow = upcomingBookings.slice(0, maxBookingsToShow);

    return (
        <div className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 ${className}`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Próximas Reservas</h3>
                        <p className="text-gray-600">
                            {upcomingBookings.length > 0 
                                ? `${upcomingBookings.length} reserva${upcomingBookings.length > 1 ? 's' : ''} programada${upcomingBookings.length > 1 ? 's' : ''}`
                                : 'Sin reservas próximas'
                            }
                        </p>
                    </div>
                </div>
                
                <div className="flex items-center gap-3">
                    <button 
                        onClick={handleRefresh}
                        disabled={refreshing}
                        className="p-2 text-gray-500 hover:text-teal-500 hover:bg-teal-50 rounded-lg transition-colors duration-200 disabled:opacity-50"
                        title="Actualizar reservas"
                    >
                        <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                    </button>
                    
                    <button 
                        onClick={handleNewBooking}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                    >
                        <Plus className="w-4 h-4" />
                        <span className="font-medium">Nueva Cita</span>
                    </button>
                </div>
            </div>

            {/* Estado vacío */}
            {bookingsToShow.length === 0 ? (
                <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Calendar className="w-8 h-8 text-gray-400" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">
                        No hay reservas próximas
                    </h4>
                    <p className="text-gray-600 mb-6">
                        Programa una cita con un cuidador para comenzar
                    </p>
                    <button 
                        onClick={handleNewBooking}
                        className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 flex items-center gap-2 mx-auto"
                    >
                        <Plus className="w-5 h-5" />
                        Agendar primera cita
                    </button>
                </div>
            ) : (
                <>
                    {/* Bookings List */}
                    <div className="space-y-4 mb-6">
                        {bookingsToShow.map((booking) => {
                            const { date, time } = formatDateTime(booking.startTime);
                            const urgent = isUrgent(booking);
                            
                            return (
                                <div 
                                    key={booking.id}
                                    className={`relative p-4 rounded-xl border transition-all duration-200 hover:shadow-sm cursor-pointer ${
                                        urgent 
                                            ? 'bg-red-50 border-red-200 shadow-sm' 
                                            : 'bg-gray-50 border-gray-100 hover:bg-gray-100'
                                    }`}
                                    onClick={() => handleBookingClick(booking.id)}
                                >
                                    {/* Status Badge */}
                                    <div className="flex items-start justify-between mb-3">
                                        <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${getStatusColor(booking.status)}`}>
                                            {getStatusText(booking.status)}
                                        </span>
                                        {urgent && (
                                            <div className="flex items-center gap-1">
                                                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                                <span className="text-xs font-medium text-red-600">Urgente</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Main Info */}
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-bold text-gray-900">{booking.petName}</h4>
                                                <span className="text-xs text-gray-500">•</span>
                                                <span className="text-sm text-gray-700 font-medium">Cuidado</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="flex items-center gap-1 text-gray-600">
                                                    <Clock className="w-3 h-3" />
                                                    <span className="text-sm">{time}</span>
                                                </div>
                                                <span className="font-medium text-blue-600">{date}</span>
                                            </div>
                                        </div>
                                        
                                        <p className="text-sm text-gray-600">{booking.sitterName}</p>
                                        
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-1 text-gray-500">
                                                <MapPin className="w-3 h-3" />
                                                <span className="text-xs">Servicio a domicilio</span>
                                            </div>
                                            <span className="text-sm font-bold text-green-600">
                                                ${booking.totalPrice}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Quick Actions */}
                                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-200">
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                console.log('Call sitter:', booking.sitterName);
                                            }}
                                            className="flex items-center gap-1 px-2 py-1 text-xs text-teal-600 hover:bg-teal-50 rounded-md transition-colors duration-200"
                                        >
                                            <Phone className="w-3 h-3" />
                                            Llamar
                                        </button>
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                console.log('Show location for booking:', booking.id);
                                            }}
                                            className="flex items-center gap-1 px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded-md transition-colors duration-200"
                                        >
                                            <MapPin className="w-3 h-3" />
                                            Ubicación
                                        </button>
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                console.log('Reschedule booking:', booking.id);
                                            }}
                                            className="flex items-center gap-1 px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded-md transition-colors duration-200"
                                        >
                                            <Calendar className="w-3 h-3" />
                                            Reagendar
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Footer Summary */}
                    <div className="pt-4 border-t border-gray-100">
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <p className="font-bold text-gray-900">{bookingStats?.totalThisMonth || 0}</p>
                                <p className="text-xs text-gray-500">Este Mes</p>
                            </div>
                            <div>
                                <p className="font-bold text-orange-500">{bookingStats?.todayCount || 0}</p>
                                <p className="text-xs text-gray-500">Para Hoy</p>
                            </div>
                            <div>
                                <p className="font-bold text-teal-500">{bookingStats?.confirmedCount || 0}</p>
                                <p className="text-xs text-gray-500">Confirmadas</p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
