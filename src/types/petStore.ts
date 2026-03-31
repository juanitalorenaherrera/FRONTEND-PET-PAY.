import type { Pet, PetFilters, PetStats } from '../features/pets/types';

export enum Type {
	ADD = 'add',
	EDIT = 'edit'
}

interface Modal {
	type: Type | null;
	data: Pet | null;
}

export interface PetsState {
	pets: Pet[];
	selectedPet: Pet | null;
	stats: PetStats | null;
	isLoading: boolean;
	error: string | null;
	filters: PetFilters;
	modal: Modal;
}

export interface PetActions {
	filteredPets: Pet[];
	setLoading: (isLoading: boolean) => void;
	setError: (error: string | null) => void;
	setPetsData: (data: { pets: Pet[]; stats: PetStats | null }) => void;
	setSelectedPet: (pet: Pet | null) => void;
	updateFilters: (filters: Partial<PetFilters>) => void;
	clearFilters: () => void;
	addPet: (pet: Pet) => void;
	updatePet: (pet: Pet) => void;
	deletePet: (petId: number) => void;
	showModal: (type: Type, data?: Pet | null) => void;
	hideModal: () => void;
	updateFilteredPets: () => void;
}
