import { useCallback, useEffect, useState } from 'react';
import { useAuthStore } from '@/store/AuthStore';
import { getAllPets } from '@/services/petService';
import type { PetResponse } from '@/types/pets';

export const useGetPets = () => {
	const user = useAuthStore((state) => state.profile);
	const [pets, setPets] = useState<PetResponse[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const getPets = useCallback(async () => {
		if (user) {
			try {
				const data = await getAllPets();
				return setPets(data);
			} catch (error) {
				console.error('Error fetching pets:', error);
			} finally {
				setIsLoading(false);
			}
		}
	}, [user]);

	useEffect(() => {
		getPets();
	}, [getPets]);

	return { pets, isLoading, refetch: getPets };
}
