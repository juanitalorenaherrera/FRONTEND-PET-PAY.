// src/features/caregiver/components/ServiceCard.tsx

import { Button } from '@/components/ui/Button';
import type { CaretakerService } from '../types'; // Importamos el tipo desde el archivo de tipos del feature
import { MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

// --- Definición de Props ---
interface ServiceCardProps {
  /** El objeto de servicio que contiene los datos a mostrar. */
  service: CaretakerService;
}

/**
 * Un card elegante para mostrar un servicio ofrecido por el cuidador.
 * Incluye un ícono, título, precio y un menú de acciones.
 */
export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  // El tipo de `service.icon` es React.ElementType, así que podemos renderizarlo como un componente.
  const IconComponent = service.icon;

  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/60 p-5 shadow-lg backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:bg-white/80"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="flex flex-col h-full">
        {/* Encabezado con Ícono y Botón de Opciones */}
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center shadow-md">
            {/* Renderizamos el ícono dinámicamente */}
            <IconComponent className="w-6 h-6 text-white" />
          </div>
          <Button 
            variant="ghost" 
            size="md" // Change "icon" to "md"
            className="w-8 h-8 rounded-full text-neutral-400 hover:bg-pet-orange/10 hover:text-pet-orange"
          >
            <MoreHorizontal className="w-5 h-5" />
          </Button>   
        </div>

        {/* Contenido Principal (ocupa el espacio restante) */}
        <div className="flex-grow">
          <h3 className="text-lg font-bold text-neutral-800 mb-1">{service.title}</h3>
        </div>

        {/* Pie de Card con Precio */}
        <div className="mt-2">
          <p className="text-xl font-display font-bold text-pet-teal">{service.price}</p>
        </div>
      </div>
    </motion.div>
  );
};
