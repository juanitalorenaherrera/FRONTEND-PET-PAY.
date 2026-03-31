import { create } from 'zustand';
import { PETS_CONFIG } from '@/features/pets/constants';
import type { PetActions, PetsState } from '@/types/petStore';

export const usePetsStore = create<PetsState & PetActions>((set, get) => ({
	// Estado inicial
	pets: [],
	selectedPet: null,
	stats: null,
	isLoading: true,
	error: null,
	filters: {
		search: '',
		species: [],
		activeOnly: true,
		sortBy: PETS_CONFIG.DEFAULT_SORT_BY,
		sortOrder: PETS_CONFIG.DEFAULT_SORT_ORDER,
	},
	modal: { type: null, data: null },
	filteredPets: [],

	// Acciones o "mutations"
	setLoading: (isLoading) => set({ isLoading, error: null }),
	setError: (error) => set({ error, isLoading: false }),
	setPetsData: ({ pets, stats }) => {
		set({ pets, stats, isLoading: false, error: null });
		// Después de actualizar las mascotas, volvemos a filtrar
		get().updateFilteredPets();
	},
	setSelectedPet: (selectedPet) => set({ selectedPet }),
	updateFilters: (newFilters) => {
		set((state) => ({
			filters: { ...state.filters, ...newFilters },
		}));
		// Volvemos a filtrar cada vez que los filtros cambian
		get().updateFilteredPets();
	},
	clearFilters: () => {
		set({
			filters: {
				search: '',
				species: [],
				activeOnly: true,
				sortBy: PETS_CONFIG.DEFAULT_SORT_BY,
				sortOrder: PETS_CONFIG.DEFAULT_SORT_ORDER,
			},
		});
		get().updateFilteredPets();
	},
	addPet: (pet) => {
		set((state) => ({ pets: [...state.pets, pet] }));
		get().updateFilteredPets();
	},
	updatePet: (updatedPet) => {
		set((state) => ({
			pets: state.pets.map((p) =>
				p.id === updatedPet.id ? updatedPet : p
			),
		}));
		get().updateFilteredPets();
	},
	deletePet: (petId) => {
		set((state) => ({
			pets: state.pets.filter((p) => p.id !== petId),
		}));
		get().updateFilteredPets();
	},
	showModal: (type, data = null) => set({ modal: { type, data } }),
	hideModal: () => set({ modal: { type: null, data: null } }),

	// Lógica de filtrado
	updateFilteredPets: () => {
		const { pets, filters } = get();
		const newFilteredPets = pets.filter((p) => {
			const searchMatch =
				!filters.search ||
				(p.name?.toLowerCase() || '').includes(
					filters.search.toLowerCase()
				) ||
				(p.breed?.toLowerCase() || '').includes(
					filters.search.toLowerCase()
				);
			const speciesMatch =
				!filters.species ||
				filters.species.length === 0 ||
				filters.species.includes(p.species);
			const activeMatch = !filters.activeOnly || p.active;
			return searchMatch && speciesMatch && activeMatch;
		});
		set({ filteredPets: newFilteredPets });
	},
}));
