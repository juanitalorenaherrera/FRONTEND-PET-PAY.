// ===========================================
// sections/RecommendationBanner/RecommendationBanner.tsx
// ===========================================

import { ArrowRight, Heart, PawPrint, Zap } from 'lucide-react';

import type { Pet } from '@/types/dashboardData';
import React from 'react';
import { getRecommendation } from '@/utils/dashboardUtils';

interface RecommendationBannerProps {
  userPets: Pet[];
  onActionClick?: (actionId: string) => void;
  className?: string;
}

const RecommendationBanner: React.FC<RecommendationBannerProps> = ({
  userPets,
  onActionClick,
  className = ''
}) => {
  const recommendation = getRecommendation(userPets);

  const handleActionClick = () => {
    const actionId = recommendation.action.toLowerCase().replace(/\s+/g, '-');
    console.log(`Recommendation action clicked: ${actionId}`);
    onActionClick?.(actionId);
  };

  return (
    <div className={`
      relative bg-gradient-to-br from-blue-500 via-blue-600 to-purple-700 
      rounded-2xl p-6 text-white overflow-hidden ${className}
    `}>
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-2 right-2 opacity-20 animate-pulse">
        <Zap className="w-16 h-16" />
      </div>
      <div className="absolute -bottom-4 -left-4 opacity-10">
        <PawPrint className="w-20 h-20" />
      </div>
      <div className="absolute top-1/3 right-1/3 opacity-10 animate-bounce" style={{animationDelay: '2s'}}>
        <Heart className="w-6 h-6" />
      </div>
      
      <div className="relative z-10 space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
            <Heart className="w-4 h-4 text-white" />
          </div>
          <p className="font-bold text-white">Recomendación del Día</p>
        </div>
        
        {/* Contenido */}
        <div>
          <h4 className="font-bold text-white text-lg mb-2 leading-tight">
            {recommendation.title}
          </h4>
          <p className="text-blue-100 text-sm leading-relaxed">
            {recommendation.description}
          </p>
        </div>
        
        {/* Botón de acción */}
        <button 
          onClick={handleActionClick}
          className="
            w-full px-4 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl 
            hover:bg-white/30 transition-all duration-200 border border-white/20 
            font-semibold focus:outline-none focus:ring-2 focus:ring-white/50 
            focus:ring-offset-2 focus:ring-offset-transparent group
          "
        >
          <span className="flex items-center justify-center gap-2">
            {recommendation.action}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default RecommendationBanner;
