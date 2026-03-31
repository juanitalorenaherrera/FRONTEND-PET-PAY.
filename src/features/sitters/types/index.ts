import type { SITTER_CONFIG } from '../config/sitters.config';

// ===================================================================
// 1. TIPOS DERIVADOS DE LA CONFIGURACIÓN
// ===================================================================
// Extraemos "formas" de nuestro objeto de configuración para usarlas en las interfaces.

/** Una opción de ordenamiento individual (ej. { key: 'relevance', ... }) */
export type SortOption = typeof SITTER_CONFIG.SORT_OPTIONS[number];

/** Un string que representa una especialidad (ej. 'Paseo de perros') */
export type SitterSpecialty = typeof SITTER_CONFIG.SPECIALTIES[number];

/** Los valores posibles para ordenar (ej. 'relevance' | 'rating' | ...) */
type SortBy = SortOption['sortBy'];

/** Las direcciones posibles para ordenar (ej. 'asc' | 'desc') */
type SortDirection = SortOption['sortDirection'];


// ===================================================================
// 2. TIPOS PARA FILTROS Y BÚSQUEDA
// ===================================================================

/** Define la estructura completa para los filtros de búsqueda de cuidadores. */
export interface SitterFilters {
  searchTerm?: string;
  maxDistance?: number;
  minRating?: number;
  maxHourlyRate?: number;
  specialty?: SitterSpecialty;
  availableOnly?: boolean;
  sortBy?: SortBy;
  sortDirection?: SortDirection;
}


// ===================================================================
// 3. MODELOS DE DATOS (Alineados con el Backend)
// ===================================================================
// Interfaces que representan las entidades principales como vienen de la API.

/** El perfil completo de un cuidador, basado en SitterProfileDTO del backend. */
export interface SitterProfileDTO {
    id?: number;
    userId?: number;
    bio?: string;
    hourlyRate?: number;
    servicingRadius?: number;
    profileImageUrl?: string;
    verified?: boolean;
    availableForBookings?: boolean;
}

/** Un resumen del perfil de un cuidador, basado en SitterProfileSummary del backend. */
export interface SitterProfileSummary {
    id: number;
    sitterName: string;
    profileImageUrl?: string;
    hourlyRate?: number;
    averageRating?: number;
    isVerified: boolean;
    location?: string;
}

/** Estadísticas sobre los cuidadores. */
export interface SitterStats {
    totalSitters: number;
    activeSitters: number;
    verifiedSitters: number;
    availableSitters: number;
    averageHourlyRate: number;
}


// ===================================================================
// 4. MODELOS DEL CLIENTE (UI)
// ===================================================================
// Interfaces extendidas que usamos en el frontend, a menudo combinando datos
// de varias fuentes o añadiendo campos para la UI.

/**
 * Modelo extendido para la UI. Combina `SitterProfileSummary` con
 * datos adicionales (algunos simulados) necesarios para la `SitterCard`.
 */
export interface ExtendedSitter extends SitterProfileSummary {
     specialty?: 
    | 'Paseo de perros' 
    | 'Cuidado nocturno' 
    | 'Cuidado diurno' 
    | 'Administración de medicamentos' 
    | 'Entrenamiento básico' 
    | 'Compañía y socialización' 
    | 'Transporte veterinario' 
    | 'Cuidado de cachorros' 
    | 'Cuidado de mascotas mayores' 
    | 'Cuidado de mascotas exóticas' 
    | 'Fotografía de mascotas' 
    | 'Alojamiento en casa del cuidador' 
    | 'Visitas a domicilio' 
    | 'Cuidado de gatos' 
    | 'Servicios de emergencia'
    | 'Cuidado General';
    image?: string;
    rating?: number;
    totalServices?: number;
    lastService?: string;
    pets?: string[];
    isAvailable?: boolean;
    distance?: string;
    bio?: string;
    nextAvailable?: string;
    specialties?: string[];
}


// ===================================================================
// 5. PAYLOADS DE API (Requests y Responses)
// ===================================================================
// Interfaces para los cuerpos de las peticiones POST/PUT y las respuestas.

/** Para registrar un nuevo usuario cuidador. */
export interface SitterRegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    address?: string;
    phoneNumber?: string;
}

/** Para crear o actualizar el perfil de un cuidador ya registrado. */
export interface CreateSitterProfileRequest {
    bio?: string;
    hourlyRate: number;
    servicingRadius?: number;
    profileImageUrl?: string;
    availableForBookings?: boolean;
}

/** La respuesta del backend al registrar o iniciar sesión. */
export interface AuthResponse {
    token: string;
    role: string;
    user: {
        id: number;
        email: string;
        firstName: string;
        lastName: string;
    };
}

// ===================================================================
// 6. TIPOS PARA EL CONTEXTO Y REDUCER (SittersContext)
// ===================================================================
// Define el estado y las acciones para el manejo de la feature de cuidadores.

/** La estructura completa del estado que maneja SittersContext. */
export interface SittersState {
  sitters: ExtendedSitter[];
  stats: SitterStats | null;
  filters: SitterFilters;
  isLoading: boolean;
  error: string | null;
}

/** Las acciones que el sittersReducer puede procesar. */
export type SittersAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_DATA'; payload: { sitters: ExtendedSitter[]; stats: SitterStats } }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SET_FILTERS'; payload: Partial<SitterFilters> }
  | { type: 'CLEAR_FILTERS' };

/** Representa un servicio ofrecido por un cuidador. */
export interface ServiceOffering {
    id: number;
    sitterId: number;
    serviceType: string;
    name: string;
    description: string;
    price: number;
    durationInMinutes: number;
    active?: boolean;
    createdAt?: string;
}
