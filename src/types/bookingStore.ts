import { type BookingDetail, type BookingFilters, type BookingStats, type BookingSummary, type PaginationState, type CreateBookingRequest, BookingStatus, type PageResponse } from "@/features/booking/types";

export interface BookingsState {
	bookings: BookingSummary[];
	selectedBooking: BookingDetail | null;
	stats: BookingStats | null;
	isLoading: boolean;
	error: string | null;
	filters: BookingFilters;
	pagination: PaginationState;
	filteredBookings: BookingSummary[];
	// Nuevos campos para funcionalidades avanzadas
	lastFetch: Date | null;
	optimisticTimeouts: Map<number, NodeJS.Timeout>;
	autoRefreshInterval: NodeJS.Timeout | null;
}

interface BookingActionOptions {
	skipCache?: boolean;
	silent?: boolean;
	optimistic?: boolean;
}

export interface BookingsAction {
	// Acciones o "mutations"
	setLoading: (isLoading: boolean) => void;
	setError: (error: string | null) => void;
	setDataSuccess: (payload: {
		page: PageResponse<BookingSummary>;
		stats: BookingStats;
	}) => void;
	setSelectedBooking: (booking: BookingDetail | null) => void;
	deleteBooking: (bookingId: number) => void;
	updateBooking: (booking: BookingSummary) => void;
	addBooking: (booking: BookingSummary) => void;
	setPage: (page: number) => void;
	// Acciones para la lógica de filtrado si se necesitara en el frontend.
	applyFilters: () => void;
	
	// Funciones de API avanzadas
	loadBookings: (options?: BookingActionOptions) => Promise<void>;
	refreshBookings: (accountId: number) => Promise<void>;
	createBooking: (bookingData: CreateBookingRequest, options?: BookingActionOptions) => Promise<BookingDetail>;
	deleteBookingById: (bookingId: number, options?: BookingActionOptions) => Promise<void>;
	updateStatus: (bookingId: number, newStatus: BookingStatus, reason?: string, options?: BookingActionOptions) => Promise<BookingDetail>;
	selectBooking: (bookingId: number | null) => Promise<BookingDetail | void>;
	
	// Auto-refresh
	startAutoRefresh: () => void;
	stopAutoRefresh: () => void;
	
	// Utility functions
	clearError: () => void;
	resetState: () => void;
	cleanup: () => void;
	
	// Computed getters
	getPendingBookings: () => BookingSummary[];
	getUpcomingBookings: () => BookingSummary[];
	getTotalBookings: () => number;
	getHasNextPage: () => boolean;
	getHasPreviousPage: () => boolean;
	getShouldRefresh: () => boolean;
}

export const initialState: BookingsState = {
	bookings: [],
	selectedBooking: null,
	stats: null,
	isLoading: true,
	error: null,
	filters: {
		status: [BookingStatus.PENDING, BookingStatus.CONFIRMED],
		sortBy: 'startTime',
		sortOrder: 'asc',
	},
	pagination: {
		currentPage: 1,
		pageSize: 10,
		totalPages: 1,
		totalElements: 0,
		hasNext: false,
	},
	filteredBookings: [],
	// Nuevos campos
	lastFetch: null,
	optimisticTimeouts: new Map(),
	autoRefreshInterval: null,
};
