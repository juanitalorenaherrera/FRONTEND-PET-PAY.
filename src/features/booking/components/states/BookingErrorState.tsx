// features/booking/components/states/BookingsErrorState.tsx
import { ErrorState as GenericErrorState } from '@/components/ui/ErrorState'; // Renombramos para evitar colisiones

interface BookingsErrorStateProps {
    error: string;
    onRetry: () => void;
}

export function BookingsErrorState({ error, onRetry }: BookingsErrorStateProps) {
    return (
        <GenericErrorState
            title="Ocurrió un Error"
            message={`No pudimos cargar tus citas. Por favor, intenta de nuevo. Detalle: ${error}`}
            onRetry={onRetry}
        />
    );
}
