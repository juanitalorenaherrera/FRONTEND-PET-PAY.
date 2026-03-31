// ===========================================
// sections/RecentSitters/SitterCard.tsx
// ===========================================

import { Clock, Shield, Star, Users } from 'lucide-react';

import ImageWithFallback from '@/components/ui/ImageWithFallback';
import React from 'react';
import type { Sitter } from '@/types/dashboardData';
import { generateDefaultAvatar } from '@/utils/dashboardUtils';

interface SitterCardProps {
  sitter: Sitter;
  onHire: (sitter: Sitter) => void;
  onViewProfile: (sitter: Sitter) => void;
  className?: string;
}

/**
 * Componente de tarjeta individual para un cuidador
 * Muestra información básica del sitter con acciones disponibles
 */
const SitterCard: React.FC<SitterCardProps> = ({ 
  sitter, 
  onHire, 
  onViewProfile,
  className = '' 
}) => {
  const handleHire = () => {
    console.log('Hiring sitter:', sitter.id);
    onHire(sitter);
  };

  const handleViewProfile = () => {
    console.log('Viewing sitter profile:', sitter.id);
    onViewProfile(sitter);
  };

  const avatarSrc = sitter.profileImageUrl || generateDefaultAvatar(sitter.sitterName);
  const displayRating = sitter.averageRating ? sitter.averageRating.toFixed(1) : '5.0';
  const displayHourlyRate = sitter.hourlyRate || 25;

  return (
    <div 
      className={`
        group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 
        hover:shadow-xl hover:border-orange-200 dark:hover:border-orange-500/50 transition-all duration-300 
        hover:-translate-y-2 flex-1 w-full ${className}
      `}
    >
      {/* Header con información básica */}
      <div className="flex items-center gap-4 mb-4">
        <div className="relative">
          <ImageWithFallback
            src={avatarSrc}
            alt={sitter.sitterName}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-gray-100 dark:border-gray-700"
          />
          
          {/* Badge de verificación/estado */}
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-white flex items-center justify-center shadow-lg">
            {sitter.isVerified ? (
              <Shield className="w-3 h-3 text-white" />
            ) : (
              <Clock className="w-3 h-3 text-white" />
            )}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-gray-900 dark:text-white text-lg truncate">
            {sitter.sitterName}
          </h4>
          <p className="text-orange-600 dark:text-orange-400 font-medium text-sm truncate">
            {sitter.location || 'Ubicación no disponible'}
          </p>
          
          {/* Rating y badges */}
          <div className="flex items-center gap-1 mt-1">
            <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              {displayRating}
            </span>
            {sitter.isVerified && (
              <span className="text-xs bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded-full ml-2">
                Verificado
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Información de servicios */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-3 text-sm">
          <div className="w-8 h-8 bg-green-100 dark:bg-green-500/20 rounded-lg flex items-center justify-center">
            <span className="text-green-600 dark:text-green-400 font-bold text-xs">$</span>
          </div>
          <div className="flex-1 flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">Tarifa por hora:</span>
            <span className="font-bold text-gray-900 dark:text-white">
              ${displayHourlyRate}/hr
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-3 text-sm">
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-500/20 rounded-lg flex items-center justify-center">
            <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-1 flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">Ubicación:</span>
            <span className="font-medium text-gray-900 dark:text-white truncate max-w-32">
              {sitter.location || 'No especificada'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <div className="w-8 h-8 bg-purple-100 dark:bg-purple-500/20 rounded-lg flex items-center justify-center">
            <Shield className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="flex-1 flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">Estado:</span>
            <span className={`font-medium text-sm px-2 py-1 rounded-full ${
              sitter.isVerified 
                ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400' 
                : 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400'
            }`}>
              {sitter.isVerified ? 'Verificado' : 'Pendiente'}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-3 text-sm">
          <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-500/20 rounded-lg flex items-center justify-center">
            <Star className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div className="flex-1 flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">Calificación promedio:</span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-500" fill="currentColor" />
              <span className="font-medium text-gray-900 dark:text-white">
                {displayRating}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Acciones */}
      <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
        <button 
          onClick={handleHire}
          className="flex-1 px-4 py-3 rounded-xl font-medium transition-all duration-200 bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        >
          Contratar
        </button>
        
        <button 
          onClick={handleViewProfile}
          className="px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          aria-label="Ver perfil del cuidador"
        >
          <Users className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default SitterCard;
