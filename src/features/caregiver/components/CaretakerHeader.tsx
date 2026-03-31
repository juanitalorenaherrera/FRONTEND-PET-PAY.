// src/features/caregiver/components/CaretakerHeader.tsx

import { Bell, Plus } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import type { Profile } from '@/features/auth/types/authStore'; // Asegúrate que esta es la ruta a tu interfaz User
import { motion } from 'framer-motion';

interface CaretakerHeaderProps {
  user: Profile | null;
}

export const CaretakerHeader: React.FC<CaretakerHeaderProps> = ({ user }) => (
  <motion.header 
    className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="text-center sm:text-left">
      <h1 className="font-display text-3xl font-bold text-neutral-800">
        {/* CORRECCIÓN: Usamos user.name en lugar de user.firstName */}
        ¡Hola, {user?.firstName + ' ' + user?.lastName || 'Cuidador'}! 🐾
      </h1>
      <p className="text-neutral-500">Bienvenido a tu centro de mando.</p>
    </div>
    <div className="flex items-center gap-3">
      <Button variant="primary" size="lg" className="gap-2">
        <Plus className="w-5 h-5" />
        Ofrecer Servicio
      </Button>
      <div className="relative">
        <Button variant="ghost" size="sm" className="rounded-full w-12 h-12 bg-white/80 backdrop-blur-sm">
            <Bell className="text-neutral-600" />
        </Button>
        <div className="absolute top-1 right-1 w-3 h-3 bg-pet-orange rounded-full border-2 border-white" />
      </div>
      <div className="w-12 h-12 rounded-full bg-gradient-secondary flex items-center justify-center text-white font-bold text-xl">
        {/* CORRECCIÓN: Usamos la inicial de user.name */}
        {user?.firstName ? user.firstName.charAt(0).toUpperCase() : 'C'}
      </div>
    </div>
  </motion.header>
);
