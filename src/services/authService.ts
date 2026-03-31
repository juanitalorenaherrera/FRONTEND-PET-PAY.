// src/services/authService.ts
import axios from '@/services/auth';
import type {
	LoginResponse,
	Profile,
	RegisterResponse,
} from '@/features/auth/types/authStore';

/**
 * Inicia sesión, guarda el token y devuelve los datos del usuario.
 */
export const loginRequest = async (
	email: string,
	password: string
): Promise<LoginResponse> => {
	const res = await axios.post<LoginResponse>('/api/users/login', {
		email,
		password,
	});
	return res.data;
};
/**
 * Obtiene el perfil del usuario autenticado a través del token.
 */
export const getProfile = async (): Promise<Profile> => {
	const response = await axios.get<Profile>(`/api/dashboard/profile`);
	return response.data;
};
/**
 * Registra un nuevo usuario. (Función que ya tenías)
 */
export const registerRequest = async (
	firstName: string,
	lastName: string,
	email: string,
	password: string,
	address: string,
	phoneNumber: string
): Promise<RegisterResponse> => {
	const response = await axios.post<RegisterResponse>(`/api/users/register`, {
		firstName,
		lastName,
		email,
		password,
		address,
		phoneNumber,
	});
	console.log(response.data);

	return response.data;
};
