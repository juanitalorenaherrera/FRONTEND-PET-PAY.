import { Link, useNavigate } from 'react-router';
import { registerRequest } from '@/services/authService';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { SitterRegisterRequest } from '@/features/sitters/types';
import { useAuthStore } from '@/store/AuthStore';
import { Role } from '@/features/auth/types/authStore';

export default function RegisterPage() {
	// --- Hooks ---
	const navigate = useNavigate();

	// --- Estado del formulario ---
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const { register, handleSubmit } = useForm<SitterRegisterRequest>();
	const setToken = useAuthStore((state) => state.setToken);
	const setProfile = useAuthStore((state) => state.setProfile);

	// --- Lógica de envío ---
	const handleRegister = async (data: SitterRegisterRequest) => {
		setIsLoading(true);
		setError(null);

		try {
			const res = await registerRequest(
				data.firstName || '',
				data.lastName || '',
				data.email || '',
				data.password || '',
				data.address || '',
				data.phoneNumber || ''
			);
			// Redirige al dashboard correspondiente según el rol
			setToken(res.token);
			setProfile(res.userProfile);
			if (res.role === Role.SITTER) {
				navigate('/sitter/onboarding');
				return res;
			}
			navigate(`/dashboard`);
			return res;
		} catch (err) {
			setError(
				'No se pudo completar el registro. El correo ya puede estar en uso.'
			);
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="p-6 max-w-sm mx-auto mt-10 shadow-md rounded-lg bg-white">
			<h1 className="text-2xl font-bold mb-4 text-center">
				Crear Cuenta
			</h1>
			<form
				onSubmit={handleSubmit(handleRegister)}
				className="flex flex-col gap-4"
			>
				<input
					type="text"
					placeholder="Jhon"
					className="p-2 border rounded-md"
					required
					{...register('firstName', { required: true })}
				/>
				<input
					type="text"
					placeholder="Doe"
					className="p-2 border rounded-md"
					required
					{...register('lastName', { required: true })}
				/>
				<input
					type="email"
					placeholder="ejemplo@ejemplo.com"
					className="p-2 border rounded-md"
					required
					{...register('email', { required: true })}
				/>
				<input
					type="password"
					placeholder="Contraseña"
					className="p-2 border rounded-md"
					required
					{...register('password', { required: true, minLength: 8 })}
				/>
				<input
					type="text"
					placeholder="calle falsa 123"
					className="p-2 border rounded-md"
					required
					{...register('address', { required: true })}
				/>
				<input
					type="text"
					placeholder="555-555-5555"
					className="p-2 border rounded-md"
					required
					{...register('phoneNumber', { required: true })}
				/>
				{error && <p className="text-red-500 text-sm">{error}</p>}

				<button
					type="submit"
					disabled={isLoading}
					className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-md transition-colors disabled:bg-gray-400"
				>
					{isLoading ? 'Registrando...' : 'Registrarse'}
				</button>
			</form>
			<p className="text-center mt-4 text-sm">
				¿Ya tienes una cuenta?{' '}
				<Link to="/login" className="text-blue-600 hover:underline">
					Inicia sesión
				</Link>
			</p>
		</div>
	);
}
