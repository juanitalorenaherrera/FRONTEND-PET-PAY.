import { create } from 'zustand';
import type {
	SitterStats,
	SitterFilters,
} from '@/features/sitters/types';
import type { ExtendedSitter } from '@/features/sitters/types';
import {
	getActiveSitters,
	getSitterStats,
	searchSitters,
} from '@/services/sitterService';

// ====================================================================
// 1. INTERFAZ DE ESTADO Y ACCIONES
// ====================================================================

interface SittersState {
	sitters: ExtendedSitter[];
	stats: SitterStats | null;
	favorites: Set<number>;
	selectedSitter: ExtendedSitter | null;
	isLoading: boolean;
	error: string | null;
	filters: SitterFilters;
	pagination: {
		page: number;
		hasMore: boolean;
	};
	filteredSitters: ExtendedSitter[];

	// Acciones o "mutations"
	setLoading: (isLoading: boolean) => void;
	setError: (error: string | null) => void;
	setData: (payload: {
		sitters: ExtendedSitter[];
		stats: SitterStats;
	}) => void;
	setFilters: (filters: SitterFilters) => void;
	updateFilter: (update: Partial<SitterFilters>) => void;
	clearFilters: () => void;
	toggleFavorite: (sitterId: number) => void;
	setSelectedSitter: (sitter: ExtendedSitter | null) => void;
	applyFilteringAndSorting: () => void;

	// Lógica asíncrona centralizada
	fetchSitters: () => Promise<void>;
}

// ====================================================================
// 2. CREACIÓN DEL STORE CON ZUSTAND
// ====================================================================

const initialState = {
	sitters: [],
	stats: null,
	favorites: new Set<number>(),
	selectedSitter: null,
	isLoading: true,
	error: null,
	filters: { sortBy: 'relevance' as const, sortDirection: 'desc' as const },
	pagination: { page: 1, hasMore: true },
	filteredSitters: [],
};

export const useSittersStore = create<SittersState>((set, get) => ({
	...initialState,

	// Acciones que modifican el estado de forma síncrona
	setLoading: (isLoading) => set({ isLoading, error: null }),
	setError: (error) => set({ error, isLoading: false }),
	setData: (payload) => {
		set({
			isLoading: false,
			error: null,
			sitters: payload.sitters,
			stats: payload.stats,
		});
		get().applyFilteringAndSorting();
	},
	setFilters: (filters) => {
		set({ filters, pagination: { page: 1, hasMore: true } });
		get().applyFilteringAndSorting();
	},
	updateFilter: (update) => {
		set((state) => ({
			filters: { ...state.filters, ...update },
			pagination: { page: 1, hasMore: true },
		}));
		get().applyFilteringAndSorting();
	},
	clearFilters: () => {
		set({
			filters: { sortBy: 'relevance' as const, sortDirection: 'desc' as const },
			pagination: { page: 1, hasMore: true },
		});
		get().applyFilteringAndSorting();
	},
	toggleFavorite: (sitterId) => {
		set((state) => {
			const newFavorites = new Set(state.favorites);
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			newFavorites.has(sitterId)
				? newFavorites.delete(sitterId)
				: newFavorites.add(sitterId);
			return { favorites: newFavorites };
		});
	},
	setSelectedSitter: (selectedSitter) => set({ selectedSitter }),

	// Lógica de filtrado y ordenamiento movida al store
	applyFilteringAndSorting: () => {
		const { sitters, filters } = get();
		let result = [...sitters];

		// Lógica de filtrado
		if (filters.searchTerm) {
			const term = filters.searchTerm.toLowerCase();
			result = result.filter(
				(sitter) =>
					sitter.sitterName.toLowerCase().includes(term) ||
					sitter.location?.toLowerCase().includes(term) ||
					sitter.bio?.toLowerCase().includes(term)
			);
		}

		// Lógica de ordenamiento
		const direction = filters.sortDirection === 'asc' ? 1 : -1;
		result.sort((a, b) => {
			switch (filters.sortBy) {
				case 'rating':
					return (
						((b.averageRating || 0) - (a.averageRating || 0)) *
						direction
					);
				case 'hourlyRate':
					return (
						((a.hourlyRate || 0) - (b.hourlyRate || 0)) * direction
					);
				case 'distance': {
					const distA = parseFloat(a.distance || '999');
					const distB = parseFloat(b.distance || '999');
					return (distA - distB) * direction;
				}
				case 'relevance':
				default: {
					const scoreA =
						(a.averageRating || 0) * (a.isAvailable ? 1.5 : 1);
					const scoreB =
						(b.averageRating || 0) * (b.isAvailable ? 1.5 : 1);
					return (scoreB - scoreA) * direction;
				}
			}
		});

		set({ filteredSitters: result });
	},

	// Lógica asíncrona centralizada en el store
	fetchSitters: async () => {
		set({ isLoading: true, error: null });
		try {
			const { filters } = get();
			const hasActiveSearch =
				Object.keys(filters).length > 0 && filters.searchTerm;

			const [sittersData, statsData] = await Promise.all([
				hasActiveSearch ? searchSitters(filters) : getActiveSitters(),
				getSitterStats(),
			]);

			set({
				sitters: sittersData,
				stats: statsData,
				isLoading: false,
				error: null,
			});
			get().applyFilteringAndSorting(); // Asegura que los datos se filtren y ordenen al cargar
		} catch (err) {
			const message =
				err instanceof Error
					? err.message
					: 'Error al obtener los cuidadores';
			set({ error: message, isLoading: false });
		}
	},
}));
