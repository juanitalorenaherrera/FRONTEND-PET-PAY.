import { AnimatePresence, motion } from 'framer-motion';

import type { ExtendedSitter } from '@/features/sitters/types';
import { SitterCard } from './SitterCard';
import { SitterCardSkeleton } from './SitterCardSkeleton';

// ✨ CORRECCIÓN 1: Asegúrate de que la importación apunta a la fuente de la verdad.


interface SitterGridProps {
  sitters: ExtendedSitter[];
  onHire: (sitter: ExtendedSitter) => void;
  onViewProfile: (sitter: ExtendedSitter) => void;
  // ✨ CORRECCIÓN 2: Añade la nueva propiedad aquí.
  isLoading?: boolean; 
}

export function SitterGrid({ sitters, onHire, onViewProfile, isLoading }: SitterGridProps) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,290px),1fr))] gap-6">
      <AnimatePresence>
        {/* ✨ CORRECCIÓN 3: Lógica para mostrar esqueletos de carga */}
        {isLoading ? (
          // Si está cargando, muestra 8 esqueletos
          Array.from({ length: 8 }).map((_, index) => (
            <SitterCardSkeleton key={`skeleton-${index}`} />
          ))
        ) : (
          // Si no está cargando, muestra los cuidadores reales
          sitters.map((sitter) => (
            <motion.div
              key={sitter.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <SitterCard 
                sitter={sitter} 
                onHire={() => onHire(sitter)} 
                onViewProfile={() => onViewProfile(sitter)} 
              />
            </motion.div>
          ))
        )}
      </AnimatePresence>
    </div>
  );
}
