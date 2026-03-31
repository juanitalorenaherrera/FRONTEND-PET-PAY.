import { useSittersStore } from '@/store/SitterStore';
import { Users, FilterX } from 'lucide-react';

// El componente ya no necesita props.
export function EmptyState() {
    // 1. Obtenemos el estado y las acciones directamente del contexto.
    const { filters, clearFilters } = useSittersStore((state) => state);

    // 2. Determinamos si hay filtros activos.
    // (Ignoramos las claves de ordenamiento que pueden estar por defecto).
    const hasActiveFilters = !!(filters.searchTerm || filters.maxDistance || filters.minRating || filters.maxHourlyRate || filters.specialty || filters.availableOnly);

    // 3. El componente ahora renderiza contenido diferente según el contexto.
    const Icon = hasActiveFilters ? FilterX : Users;
    const title = hasActiveFilters 
        ? "Ningún cuidador coincide con tus filtros" 
        : "No se encontraron cuidadores";
    const description = hasActiveFilters
        ? "Prueba ajustar o limpiar los filtros para ampliar tu búsqueda."
        : "Parece que aún no hay cuidadores disponibles en la plataforma. Vuelve a intentarlo más tarde.";

    return (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="max-w-md mx-auto">
                <Icon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {title}
                </h3>
                <p className="text-gray-600 mb-6">
                    {description}
                </p>
                {/* El botón solo aparece si hay filtros que limpiar */}
                {hasActiveFilters && (
                    <button 
                        // La acción viene directamente del contexto, no de una prop.
                        onClick={clearFilters}
                        className="px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-medium"
                    >
                        Limpiar Filtros
                    </button>
                )}
            </div>
        </div>
    );
}
