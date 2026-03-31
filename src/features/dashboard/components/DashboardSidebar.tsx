// src/features/dashboard/components/DashboardSidebar.tsx
import { Link } from 'react-router';
import { X } from 'lucide-react';
import { usePetsStore } from '../../../store/PetStore';
import { useAuthStore } from '../../../store/AuthStore';
import { useBookingStore } from '../../../store/BookingStore';
import { NAV_ITEMS } from '../../../utils/NavItems';

interface ClientSidebarProps {
	activeItem: string;
	onClose?: () => void;
}

export function ClientSidebar({ activeItem, onClose }: ClientSidebarProps) {
	// 1. Consumimos los contextos para obtener datos dinámicos.
	const user = useAuthStore((state) => state.profile);
	const pets = usePetsStore((state) => state.pets);
	const bookings = useBookingStore((state) => state.bookings);

	return (
		<aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-full flex flex-col transition-colors duration-300">
			{/* Logo y título */}
			<div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center shadow-sm">
						<svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
						</svg>
					</div>
					<span className="font-bold text-xl text-gray-900 dark:text-white tracking-tight">PetCare</span>
				</div>
				{onClose && (
					<button 
						onClick={onClose}
						className="xl:hidden p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
					>
						<X className="w-6 h-6" />
					</button>
				)}
			</div>

			{/* Menú de Navegación */}
			<nav className="flex-1 p-4 overflow-y-auto custom-scrollbar">
				<div className="space-y-1">
					{NAV_ITEMS.map((item) => {
						const Icon = item.icon;
						const active = activeItem === item.id;

						return (
							// 2. Reemplazamos <button> por <Link> para la navegación.
							<Link
								key={item.id}
								to={item.path}
								className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors group ${
									active
										? 'bg-orange-50 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400 font-bold'
										: 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
								}`}
							>
								<div className="flex items-center gap-3">
									<Icon
										className={`w-5 h-5 ${
											active
												? 'text-orange-600'
												: 'text-gray-400 group-hover:text-gray-600'
										}`}
									/>
									<span>{item.label}</span>
								</div>

								{/* Aquí podrías poner lógica de notificaciones real */}
							</Link>
						);
					})}
				</div>
			</nav>

			{/* Pie de Página con Perfil de Usuario (ahora dinámico) */}
			<div className="p-4 border-t border-gray-100 dark:border-gray-700 mt-auto">
				{user && (
					<div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center shadow-md">
								<span className="text-white font-bold">
									{user.firstName?.charAt(0)}
								</span>
							</div>
							<div className="flex-1">
								<p className="font-semibold text-gray-900 dark:text-white text-sm">{`${user.firstName} ${user.lastName}`}</p>
								<p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
									{user.role?.toLowerCase()}
								</p>
							</div>
							<div
								className="w-2 h-2 bg-green-500 rounded-full"
								title="Online"
							></div>
						</div>

						<div className="mt-3 grid grid-cols-2 gap-2 text-center">
							<div className="bg-orange-100 dark:bg-orange-500/20 rounded-lg p-2">
								<p className="text-lg font-bold text-orange-600 dark:text-orange-400">
									{pets.length}
								</p>
								<p className="text-xs text-orange-700 dark:text-orange-400">
									Mascotas
								</p>
							</div>
							<div className="bg-green-100 dark:bg-green-500/20 rounded-lg p-2">
								<p className="text-lg font-bold text-green-600 dark:text-green-400">
									{bookings.length}
								</p>
								<p className="text-xs text-green-700 dark:text-green-400">Citas</p>
							</div>
						</div>
					</div>
				)}
			</div>
		</aside>
	);
}
