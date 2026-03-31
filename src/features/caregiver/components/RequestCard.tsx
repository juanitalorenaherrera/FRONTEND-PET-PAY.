// src/features/caregiver/components/RequestCard.tsx

import type { BookingRequest } from '../types'; // Importamos el tipo desde el feature
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

// --- Definición de Props ---
interface RequestCardProps {
  /** El objeto de la solicitud de reserva con todos sus detalles. */
  request: BookingRequest;
  /** Función que se ejecuta al hacer clic en el botón 'Aceptar'. */
  onAccept: (id: string) => void;
  /** Función que se ejecuta al hacer clic en el botón 'Rechazar'. */
  onReject: (id: string) => void;
}

/**
 * Un card interactivo que presenta una solicitud de reserva pendiente.
 * Muestra los detalles del dueño, la mascota, el servicio y las ganancias,
 * con acciones claras para aceptar o rechazar.
 */
export const RequestCard: React.FC<RequestCardProps> = ({ request, onAccept, onReject }) => {
  return (
    <motion.div
      className="overflow-hidden rounded-xl border border-white/30 bg-white/70 p-5 shadow-md backdrop-blur-md transition-all duration-300 hover:shadow-lg hover:bg-white/90"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      layout // Anima los cambios si el elemento se elimina de la lista
    >
      {/* Sección Superior: Información de la Mascota y Dueño */}
      <div className="mb-4 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-secondary text-3xl shadow-sm">
          {request.petAvatar}
        </div>
        <div>
          <h4 className="font-bold text-neutral-800">
            {request.petName} - {request.ownerName}
          </h4>
          <p className="text-sm text-neutral-500">{request.dates}</p>
        </div>
      </div>

      {/* Sección Media: Detalles del Servicio y Ganancias */}
      <div className="mb-5 flex items-center justify-between">
        <span className="rounded-full bg-pet-teal/10 px-3 py-1 text-xs font-semibold text-pet-teal">
          {request.serviceType}
        </span>
        <span className="font-display text-xl font-bold text-pet-orange">
          ${request.earnings}
        </span>
      </div>

      {/* Sección Inferior: Botones de Acción */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button 
          onClick={() => onAccept(request.id)} 
          variant="secondary" 
          className="w-full"
        >
          Aceptar
        </Button>
        <Button 
          onClick={() => onReject(request.id)} 
          variant="outline" 
          className="w-full border-neutral-300 hover:bg-neutral-100"
        >
          Rechazar
        </Button>
      </div>
    </motion.div>
  );
};
