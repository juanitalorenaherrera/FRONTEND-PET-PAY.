// features/booking/types/index.ts

/**
 * Representa los posibles estados de una reserva, alineado con el enum del backend.
 */
export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

// ====================================================================
// REQUEST DTOs (Data sent TO the backend)
// ====================================================================

/**
 * Datos necesarios para crear una nueva reserva.
 * Corresponde a `CreateBookingRequest.java`.
 */
export interface CreateBookingRequest {
  petId: number;
  sitterId: number;
  serviceOfferingId: number;
  startTime: string; // Formato ISO: "YYYY-MM-DDTHH:mm:ss"
  notes?: string;
}

/**
 * Datos que se pueden actualizar en una reserva existente.
 * Corresponde a `UpdateBookingRequest.java`.
 */
export interface UpdateBookingRequest {
  startTime?: string;
  notes?: string;
}

// ====================================================================
// RESPONSE DTOs (Data received FROM the backend)
// ====================================================================

/**
 * Información resumida de una reserva, ideal para listas.
 * Corresponde a `BookingSummaryResponse.java`.
 */
export interface BookingSummary {
  id: number;
  petName: string;
  sitterName: string;
  startTime: string; // Formato ISO
  status: BookingStatus;
  totalPrice: number;
}

/**
 * Información detallada de una reserva.
 * Corresponde a `BookingDetailResponse.java`.
 */
export interface BookingDetail {
  id: number;
  petId: number;
  petName: string;
  sitterId: number;
  sitterName: string;
  serviceOfferingId: number;
  serviceName: string;
  bookedByUserId: number;
  bookedByUserName: string;
  startTime: string; // Formato ISO
  endTime: string;   // Formato ISO
  actualStartTime?: string;
  actualEndTime?: string;
  status: BookingStatus;
  totalPrice: number;
  notes?: string;
  cancellationReason?: string;
  createdAt: string; // Formato ISO
  updatedAt: string; // Formato ISO
}

/**
 * Estructura genérica para respuestas paginadas de la API.
 */
export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number; // Current page number (0-indexed)
  size: number;
  first: boolean;
  last: boolean;
}

// ====================================================================
// FEATURE-INTERNAL TYPES (For state management and components)
// ====================================================================

/**
 * Define la forma del estado global para la feature de reservas.
 */
export interface BookingsState {
  bookings: BookingSummary[];
  selectedBooking: BookingDetail | null;
  stats: BookingStats | null;
  isLoading: boolean;
  error: string | null;
  filters: BookingFilters;
  pagination: PaginationState;
  modal: {
    type: 'add' | 'edit' | 'cancel' | null;
    data?: BookingSummary | BookingDetail | null;
  };
}

/**
 * Define los filtros aplicables a la lista de reservas.
 */
export interface BookingFilters {
  search?: string;
  status?: BookingStatus[];
  sortBy: 'startTime' | 'createdAt' | 'totalPrice';
  sortOrder: 'asc' | 'desc';
}

/**
 * Contiene la información de paginación derivada de PageResponse.
 */
export interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
}

/**
 * Estructura para las estadísticas de reservas.
 * Esto lo derivaremos en el frontend por ahora.
 */
export interface BookingStats {
  totalCount: number;
  pendingCount: number;
  confirmedCount: number;
  inProgressCount: number;
  upcomingCount: number;
}
