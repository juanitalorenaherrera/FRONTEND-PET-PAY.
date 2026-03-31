// features/pets/components/PetsGrid.tsx - Versión Refactorizada

import React, { memo } from 'react';

import type { Pet } from '@/features/pets/types';
import { PetCard } from './PetCard';
import { useNavigate } from 'react-router-dom';
import { usePetsStore } from '../../../store/PetStore';

// 1. LAS PROPS SE SIMPLIFICAN. Ya no necesita callbacks de eventos.
interface PetsGridProps {
    pets: Pet[];
    variant?: 'grid' | 'list';
    maxItems?: number;
    showPagination?: boolean;
    onViewAll?: () => void; // Un callback para la acción de paginación
    className?: string;
}

const PetsGridComponent: React.FC<PetsGridProps> = ({
    pets,
    variant = 'grid',
    maxItems,
    showPagination = false,
    onViewAll,
    className = '',
}) => {
    const navigate = useNavigate();
    const setSelectedPet = usePetsStore((state) => state.setSelectedPet);

    // 2. LA LÓGICA DERIVADA SE MANTIENE. Es correcta.
    const petsToShow = maxItems ? pets.slice(0, maxItems) : pets;
    const hasMorePets = !!(maxItems && pets.length > maxItems);

    const handlePetClick = (pet: Pet) => {
        setSelectedPet(pet);
        navigate(`/dashboard/pets/${pet.id}`);
    };

    // 4. CLASES CONDICIONALES PARA EVITAR DUPLICACIÓN DE CÓDIGO.
    const containerClasses = variant === 'grid'
        ? 'grid grid-cols-[repeat(auto-fill,minmax(min(100%,280px),1fr))] gap-4'
        : 'space-y-2';

    return (
        <div className={className}>
            <div className={containerClasses}>
                {petsToShow.map((pet) => (
                    <PetCard
                        key={pet.id}
                        pet={pet}
                        variant={variant === 'grid' ? 'default' : 'compact'}
                        onClick={handlePetClick}
                    />
                ))}
            </div>

            {hasMorePets && showPagination && (
                <div className="text-center pt-4 mt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-500 mb-3">
                        Mostrando {petsToShow.length} de {pets.length} mascotas
                    </p>
                    <button
                        onClick={onViewAll}
                        className="text-orange-600 hover:underline font-medium text-sm"
                    >
                        Ver todas las mascotas
                    </button>
                </div>
            )}
        </div>
    );
};

export const PetsGrid = memo(PetsGridComponent);
