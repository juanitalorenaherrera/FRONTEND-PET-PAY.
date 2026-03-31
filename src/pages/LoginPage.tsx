// src/pages/LoginPage.tsx (Versión Mejorada)

import { ArrowRight, Eye, EyeOff, Lock, Mail, PawPrint } from 'lucide-react';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { useAuthStore } from '@/store/AuthStore';
import { loginRequest } from '@/services/authService';
import { Role } from '@/features/auth/types/authStore';
import { loginSchema, type LoginFormData } from '@/schemas/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';

export function LoginPage() {
	const navigate = useNavigate();
	const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema)
	});
	const setToken = useAuthStore((state) => state.setToken);
	const setProfile = useAuthStore((state) => state.setProfile);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const handleLogin = async (data: LoginFormData) => {
		setError(null);
		setIsLoading(true);
		try {
			const res = await loginRequest(data.email, data.password);
			const { token, userProfile } = res;
			setToken(token);
			setProfile(userProfile);
			if (userProfile.role === Role.ADMIN) navigate('/AdminDashboard');
			else if (userProfile.role === Role.SITTER)
				navigate('/dashboard/sitter');
			else if (userProfile.role === Role.CLIENT) navigate('/dashboard');
		} catch (err) {
			setError('Error al iniciar sesión. Verifica tus credenciales.');
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 px-4 py-8">
			{/* Background Pattern */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
				<div
					className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"
					style={{ animationDelay: '2s' }}
				></div>
			</div>

			<div className="relative w-full max-w-md">
				{/* Main Card */}
				<div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 space-y-8 border border-white/20">
					{/* Header Section */}
					<div className="text-center space-y-4">
						<div className="relative inline-block">
							<div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-200">
								<PawPrint className="w-8 h-8 text-white" />
							</div>
							<div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
								<div className="w-2 h-2 bg-white rounded-full"></div>
							</div>
						</div>

						<div className="space-y-2">
							<h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
								¡Bienvenido de vuelta!
							</h1>
							<p className="text-gray-600 text-lg">
								Inicia sesión para cuidar de tus peluditos
							</p>
						</div>
					</div>

					{/* Form Section */}
					<form
						onSubmit={handleSubmit(handleLogin)}
						className="space-y-6"
					>
						{/* Email Field */}
						<div className="space-y-2">
							<label className="text-sm font-semibold text-gray-700 block">
								Correo electrónico
							</label>
							<div className="relative group">
								<Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
								<input
									type="email"
									placeholder="tu@correo.com"
									className={`w-full pl-12 pr-4 py-4 bg-white border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-500/20 transition-all duration-200 text-gray-900 placeholder-gray-400 ${
										errors.email
											? 'border-red-500 focus:border-red-500'
											: 'border-gray-200 focus:border-orange-500'
									}`}
									{...register('email')}
								/>
								{errors.email && (
									<p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
								)}
							</div>
						</div>

						{/* Password Field */}
						<div className="space-y-2">
							<label className="text-sm font-semibold text-gray-700 block">
								Contraseña
							</label>
							<div className="relative group">
								<Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
								<input
									type={showPassword ? 'text' : 'password'}
									placeholder="••••••••"
									className={`w-full pl-12 pr-12 py-4 bg-white border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-500/20 transition-all duration-200 text-gray-900 placeholder-gray-400 ${
										errors.password
											? 'border-red-500 focus:border-red-500'
											: 'border-gray-200 focus:border-orange-500'
									}`}
									{...register('password')}
									{...errors.password && (
									<p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
								)}
								/>
								<button
									type="button"
									onClick={() =>
										setShowPassword(!showPassword)
									}
									className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
								>
									{showPassword ? (
										<EyeOff className="w-5 h-5" />
									) : (
										<Eye className="w-5 h-5" />
									)}
								</button>
							</div>
							{errors.password && (
								<p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
							)}
						</div>

						{/* Error Message */}
						{error && (
							<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2">
								<div className="w-2 h-2 bg-red-500 rounded-full"></div>
								<span className="text-sm font-medium">
									{error}
								</span>
							</div>
						)}

						{/* Forgot Password Link */}
						<div className="flex justify-end">
							<button
								type="button"
								className="text-sm font-semibold text-orange-600 hover:text-orange-700 hover:underline transition-colors"
							>
								¿Olvidaste tu contraseña?
							</button>
						</div>

						{/* Login Button */}
						<button
							type="submit"
							disabled={isLoading}
							className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-orange-300 disabled:to-orange-400 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 group"
						>
							{isLoading ? (
								<>
									<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
									Iniciando sesión...
								</>
							) : (
								<>
									Iniciar Sesión
									<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
								</>
							)}
						</button>

						{/* Register Link */}
						<div className="text-center pt-4 border-t border-gray-200">
							<p className="text-gray-600">
								¿No tienes una cuenta?{' '}
								<button
									type="button"
									onClick={() => navigate('/register')}
									className="font-bold text-orange-600 hover:text-orange-700 hover:underline transition-colors"
								>
									Regístrate gratis
								</button>
							</p>
						</div>
					</form>
				</div>

				{/* Footer */}
				<div className="text-center mt-8">
					<p className="text-sm text-gray-500">
						Al continuar, aceptas nuestros{' '}
						<a href="#" className="text-orange-600 hover:underline">
							Términos de Servicio
						</a>{' '}
						y{' '}
						<a href="#" className="text-orange-600 hover:underline">
							Política de Privacidad
						</a>
					</p>
				</div>
			</div>
		</div>
	);
}
