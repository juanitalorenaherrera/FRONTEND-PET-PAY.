// src/features/profile/view/ProfileView.tsx

import { Bone, Calendar, Star } from 'lucide-react';

import { LoadingPaws } from '@/components/ui/LoadingPaws'; // Asumiendo que existe un loader
import { ProfileForm } from '@/features/profile/componets/ProfileForm';
import { ProfileHeader } from '@/features/profile/componets/ProfileHeader';
import { StatCard } from '@/features/profile/componets/StatCard';
import { motion } from 'framer-motion';
import { useProfile } from '../hooks/useProfile';

export const ProfileView = () => {
  const { profile, loading, error, actions } = useProfile();

  if (loading) return <LoadingPaws message="Cargando tu perfil..." />;
  if (error) return <div>Error: {error} <button onClick={actions.retry}>Reintentar</button></div>;
  if (!profile) return null;

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-neutral-50 to-pet-teal/5 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8 transition-colors duration-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <ProfileHeader user={profile} />

      <motion.div
        className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {/* Columna de Formulario */}
        <div className="lg:col-span-2">
          <ProfileForm profile={profile} onSave={actions.updateProfile} />
        </div>

        {/* Columna de Estadísticas */}
        <div className="space-y-6">
           <StatCard
            icon={Bone}
            label="Mascotas Registradas"
            value="3"
            color="bg-pet-orange"
          />
          <StatCard
            icon={Calendar}
            label="Reservas Totales"
            value="12"
            color="bg-pet-blue"
          />
          <StatCard
            icon={Star}
            label="Reseñas Recibidas"
            value="8"
            color="bg-pet-yellow"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};
