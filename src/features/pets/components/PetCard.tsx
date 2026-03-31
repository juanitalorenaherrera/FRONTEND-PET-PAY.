// features/pets/components/PetCard.tsx - Versión Refactorizada

import {
    AlertTriangle,
    Calendar,
    MoreVertical,
    Stethoscope,
} from 'lucide-react';
import type { Pet, PetCardProps } from '../types';
import React, { memo } from 'react';
import {
	formatPetAge,
	generatePetAvatar,
	getPetImageUrl,
	getPetStatusInfo,
} from '@/features/pets/utils/petUtils';

import ImageWithFallback from '@/components/ui/ImageWithFallback';

// ====================================================================
// 1. SUB-COMPONENTES INTERNOS: Abstraemos la complejidad en piezas más pequeñas.
//    Esto hace que el componente principal sea mucho más legible.
// ====================================================================

const PetAvatar: React.FC<{ pet: Pet; variant: 'compact' | 'default' | 'detailed' }> = ({ pet, variant }) => {
    const statusInfo = getPetStatusInfo(pet);
    const sizeClasses = variant === 'compact' ? 'w-10 h-10 rounded-lg' : 'w-12 h-12 rounded-xl';

    return (
        <div className="relative flex-shrink-0">
            <ImageWithFallback
                src={getPetImageUrl(pet.species, pet.breed)}
                alt={`${pet.name}`}
                className={`${sizeClasses} object-cover border-2 border-white shadow-sm group-hover:scale-105 transition-transform duration-200`}
                fallbackSrc={generatePetAvatar(pet.name)}
            />
            {/* Los indicadores de estado se aplican solo a las variantes no compactas */}
            {variant !== 'compact' && (
                <>
                    {statusInfo.isNew && (
                        <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center" title="Recién añadido">
                            <span className="text-xs text-white font-bold">N</span>
                        </div>
                    )}
                    {statusInfo.needsAttention && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center" title="Necesita atención">
                            <AlertTriangle className="w-2 h-2 text-white" />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

const PetInfo: React.FC<{ pet: Pet; variant: 'compact' | 'default' | 'detailed' }> = ({ pet, variant }) => {
    const statusInfo = getPetStatusInfo(pet);

    if (variant === 'compact') {
        return (
            <>
                <h4 className="font-medium text-gray-900 dark:text-white truncate">{pet.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{pet.species} • {formatPetAge(pet.age)}</p>
            </>
        );
    }

    return (
        <>
            <div className="flex items-center gap-2 mb-1">
                <h4 className="font-bold text-gray-900 dark:text-white truncate text-sm" title={pet.name}>{pet.name}</h4>
                {!pet.active && <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full">Inactivo</span>}
            </div>
            <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-orange-600 dark:text-orange-400 font-medium bg-orange-100 dark:bg-orange-500/20 px-2 py-0.5 rounded-full">{pet.species || 'Sin especificar'}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{formatPetAge(pet.age)}</span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 truncate" title={pet.breed}>{pet.breed || 'Mestizo'}</p>
            
            {/* Información adicional solo para la variante 'detailed' */}
            {variant === 'detailed' && (
                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-200">
                    {statusInfo.hasSpecialNeeds && (
                        <div className="flex items-center gap-1" title="Cuidados especiales">
                            <Stethoscope className="w-3 h-3 text-blue-500" />
                            <span className="text-xs text-blue-600">Cuidados especiales</span>
                        </div>
                    )}
                    {statusInfo.ageCategory === 'Senior' && (
                        <div className="flex items-center gap-1" title="Mascota Senior">
                            <Calendar className="w-3 h-3 text-purple-500" />
                            <span className="text-xs text-purple-600">Senior</span>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

// ====================================================================
// 2. COMPONENTE PRINCIPAL: Ahora es una única estructura de retorno.
//    Es declarativo y fácil de leer. Las variantes solo cambian las clases.
// ====================================================================

const PetCardComponent: React.FC<PetCardProps> = ({
    pet,
    variant = 'default',
    showActions = true,
    onClick,
    onMenuClick,
    className = '',
}) => {
    
    // Lógica para manejar los clicks, sin cambios.
    const handleCardClick = () => onClick?.(pet);
    const handleMenuClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onMenuClick?.(pet);
    };

    // 3. CLASES CONDICIONALES: Centralizamos la lógica de estilos de las variantes.
    const containerClasses = variant === 'compact'
        ? 'flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-orange-200 dark:hover:border-orange-500/50 hover:bg-orange-50 dark:hover:bg-orange-500/10'
        : 'bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-4 hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:border-orange-200 dark:hover:border-orange-500/50 border border-transparent group';
    
    const contentWrapperClasses = variant === 'compact'
        ? 'flex items-center gap-3 w-full'
        : 'flex items-start gap-3 w-full';

    return (
        <div
            className={`transition-all duration-200 cursor-pointer ${containerClasses} ${className}`}
            onClick={handleCardClick}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && handleCardClick()}
        >
            <div className={contentWrapperClasses}>
                <PetAvatar pet={pet} variant={variant} />
                
                <div className="flex-1 min-w-0">
                    <PetInfo pet={pet} variant={variant} />
                </div>
                
                {showActions && (
                    <button
                        onClick={handleMenuClick}
                        className="flex-shrink-0 p-1 text-gray-400 hover:text-orange-600 hover:bg-orange-100 rounded-lg transition-colors duration-200"
                        title="Acciones"
                    >
                        <MoreVertical className="w-4 h-4" />
                    </button>
                )}
            </div>
        </div>
    );
};

export const PetCard = memo(PetCardComponent);
