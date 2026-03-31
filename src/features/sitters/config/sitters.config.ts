// ===========================================
// config/sitters.config.ts - Configuración COMPLETA actualizada
// ===========================================

export const SITTER_CONFIG = {
    // Configuración de API
    API_ENDPOINTS: {
        SITTERS: '/api/sitter-profiles',
        USERS: '/api/users',
        SEARCH: '/api/sitters/search',
        STATS: '/api/sitters/stats',
        FAVORITES: '/api/user/favorites',
        REVIEWS: '/api/reviews',
        BOOKINGS: '/api/bookings'
    },
    
    // Configuración de paginación
    PAGINATION: {
        DEFAULT_PAGE_SIZE: 12,
        MAX_PAGE_SIZE: 50,
        INFINITE_SCROLL_THRESHOLD: 100
    },
    
    // Configuración de filtros
    FILTERS: {
        MAX_DISTANCE: 50, // km
        MIN_RATING: 1,
        MAX_RATING: 5,
        DEFAULT_RADIUS: 10,
        MIN_PRICE: 5000,
        MAX_PRICE: 50000,
        PRICE_STEP: 1000
    },
    
    // Configuración de cache
    CACHE: {
        SITTERS_TTL: 5 * 60 * 1000, // 5 minutos
        STATS_TTL: 10 * 60 * 1000,  // 10 minutos
        SEARCH_DEBOUNCE: 300,        // ms
        FAVORITES_TTL: 2 * 60 * 1000, // 2 minutos
        REVIEWS_TTL: 15 * 60 * 1000   // 15 minutos
    },
    
    // Configuración de UI
    UI: {
        CARD_ANIMATION_DELAY: 100,
        LOADING_TIMEOUT: 30000,
        ERROR_RETRY_DELAY: 2000,
        MAX_SPECIALTIES_DISPLAYED: 3,
        MAX_PETS_DISPLAYED: 2,
        BIO_MAX_LENGTH: 150,
        SKELETON_COUNT: 6
    },
    
    // Especialidades disponibles (expandida)
    SPECIALTIES: [
        'Paseo de perros',
        'Cuidado nocturno', 
        'Cuidado diurno',
        'Administración de medicamentos',
        'Entrenamiento básico',
        'Compañía y socialización',
        'Transporte veterinario',
        'Alimentación especializada',
        'Cuidado de mascotas exóticas',
        'Servicios de emergencia',
        'Cuidado postoperatorio',
        'Actividades recreativas',
        'Grooming básico',
        'Cuidado de cachorros',
        'Cuidado de mascotas senior'
    ],
    
    // Tipos de mascotas
    PET_TYPES: [
        'Perros',
        'Gatos', 
        'Aves',
        'Peces',
        'Conejos',
        'Hamsters',
        'Tortugas',
        'Reptiles',
        'Otros'
    ],
    
    // Configuración de geolocalización
    GEOLOCATION: {
        TIMEOUT: 10000,
        MAX_AGE: 300000, // 5 minutos
        HIGH_ACCURACY: true,
        DEFAULT_COORDS: {
            lat: -33.4489, // Santiago, Chile
            lng: -70.6693
        }
    },
    
    // Configuración de notificaciones
    NOTIFICATIONS: {
        SHOW_BROWSER_NOTIFICATIONS: true,
        AUTO_REFRESH_INTERVAL: 30000, // 30 segundos
        MAX_NOTIFICATIONS: 50,
        SOUND_ENABLED: false
    },
    
    // Configuración de booking
    BOOKING: {
        MIN_ADVANCE_HOURS: 2,
        MAX_ADVANCE_DAYS: 30,
        DEFAULT_DURATION_HOURS: 2,
        CANCELLATION_HOURS: 24
    },
    
    // Configuración de reviews
    REVIEWS: {
        MIN_RATING: 1,
        MAX_RATING: 5,
        MAX_COMMENT_LENGTH: 500,
        REQUIRE_COMMENT_FOR_LOW_RATING: true,
        LOW_RATING_THRESHOLD: 3
    },
    
    // URLs y enlaces externos
    EXTERNAL_LINKS: {
        TERMS_OF_SERVICE: '/terms',
        PRIVACY_POLICY: '/privacy',
        HELP_CENTER: '/help',
        CONTACT_SUPPORT: '/support',
        SOCIAL_MEDIA: {
            FACEBOOK: 'https://facebook.com/petcare',
            INSTAGRAM: 'https://instagram.com/petcare',
            TWITTER: 'https://twitter.com/petcare'
        }
    },
    
    // Configuración de imágenes
    IMAGES: {
        DEFAULT_AVATAR: '/assets/default-avatar.png',
        DEFAULT_PET: '/assets/default-pet.png',
        MAX_SIZE_MB: 5,
        ALLOWED_FORMATS: ['jpg', 'jpeg', 'png', 'webp'],
        THUMBNAIL_SIZE: 150,
        CARD_SIZE: 300
    },

    SORT_OPTIONS: [
        { key: 'relevance', label: 'Relevancia', sortBy: 'relevance', sortDirection: 'desc' },
        { key: 'rating-desc', label: 'Mejor valorados', sortBy: 'rating', sortDirection: 'desc' },
        { key: 'distance-asc', label: 'Más cercanos', sortBy: 'distance', sortDirection: 'asc' },
        { key: 'price-asc', label: 'Menor precio', sortBy: 'hourlyRate', sortDirection: 'asc' },
        { key: 'price-desc', label: 'Mayor precio', sortBy: 'hourlyRate', sortDirection: 'desc' }
    ] as const, // "as const" es crucial para la seguridad de tipos
    
    // Textos por defecto
    DEFAULT_TEXTS: {
        NO_BIO: 'Sin descripción disponible',
        NO_REVIEWS: 'Aún no tiene reseñas',
        CONTACT_ERROR: 'Error al contactar cuidador',
        BOOKING_SUCCESS: 'Solicitud de cuidado enviada',
        BOOKING_ERROR: 'Error al solicitar cuidado'
    }
} as const;

// ===================================================================
// TIPOS DERIVADOS DE LA CONFIGURACIÓN (Esta sección es la clave)
// ===================================================================
// Exportamos estos tipos para que otros archivos (como `types/index.ts`) puedan usarlos.

/** Una opción de ordenamiento individual (ej. { key: 'relevance', ... }) */
export type SortOption = typeof SITTER_CONFIG.SORT_OPTIONS[number];

/** Un string que representa una especialidad (ej. 'Paseo de perros') */
export type SitterSpecialty = typeof SITTER_CONFIG.SPECIALTIES[number];

/** Un string que representa un tipo de mascota (ej. 'Perros') */
export type PetType = typeof SITTER_CONFIG.PET_TYPES[number];

/** Una clave del objeto de endpoints de la API (ej. 'SITTERS') */
export type ApiEndpoint = keyof typeof SITTER_CONFIG.API_ENDPOINTS;
