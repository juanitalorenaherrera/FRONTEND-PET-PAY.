// src/features/caregiver/components/StatCard.tsx
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import React from 'react';

// --- Definición de Props ---
interface StatCardProps {
  /** El ícono a mostrar, usualmente de lucide-react. */
  icon: React.ReactNode;
  /** El valor numérico o de texto de la estadística. */
  value: string | number;
  /** La etiqueta descriptiva para la estadística. */
  label: string;
  /** Define el esquema de color del gradiente del ícono. */
  color: 'orange' | 'teal';
  /** El índice del card, usado para escalonar la animación de entrada. */
  index: number;
}

// --- Variantes de Animación ---
const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0 },
};

/**
 * Un card de cristal moderno y animado para mostrar estadísticas clave en el dashboard.
 * Utiliza un efecto hover para dar feedback visual al usuario.
 */
export const StatCard: React.FC<StatCardProps> = ({ icon, value, label, color, index }) => {
  return (
    <motion.div
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/20 bg-white/60 p-5 text-center shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
      variants={cardVariants}
      transition={{ 
        delay: index * 0.07,
        type: "spring",
        stiffness: 400,
        damping: 15 
      }}
    >
      {/* Icono con fondo gradiente */}
      <div 
        className={cn(
          "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl shadow-md transition-transform duration-300 group-hover:scale-110",
          color === 'orange' ? 'bg-gradient-primary' : 'bg-gradient-secondary'
        )}
      >
        {icon}
      </div>

      {/* Valor y Etiqueta */}
      <p className="font-display text-4xl font-bold text-neutral-800">
        {value}
      </p>
      <p className="mt-1 text-sm font-medium text-neutral-500">
        {label}
      </p>
    </motion.div>
  );
};
