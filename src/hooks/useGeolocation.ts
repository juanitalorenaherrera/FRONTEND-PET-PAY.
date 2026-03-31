// ===========================================
// hooks/useGeolocation.ts - Geolocalización COMPLETA
// ===========================================

import { useState, useEffect, useCallback } from 'react';
import { SITTER_CONFIG } from '@/features/sitters/config/sitters.config';

interface GeolocationState {
    loading: boolean;
    accuracy?: number;
    altitude?: number | null;
    altitudeAccuracy?: number | null;
    heading?: number | null;
    latitude?: number;
    longitude?: number;
    speed?: number | null;
    timestamp?: number;
    error?: string;
}

interface UseGeolocationOptions {
    enableHighAccuracy?: boolean;
    timeout?: number;
    maximumAge?: number;
    watch?: boolean;
    when?: boolean;
}

export function useGeolocation(options: UseGeolocationOptions = {}) {
    const {
        enableHighAccuracy = SITTER_CONFIG.GEOLOCATION.HIGH_ACCURACY,
        timeout = SITTER_CONFIG.GEOLOCATION.TIMEOUT,
        maximumAge = SITTER_CONFIG.GEOLOCATION.MAX_AGE,
        watch = false,
        when = true
    } = options;

    const [state, setState] = useState<GeolocationState>({
        loading: when,
        accuracy: undefined,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        latitude: undefined,
        longitude: undefined,
        speed: null,
        timestamp: undefined,
        error: undefined
    });

    const getCurrentPosition = useCallback(() => {
        if (!navigator.geolocation) {
            setState(prev => ({
                ...prev,
                loading: false,
                error: 'Geolocalización no disponible en este navegador'
            }));
            return;
        }

        setState(prev => ({ ...prev, loading: true, error: undefined }));

        const onSuccess = (position: GeolocationPosition) => {
            setState({
                loading: false,
                accuracy: position.coords.accuracy,
                altitude: position.coords.altitude,
                altitudeAccuracy: position.coords.altitudeAccuracy,
                heading: position.coords.heading,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                speed: position.coords.speed,
                timestamp: position.timestamp,
                error: undefined
            });
        };

        const onError = (error: GeolocationPositionError) => {
            let errorMessage = 'Error desconocido de geolocalización';
            
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage = 'Permiso de ubicación denegado';
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = 'Ubicación no disponible';
                    break;
                case error.TIMEOUT:
                    errorMessage = 'Tiempo de espera agotado para obtener ubicación';
                    break;
            }

            setState(prev => ({
                ...prev,
                loading: false,
                error: errorMessage
            }));
        };

        const positionOptions: PositionOptions = {
            enableHighAccuracy,
            timeout,
            maximumAge
        };

        if (watch) {
            const watchId = navigator.geolocation.watchPosition(
                onSuccess,
                onError,
                positionOptions
            );
            return () => navigator.geolocation.clearWatch(watchId);
        } else {
            navigator.geolocation.getCurrentPosition(
                onSuccess,
                onError,
                positionOptions
            );
        }
    }, [enableHighAccuracy, timeout, maximumAge, watch]);

    useEffect(() => {
        if (when) {
            const cleanup = getCurrentPosition();
            return cleanup;
        }
    }, [when, getCurrentPosition]);

    const refetch = useCallback(() => {
        getCurrentPosition();
    }, [getCurrentPosition]);

    return {
        ...state,
        refetch,
        isSupported: !!navigator.geolocation
    };
}
