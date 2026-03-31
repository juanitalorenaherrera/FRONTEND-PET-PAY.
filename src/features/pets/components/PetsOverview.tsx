import { PetsEmptyState, PetsErrorState, PetsLoadingState } from './states';

import { PetsFilters } from './PetsFilters';
import { PetsGrid } from './PetsGrid';
import { PetsHeader } from './PetsHeader';
import { useAuthStore } from '../../../store/AuthStore';
import { usePetsActions } from '../hooks/usePetsActions';
import { usePetsStore } from '../../../store/PetStore';

export function PetsOverview({ className = '' }: { className?: string }) {
    // ✅ Solución: Seleccionamos cada pieza del estado de forma individual.
    // Esto evita re-renders innecesarios y rompe el bucle infinito.
    const isLoading = usePetsStore((state) => state.isLoading);
    const pets = usePetsStore((state) => state.pets);
    const error = usePetsStore((state) => state.error);
    const filteredPets = usePetsStore((state) => state.filteredPets);

    const { refreshPets } = usePetsActions();
    const user = useAuthStore((state) => state.profile);

    const handleRetry = () => {
        // Usamos accountId para la llamada al servicio.
        if (user?.accountId) {
            refreshPets(user.accountId);
        }
    };

    const renderContent = () => {
        // La condición de carga es más precisa ahora:
        // Muestra el spinner solo si está cargando Y aún no hay mascotas.
        if (isLoading && pets.length === 0) {
            return <PetsLoadingState />;
        }

        if (error) {
            return <PetsErrorState error={error} onRetry={handleRetry} />;
        }

        if (pets.length === 0) {
            return <PetsEmptyState />;
        }

        // Si hay mascotas, mostramos los filtros y la cuadrícula.
        return (
            <>
                <PetsFilters />
                {filteredPets.length > 0 ? (
                    <PetsGrid pets={filteredPets} />
                ) : (
                    <div className="text-center py-12 text-gray-600 dark:text-gray-400">
                        <p>Ninguna mascota coincide con los filtros aplicados.</p>
                    </div>
                )}
            </>
        );
    };

    return (
        <div className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 ${className}`}>
            <PetsHeader />
            <div className="mt-6">
                {renderContent()}
            </div>
        </div>
    );
}
