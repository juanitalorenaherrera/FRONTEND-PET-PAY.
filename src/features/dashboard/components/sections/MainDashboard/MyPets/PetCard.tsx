// ===========================================
// sections/MyPets/PetCard.tsx
// ===========================================

import { ArrowRight } from 'lucide-react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import type { Pet } from '@/types/dashboardData';
import React from 'react';
import { getPetImage } from '@/utils/dashboardUtils';

interface PetCardProps {
	pet: Pet;
	onClick?: (petId: string) => void;
	className?: string;
}

const PetCard: React.FC<PetCardProps> = ({ pet, onClick, className = '' }) => {
	const handleClick = () => {
		onClick?.(pet.id.toString());
	};

	return (
		<button
			onClick={handleClick}
			className={`
        w-full flex items-center gap-4 p-4 rounded-xl 
        hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 text-left group
        focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
        ${className}`}
		>
			<div className="relative">
				<ImageWithFallback
					src={getPetImage(pet.species)}
					alt={pet.name}
					className="w-14 h-14 rounded-2xl object-cover border-2 border-gray-100 group-hover:border-orange-200 transition-colors"
				/>

				{/* Indicador de estado activo */}
				{pet.active && (
					<div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
						<div className="w-2 h-2 bg-white rounded-full"></div>
					</div>
				)}
			</div>

			<div className="flex-1 min-w-0">
				<p className="font-bold text-gray-900 dark:text-white truncate">{pet.name}</p>
				<p className="text-sm text-gray-600 dark:text-gray-400 truncate">
					{pet.breed || pet.species}
				</p>
				<p className="text-xs text-gray-500 dark:text-gray-500">
					{pet.age} año{pet.age !== 1 ? 's' : ''} • {pet.species}
				</p>
			</div>

			<ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
		</button>
	);
};

export default PetCard;
