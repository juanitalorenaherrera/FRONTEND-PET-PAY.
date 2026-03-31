import { ErrorState as GenericErrorState } from '@/components/ui/ErrorState';
import { useSittersStore } from '@/store/SitterStore';

export function SittersErrorState({ className = '' }: { className?: string }) {
    const { error, clearFilters } = useSittersStore((state) => state);

    if (!error) {
        return null;
    }

    return (
        <GenericErrorState
            title="Error al Cargar Cuidadores"
            message={error}
            onRetry={clearFilters}
            className={className}
        />
    );
}
