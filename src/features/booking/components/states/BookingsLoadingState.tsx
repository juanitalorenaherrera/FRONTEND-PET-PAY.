// features/booking/components/states/BookingsLoadingState.tsx
import { Skeleton } from '@/components/ui/Skeleton'; // Ajusta la ruta a tu componente

// Un esqueleto que imita la forma de una tarjeta de cita
const BookingCardSkeleton = () => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
        <div className="flex justify-between items-center">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-6 w-32" />
        </div>
        <Skeleton className="h-4 w-1/3" />
        <div className="pt-4 border-t border-gray-100">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4 mt-2" />
        </div>
    </div>
);

export function BookingsLoadingState() {
    return (
        <div className="space-y-4">
            {/* Renderizamos varios esqueletos para dar la sensación de carga de una lista */}
            {Array.from({ length: 3 }).map((_, index) => (
                <BookingCardSkeleton key={index} />
            ))}
        </div>
    );
}
