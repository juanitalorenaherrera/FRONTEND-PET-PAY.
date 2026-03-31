import { ArrowRight, Eye, EyeOff, Lock, Mail, PawPrint, User, MapPin, Phone } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '@/store/AuthStore';
import { registerRequest } from '@/services/authService';
import { useNavigate } from 'react-router';
import { Role } from '@/features/auth/types/authStore';
import { useState } from 'react';
import { registerSchema, type RegisterFormData } from '../schemas/registerSchema';

export default function Register () {
	const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema)
	});
	const navigate = useNavigate();
	const setProfile = useAuthStore((state) => state.setProfile);
	const setToken = useAuthStore((state) => state.setToken);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const onSubmit = async (data: RegisterFormData) => {
		setError(null);
		setIsLoading(true);
		try {
			const response = await registerRequest(
				data.firstName,
				data.lastName,
				data.email,
				data.password,
				data.address,
				data.phoneNumber
			);
		
			if (!response.token) {
				throw new Error('Error en el registro');
			}

			setToken(response.token);
			setProfile(response.userProfile);

			if (response.userProfile.role === Role.ADMIN) {
				navigate('/AdminDashboard');
				return;
			}
			if (response.userProfile.role === Role.SITTER) {
				navigate('/SitterDashboard');
				return;
			}

			if (response.userProfile.role === Role.CLIENT) {
				navigate('/ClientDashboard');
				return;
			}
			navigate('/dashboard');

		} catch (err) {
			setError('Error en el registro. Verifica tus datos.');
			console.error('Error en el registro:', err);
		} finally {
			setIsLoading(false);
		}
	}

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
								¡Únete a nosotros!
							</h1>
							<p className="text-gray-600 text-lg">
								Crea tu cuenta para cuidar peluditos
							</p>
						</div>
					</div>

					{/* Form Section */}
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="space-y-6"
					>
						{/* First Name Field */}
						<div className="space-y-2">
							<label className="text-sm font-semibold text-gray-700 block">
								Nombre
							</label>
							<div className="relative group">
								<User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
								<input
									type="text"
									placeholder="Jhon"
									className={`w-full pl-12 pr-4 py-4 bg-white border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-500/20 transition-all duration-200 text-gray-900 placeholder-gray-400 ${
										errors.firstName ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-orange-500'
									}`}
									{...register('firstName')}
								/>
								{errors.firstName && (
									<p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
								)}
							</div>
						</div>

						{/* Last Name Field */}
						<div className="space-y-2">
							<label className="text-sm font-semibold text-gray-700 block">
								Apellido
							</label>
							<div className="relative group">
								<User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
								<input
									type="text"
									placeholder="Doe"
									className={`w-full pl-12 pr-4 py-4 bg-white border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-500/20 transition-all duration-200 text-gray-900 placeholder-gray-400 ${
										errors.lastName ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-orange-500'
									}`}
									{...register('lastName')}
								/>
								{errors.lastName && (
									<p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
								)}
							</div>
						</div>

						{/* Email Field */}
						<div className="space-y-2">
							<label className="text-sm font-semibold text-gray-700 block">
								Correo electrónico
							</label>
							<div className="relative group">
								<Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
								<input
									type="email"
									placeholder="ejemplo@example.com"
									className={`w-full pl-12 pr-4 py-4 bg-white border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-500/20 transition-all duration-200 text-gray-900 placeholder-gray-400 ${
										errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-orange-500'
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
										errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-orange-500'
									}`}
									{...register('password')}
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
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

						{/* Address Field */}
						<div className="space-y-2">
							<label className="text-sm font-semibold text-gray-700 block">
								Dirección
							</label>
							<div className="relative group">
								<MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
								<input
									type="text"
									placeholder="Calle Falsa 123, Ciudad, País"
									className={`w-full pl-12 pr-4 py-4 bg-white border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-500/20 transition-all duration-200 text-gray-900 placeholder-gray-400 ${
										errors.address ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-orange-500'
									}`}
									{...register('address')}
								/>
								{errors.address && (
									<p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
								)}
							</div>
						</div>

						{/* Phone Field */}
						<div className="space-y-2">
							<label className="text-sm font-semibold text-gray-700 block">
								Teléfono
							</label>
							<div className="relative group">
								<Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
								<input
									type="text"
									placeholder="+1234567890"
									className={`w-full pl-12 pr-4 py-4 bg-white border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-500/20 transition-all duration-200 text-gray-900 placeholder-gray-400 ${
										errors.phoneNumber ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-orange-500'
									}`}
									{...register('phoneNumber')}
								/>
								{errors.phoneNumber && (
									<p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
								)}
							</div>
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

						{/* Register Button */}
						<button
							type="submit"
							disabled={isLoading}
							className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-orange-300 disabled:to-orange-400 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 group"
						>
							{isLoading ? (
								<>
									<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
									Registrando...
								</>
							) : (
								<>
									Registrarse
									<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
								</>
							)}
						</button>

						{/* Login Link */}
						<div className="text-center pt-4 border-t border-gray-200">
							<p className="text-gray-600">
								¿Ya tienes una cuenta?{' '}
								<button
									type="button"
									onClick={() => navigate('/login')}
									className="font-bold text-orange-600 hover:text-orange-700 hover:underline transition-colors"
								>
									Inicia sesión
								</button>
							</p>
						</div>
					</form>
				</div>

				{/* Footer */}
				<div className="text-center mt-8">
					<p className="text-sm text-gray-500">
						Al registrarte, aceptas nuestros{' '}
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
};
