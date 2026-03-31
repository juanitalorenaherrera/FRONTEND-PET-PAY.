// features/pets/components/states/PetsLoadingState.tsx

import { Skeleton } from '../../../../components/ui/Skeleton'; // Ajusta la ruta a tu componente genérico

// Un esqueleto para una sola PetCard
const PetCardSkeleton = () => (
    <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-4">
        <Skeleton className="w-12 h-12 rounded-xl flex-shrink-0" />
        <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-3 w-1/3" />
            <Skeleton className="h-3 w-3/4" />
        </div>
    </div>
);

// El componente que renderiza la grilla de esqueletos
export function PetsLoadingState() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Creamos un array de 6 elementos para mostrar 6 esqueletos */}
            {Array.from({ length: 6 }).map((_, index) => (
                <PetCardSkeleton key={index} />
            ))}
        </div>
    );
}
