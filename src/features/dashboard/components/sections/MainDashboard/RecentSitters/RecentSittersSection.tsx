// ===========================================
// sections/RecentSitters/RecentSittersSection.tsx
// ===========================================

import { ArrowRight } from 'lucide-react';
import React from 'react';
import type { Sitter } from '@/types/dashboardData';
import SitterCard from './SitterCard';

interface RecentSittersSectionProps {
  recentSitters?: Sitter[];
  onHireSitter: (sitter: Sitter) => void;
  onViewSitterProfile: (sitter: Sitter) => void;
  onViewAll: () => void;
  maxVisible?: number;
  className?: string;
}

/**
 * Sección que muestra cuidadores recientes o recomendados.
 * Permite navegar a la vista completa y contratar servicios.
 */
const RecentSittersSection: React.FC<RecentSittersSectionProps> = ({
  recentSitters = [],
  onHireSitter,
  onViewSitterProfile,
  onViewAll,
  maxVisible = 3,
  className = ''
}) => {
  const handleHireSitter = (sitter: Sitter) => {
    console.log('Hiring sitter from section:', sitter.id);
    onHireSitter(sitter);
  };

  const handleViewProfile = (sitter: Sitter) => {
    console.log('Viewing sitter profile from section:', sitter.id);
    onViewSitterProfile(sitter);
  };

  const handleViewAll = () => {
    console.log('Viewing all sitters');
    onViewAll();
  };

  // Si no hay cuidadores, no mostrar la sección
    if (recentSitters.length === 0) {
      return (
        <div className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 ${className}`}>
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ArrowRight className="w-8 h-8 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              No hay cuidadores disponibles
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Aún no tienes cuidadores recientes registrados.
            </p>
          <button 
            onClick={handleViewAll}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Explorar cuidadores
          </button>
        </div>
      </div>
    );
  }

  const visibleSitters = recentSitters.slice(0, maxVisible);
  const hasMoreSitters = recentSitters.length > maxVisible;

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 ${className}`}>
      {/* Header de la sección */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <ArrowRight className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Cuidadores Recientes</h2>
            <p className="text-gray-600 dark:text-gray-400">Profesionales de confianza</p>
          </div>
        </div>
        
        <div className="flex items-center sm:justify-end gap-3 pl-14 sm:pl-0">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shrink-0"></div>
            <span className="text-sm font-semibold text-green-700 bg-green-100 dark:bg-green-500/20 dark:text-green-300 px-3 py-1 rounded-full whitespace-nowrap">
              {recentSitters.length} disponible{recentSitters.length !== 1 ? 's' : ''}
            </span>
          </div>
          
          {hasMoreSitters && (
            <button 
              onClick={handleViewAll}
              className="text-sm font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-lg px-3 py-2 hover:bg-orange-50"
            >
              Ver todos <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
      
      {/* Grid de cuidadores */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,280px),1fr))] gap-6 mb-6">
        {visibleSitters.map((sitter) => (
          <SitterCard
            key={sitter.id}
            sitter={sitter}
            onHire={handleHireSitter}
            onViewProfile={handleViewProfile}
          />
        ))}
      </div>

      {/* Mensaje y acción adicional si solo hay un cuidador */}
      {recentSitters.length === 1 && (
        <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                Este es tu único cuidador reciente
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Explora más opciones para encontrar el cuidador perfecto
              </p>
            </div>
            <button 
              onClick={handleViewAll}
              className="w-full sm:w-auto px-4 py-2 bg-white dark:bg-gray-800 text-orange-600 hover:text-orange-700 font-medium border border-orange-200 dark:border-orange-500/50 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 shrink-0"
            >
              Explorar más
            </button>
          </div>
        </div>
      )}

      {/* Acción principal si hay múltiples cuidadores pero se muestran todos */}
      {!hasMoreSitters && recentSitters.length > 1 && (
        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-center">
            <button 
              onClick={handleViewAll}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 flex items-center gap-2"
            >
              Explorar todos los cuidadores
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentSittersSection;
