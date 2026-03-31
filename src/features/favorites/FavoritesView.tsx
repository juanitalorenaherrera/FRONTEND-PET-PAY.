// src/features/favorites/view/FavoritesView.tsx

import { Heart, MapPin, Star, User } from 'lucide-react';

import { Badge } from '@/components/ui/Badge'; // Y este
import { Button } from '@/components/ui/Button'; // Asegúrate de tener este componente
import { motion } from 'framer-motion';

// Datos de ejemplo
const favoriteSitters = [
  { id: 1, name: 'Anaís Herrera', rating: 4.9, location: 'Santiago, Chile', image: null, tags: ['Gatos', 'Perros Pequeños'] },
  { id: 2, name: 'Iván Castillo', rating: 5.0, location: 'Valparaíso, Chile', image: null, tags: ['Perros Grandes', 'Experto'] },
  { id: 3, name: 'Lorena Pérez', rating: 4.8, location: 'Santiago, Chile', image: null, tags: ['Cachorros'] },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const FavoritesView = () => {
  return (
    <motion.div
      className="min-h-screen bg-neutral-50 dark:bg-gray-900 p-4 md:p-8 transition-colors duration-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.header 
        className="bg-gradient-primary rounded-3xl p-8 mb-8 text-black dark:text-white shadow-xl dark:shadow-none"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Heart className="w-8 h-8"/>
          Mis Cuidadores Favoritos
        </h1>
        <p className="text-black/80 dark:text-white/80 mt-2">Los cuidadores que amas, en un solo lugar.</p>
      </motion.header>

      {favoriteSitters.length > 0 ? (
        <motion.div 
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {favoriteSitters.map(sitter => (
            <motion.div
              key={sitter.id}
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-none border border-neutral-200 dark:border-gray-700 overflow-hidden group transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <div className="h-40 bg-black flex items-center justify-center">
                <User className="w-16 h-16 text-white/50" />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-neutral-800 dark:text-white">{sitter.name}</h3>
                <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-gray-400 my-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-pet-yellow fill-current" />
                    <span>{sitter.rating.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-pet-orange" />
                    <span>{sitter.location}</span>
                  </div>
                </div>
                 <div className="flex flex-wrap gap-2 mt-3">
                  {sitter.tags.map(tag => <Badge key={tag} variant="default">{tag}</Badge>)}
                </div>
                <Button className="w-full mt-4" variant="primary">Ver Perfil</Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-16">
          <Heart className="mx-auto w-16 h-16 text-neutral-300 dark:text-gray-600" />
          <h2 className="mt-4 text-2xl font-semibold text-neutral-700 dark:text-gray-300">Aún no tienes favoritos</h2>
          <p className="mt-2 text-neutral-500 dark:text-gray-400">Explora la lista de cuidadores y añade los que más te gusten.</p>
          <Button className="mt-6" variant="primary">Buscar Cuidadores</Button>
        </div>
      )}
    </motion.div>
  );
};
