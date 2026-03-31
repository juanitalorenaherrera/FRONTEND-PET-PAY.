import type { SitterProfileDTO } from "@/features/sitters/types";
import type { Service } from "../pages/SitterDashboard";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import type { FormEvent } from "react";
import { createBooking } from "../services/bookingService";
import { getSitterProfile, getMyServices } from "../services/sitterService";
import { useAuthStore } from "@/store/AuthStore";
import axios from "../services/auth";
import type { Profile } from "@/features/auth/types/authStore";


export default function BookingPage() {
    const { sitterId } = useParams<{ sitterId: string }>();
	const navigate = useNavigate();
	const user = useAuthStore((state) => state.profile)

    const [sitter, setSitter] = useState<SitterProfileDTO | null>(null);
    const [sitterUser, setSitterUser] = useState<Profile | null>(null);
    const [services, setServices] = useState<Service[]>([]);
    const [selectedServiceId, setSelectedServiceId] = useState<string>("");
    const [date, setDate] = useState<string>("");
    
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Obtener la fecha mínima (hoy)
    const today = new Date().toISOString().split('T')[0];

    useEffect(() => {
    if (!sitterId) {
        setError("ID del cuidador no válido.");
        setIsLoading(false);
        return;
    }

    Promise.all([
        getSitterProfile(Number(sitterId)),
        getMyServices(Number(sitterId)),
        axios.get<Profile>(`/api/users/${sitterId}`)
    ])
        .then(([sitterData, servicesData, userResponse]) => {
        if (sitterData) {
            setSitter(sitterData);
            setServices(servicesData || []);
            setSitterUser(userResponse.data);
        } else {
            setError("No se encontró la información del cuidador.");
        }
        })
        .catch((err) => {
        console.error("Error al cargar el perfil del cuidador:", err);
        setError("No se pudo cargar la información del cuidador.");
        })
        .finally(() => setIsLoading(false));
    }, [sitterId]);

    const validateForm = (): boolean => {
    if (!user) {
        setError("Debes estar autenticado para hacer una reserva.");
        return false;
    }
    
    if (!selectedServiceId) {
        setError("Por favor, selecciona un servicio.");
        return false;
    }
    
    if (!date) {
        setError("Por favor, selecciona una fecha.");
        return false;
    }

    if (date < today) {
        setError("La fecha no puede ser anterior a hoy.");
        return false;
    }

    return true;
    };

    const handleBooking = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!validateForm()) {
        return;
    }
    
    setIsSubmitting(true);
    
    try {
        await createBooking(
            user!.id, // petId - usando el ID del usuario como petId por ahora
            Number(sitterId!),
            Number(selectedServiceId),
            new Date(date).toISOString()
        );
        
        setSuccessMessage("¡Tu reserva ha sido confirmada con éxito!");
        
        // Limpiar el formulario
        setSelectedServiceId("");
        setDate("");
        
      // Redirigir después de mostrar el mensaje
        setTimeout(() => {
        navigate('/owner/dashboard');
        }, 3000);
        
    } catch (err) {
        console.error("Error al crear la reserva:", err);
        setError("Ocurrió un error al crear la reserva. Inténtalo de nuevo.");
    } finally {
        setIsSubmitting(false);
    }
    };

    const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedServiceId(e.target.value);
    setError(null); // Limpiar errores al cambiar selección
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
    setError(null); // Limpiar errores al cambiar fecha
    };

    const selectedService = services.find(service => service.id === Number(selectedServiceId));

    if (isLoading) {
    return (
        <div className="max-w-2xl mx-auto mt-10 p-8">
        <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-6"></div>
            <div className="space-y-4">
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
            </div>
        </div>
        </div>
    );
    }

    if (error && !sitter && !successMessage) {
    return (
        <div className="max-w-2xl mx-auto mt-10 p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">{error}</p>
            <button 
            onClick={() => navigate(-1)}
            className="mt-2 text-sm text-red-500 underline hover:text-red-700"
            >
            ← Volver atrás
            </button>
        </div>
        </div>
    );
    }

    if (!sitter) {
    return (
        <div className="max-w-2xl mx-auto mt-10 p-8">
        <p className="text-gray-600">No se encontró al cuidador.</p>
        <button 
            onClick={() => navigate(-1)}
            className="mt-2 text-blue-500 underline hover:text-blue-700"
        >
            ← Volver atrás
        </button>
        </div>
    );
    }

    return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-2xl">
        <div className="mb-6">
        <button 
            onClick={() => navigate(-1)}
            className="text-blue-500 hover:text-blue-700 mb-4 flex items-center"
        >
            ← Volver
        </button>
        
        <h2 className="text-3xl font-bold mb-2">🐶 Reservar a {sitterUser ? `${sitterUser.firstName} ${sitterUser.lastName}` : 'Cuidador'}</h2>
        <p className="text-gray-500 mb-2">📍 Ubicación disponible</p>
        
        <p className="text-yellow-500 mb-4">
            ⭐ 4.5/5 (Cuidador verificado)
        </p>
        
        {services.length === 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-yellow-700">Este cuidador no tiene servicios disponibles en este momento.</p>
            </div>
        )}
        </div>
        
        {successMessage ? (
        <div className="p-6 text-center bg-green-100 border border-green-200 text-green-800 rounded-lg">
            <div className="text-4xl mb-2">🎉</div>
            <p className="font-bold text-lg">¡Felicidades!</p>
            <p>{successMessage}</p>
            <p className="text-sm mt-2 text-green-600">
            Serás redirigido en unos segundos...
            </p>
        </div>
        ) : (
        <form onSubmit={handleBooking} className="space-y-6">
            <div>
            <label htmlFor="service" className="block text-lg font-medium text-gray-700 mb-2">
                1. Selecciona un servicio
            </label>
            <select
                id="service"
                value={selectedServiceId}
                onChange={handleServiceChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
                disabled={services.length === 0 || isSubmitting}
            >
                <option value="">-- Elige un servicio --</option>
                {services.map(service => (
                <option key={service.id} value={service.id}>
                    {service.serviceType} - ${service.price.toLocaleString()}
                </option>
                ))}
            </select>
            </div>

            {selectedService && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800">Servicio seleccionado:</h4>
                <p className="text-blue-700">{selectedService.serviceType}</p>
                <p className="text-blue-600">Precio: ${selectedService.price.toLocaleString()}</p>
                {selectedService.description && (
                <p className="text-sm text-blue-600 mt-1">{selectedService.description}</p>
                )}
            </div>
            )}

            <div>
            <label htmlFor="date" className="block text-lg font-medium text-gray-700 mb-2">
                2. Elige una fecha
            </label>
            <input
                id="date"
                type="date"
                value={date}
                onChange={handleDateChange}
                min={today}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
                disabled={isSubmitting}
            />
            <p className="text-sm text-gray-500 mt-1">
                Fecha mínima: {new Date().toLocaleDateString('es-ES')}
            </p>
            </div>
            
            {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{error}</p>
            </div>
            )}
            
            <button 
            type="submit" 
            disabled={isSubmitting || services.length === 0}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-md transition-all transform hover:scale-105 disabled:hover:scale-100"
            >
            {isSubmitting ? (
                <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Procesando...
                </span>
            ) : (
                'Confirmar Reserva'
            )}
            </button>
            
            {selectedService && (
            <div className="text-center text-sm text-gray-500">
                <p>Total a pagar: <span className="font-semibold">${selectedService.price.toLocaleString()}</span></p>
            </div>
            )}
        </form>
        )}
    </div>
    );
}
