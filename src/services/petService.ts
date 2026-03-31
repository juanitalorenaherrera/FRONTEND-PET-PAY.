import axios from '@/services/auth';
import type { PetResponse, PetSummaryResponse, CreatePetRequest, PetStatsResponse } from '@/types/pets';
const API_URL = '/api/pets';
/**
 * Obtiene todas las mascotas del usuario autenticado
 */
export const getAllPets = async (): Promise<PetResponse[]> => {
    try {
        const response = await axios.get<PetResponse[]>(`${API_URL}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching pets:', error);
        throw new Error('No se pudieron cargar las mascotas');
    }
};

/**
 * Obtiene un resumen de todas las mascotas
 */
export const getPetsSummary = async (): Promise<PetSummaryResponse[]> => {
    try {
        const response = await axios.get<PetSummaryResponse[]>(`${API_URL}/summary`);
        return response.data;
    } catch (error) {
        console.error('Error fetching pets summary:', error);
        throw new Error('No se pudo cargar el resumen de mascotas');
    }
};

/**
 * Obtiene una mascota específica por ID
 */
export const getPetById = async (petId: number): Promise<PetResponse> => {
    try {
        const response = await axios.get<PetResponse>(`${API_URL}/${petId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching pet by ID:', error);
        throw new Error('No se pudo cargar la mascota');
    }
};

/**
 * Obtiene mascotas de una cuenta específica
 */
export const getPetsByAccountId = async (accountId: number): Promise<PetResponse[]> => {
    try {
        const response = await axios.get<PetResponse[]>(`${API_URL}/account/${accountId}/active`);
        return response.data;
    } catch (error) {
        console.error('Error fetching pets by account ID:', error);
        throw new Error('No se pudieron cargar las mascotas de la cuenta');
    }
};

/**
 * Obtiene solo las mascotas activas de una cuenta
 */
export const getActivePetsByAccountId = async (accountId: number): Promise<PetResponse[]> => {
    try {
        const response = await axios.get<PetResponse[]>(`${API_URL}/active`, {
            params: { accountId }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching active pets by account ID:', error);
        throw new Error('No se pudieron cargar las mascotas activas');
    }
};

/**
 * Crea una nueva mascota
 */

export const createPet = async (
	accountId: number,
	name: string,
	species?: string,
	breed?: string,
	age?: number,
	weight?: number,
	gender?: string,
	color?: string,
	physicalDescription?: string,
	medications?: string,
	allergies?: string,
	specialNotes?: string
) => {
    try {
		const response = await axios.post<PetResponse>(`${API_URL}`,
			{
				accountId,
				name,
				species,
				breed,
				age,
				weight,
				gender,
				color,
				physicalDescription,
				medications,
				allergies,
				specialNotes
			}
		);
        return response.data;
    } catch (error) {
        console.error('Error creating pet:', error);
        throw new Error('No se pudo crear la mascota');
    }
};

/**
 * Actualiza una mascota existente
 */
export const updatePet = async (petId: number, petData: CreatePetRequest): Promise<PetResponse> => {
    try {
        const response = await axios.put<PetResponse>(`${API_URL}/${petId}`, petData);
        return response.data;
    } catch (error) {
        console.error('Error updating pet:', error);
        throw new Error('No se pudo actualizar la mascota');
    }
};

/**
 * Elimina una mascota
 */
export const deletePet = async (petId: number): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/${petId}`);
    } catch (error) {
        console.error('Error deleting pet:', error);
        throw new Error('No se pudo eliminar la mascota');
    }
};

/**
 * Cambia el estado activo/inactivo de una mascota
 */
export const togglePetActive = async (petId: number): Promise<PetResponse> => {
    try {
        const response = await axios.put<PetResponse>(`${API_URL}/${petId}/toggle-active`, {});
        return response.data;
    } catch (error) {
        console.error('Error toggling pet active status:', error);
        throw new Error('No se pudo cambiar el estado de la mascota');
    }
};

/**
 * Busca mascotas por término de búsqueda
 */
export const searchPets = async (searchTerm: string, activeOnly: boolean = false): Promise<PetResponse[]> => {
    try {
        const response = await axios.get<PetResponse[]>(`${API_URL}/search`, {
            params: {
                q: searchTerm,
                activeOnly
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error searching pets:', error);
        throw new Error('No se pudo realizar la búsqueda');
    }
};

/**
 * Obtiene mascotas por especie
 */
export const getPetsBySpecies = async (species: string): Promise<PetResponse[]> => {
    try {
        const response = await axios.get<PetResponse[]>(`${API_URL}/species/${species}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching pets by species:', error);
        throw new Error('No se pudieron cargar las mascotas por especie');
    }
};

/**
 * Obtiene estadísticas de mascotas (solo para admins)
 */
export const getPetStats = async (): Promise<PetStatsResponse> => {
    try {
        const response = await axios.get<PetStatsResponse>(`${API_URL}/stats`);
        return response.data;
    } catch (error) {
        console.error('Error fetching pet stats:', error);
        throw new Error('No se pudieron cargar las estadísticas');
    }
};

/**
 * Verifica si un nombre está disponible para una cuenta
 */
export const isPetNameAvailable = async (name: string, accountId: number): Promise<boolean> => {
    try {
        const response = await axios.get<boolean>(`${API_URL}/name-available`, {
            params: { name, accountId }
        });
        return response.data;
    } catch (error) {
        console.error('Error checking pet name availability:', error);
        throw new Error('No se pudo verificar la disponibilidad del nombre');
    }
};

/**
 * Obtiene mascotas con necesidades especiales
 */
export const getPetsWithSpecialNeeds = async (): Promise<PetResponse[]> => {
    try {
        const response = await axios.get<PetResponse[]>(`${API_URL}/special-needs`);
        return response.data;
    } catch (error) {
        console.error('Error fetching pets with special needs:', error);
        throw new Error('No se pudieron cargar las mascotas con necesidades especiales');
    }
};
