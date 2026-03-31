// src/features/caregiver/view/CaretakerDashboardView.tsx

import {
    AlertTriangle,
    BarChart,
    Briefcase,
    CalendarCheck,
    DollarSign,
    Loader,
    Star
} from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { CalendarSection } from '../components/CalendarSection';
import { CaretakerHeader } from '../components/CaretakerHeader';
import { RequestCard } from '../components/RequestCard';
import { ServiceCard } from '../components/ServiceCard';
import { StatCard } from '../components/StatCard';
import { motion } from 'framer-motion';
import { useCaretakerDashboard } from '../hooks/useCaretakerDashboard';

// --- CORRECCIÓN: Aseguramos que solo importamos iconos de lucide-react ---


// --- Componente de Estado de Carga ---
const LoadingSkeleton = () => (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-neutral-50 to-pet-teal/10">
        <div className="flex flex-col items-center gap-4 text-center">
            <Loader className="w-12 h-12 text-pet-orange animate-spin" />
            <h2 className="font-display text-2xl font-semibold text-neutral-700">Cargando tu Dashboard</h2>
            <p className="text-neutral-500">Estamos preparando tus datos, ¡un momento! 🐾</p>
        </div>
    </div>
);

// --- Componente de Estado de Error ---
const ErrorDisplay = ({ onRetry }: { onRetry: () => void }) => (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-neutral-50 to-red-500/10 p-4">
        <motion.div 
            className="text-center p-8 bg-white/80 backdrop-blur-xl border border-white/30 rounded-2xl shadow-lg max-w-md"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
        >
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold font-display text-neutral-800 mb-2">¡Oh no! Algo salió mal</h2>
            <p className="text-neutral-600 mb-6">No pudimos cargar los datos de tu dashboard en este momento.</p>
            <Button onClick={onRetry} variant="primary" size="lg">
                Intentar de nuevo
            </Button>
        </motion.div>
    </div>
);

// --- Vista Principal del Dashboard ---
export const CaretakerDashboardView = () => {
    const { data, loading, error, user, actions } = useCaretakerDashboard();

    if (loading) return <LoadingSkeleton />;
    if (error || !data) return <ErrorDisplay onRetry={actions.retry} />;

    // --- CORRECCIÓN: Nos aseguramos de que los iconos sean los correctos ---
    const stats = [
        { icon: <BarChart className="text-white w-6 h-6" />, value: data.stats.pendingRequests, label: "Solicitudes Pendientes", color: 'orange' as const },
        { icon: <CalendarCheck className="text-white w-6 h-6" />, value: data.stats.confirmedBookings, label: "Reservas Confirmadas", color: 'teal' as const },
        { icon: <DollarSign className="text-white w-6 h-6" />, value: `$${data.stats.monthlyEarnings}`, label: "Ganancias del Mes", color: 'orange' as const },
        { icon: <Star className="text-white w-6 h-6" />, value: `${data.stats.averageRating} ★`, label: "Calificación Promedio", color: 'teal' as const },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-pet-teal/10 p-4 sm:p-6 lg:p-8">
            <div className="max-w-screen-xl mx-auto">
                <CaretakerHeader user={user} />

                <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
                    initial="hidden"
                    animate="show"
                    variants={{ show: { transition: { staggerChildren: 0.07 } } }}
                >
                    {stats.map((stat, index) => (
                        <StatCard key={index} {...stat} index={index} />
                    ))}
                </motion.div>

                <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    <motion.section 
                        className="lg:col-span-2 bg-glass-neutral backdrop-blur-2xl border border-white/20 rounded-3xl p-6 shadow-lg"
                        initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h2 className="font-display text-2xl font-bold text-neutral-800 mb-6">Nuevas Solicitudes de Reserva</h2>
                        <div className="space-y-4">
                            {data.requests.length > 0 ? (
                                data.requests.map(req => (
                                    <RequestCard key={req.id} request={req} onAccept={actions.acceptRequest} onReject={actions.rejectRequest} />
                                ))
                            ) : (
                                <p className="text-center text-neutral-500 py-8">No tienes solicitudes pendientes por ahora. ¡Buen trabajo!</p>
                            )}
                        </div>
                    </motion.section>

                    <motion.aside initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
                        <CalendarSection appointments={data.appointments} />
                    </motion.aside>
                </main>

                <motion.section 
                    className="bg-glass-neutral backdrop-blur-2xl border border-white/20 rounded-3xl p-6 shadow-lg"
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                        <h2 className="font-display text-2xl font-bold text-neutral-800 flex items-center gap-3">
                            <Briefcase className="text-pet-teal"/>
                            Gestionar mis Servicios
                        </h2>
                        <Button variant="outline" className="border-pet-orange text-pet-orange hover:bg-pet-orange/10">Añadir Nuevo Servicio</Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.services.map(service => ( <ServiceCard key={service.id} service={service} /> ))}
                    </div>
                </motion.section>
            </div>
        </div>
    );
};
