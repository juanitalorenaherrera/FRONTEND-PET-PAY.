// features/pets/components/states/PetsErrorState.tsx

import { ErrorState as GenericErrorState } from '../../../../components/ui/ErrorState';

interface PetsErrorStateProps {
    error: string;
    onRetry: () => void;
}

export function PetsErrorState({ error, onRetry }: PetsErrorStateProps) {
    return (
        <GenericErrorState
            title="Ocurrió un error"
            message={`No pudimos cargar tus mascotas. Por favor, intenta de nuevo. Detalle: ${error}`}
            onRetry={onRetry}
        />
    );
}
