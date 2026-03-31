import 'react-calendar/dist/Calendar.css';

import { addMyService, getMyServices } from '@/services/sitterService';
import { useEffect, useState } from 'react';

import Calendar from 'react-calendar';
import { useAuthStore } from '@/store/AuthStore';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

export interface Service {
	id: number;
	sitterId: number;
	serviceType: string;
	name: string;
	description: string;
	price: number;
	durationInMinutes: number;
	active: boolean;
	createdAt: string;
}
//'2025-09-09T03:42:27.793+00:00'

const useGetServices = (sitterId: number) => {
	const [services, setServices] = useState<Service[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (sitterId) {
			getMyServices(sitterId)
				.then((data) => {
					setServices(data);
				})
				.catch(console.error)
				.finally(() => {
					setIsLoading(false);
				});
		} else {
			setIsLoading(false);
		}
	}, [sitterId]);

	return { services, isLoading };
};

export interface ServiceForm {
	serviceType: string;
	name: string;
	description: string;
	price: number;
	durationInMinutes: number;
}

export default function SitterDashboard() {
	const user = useAuthStore((state) => state.profile);
	const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
	const { services, isLoading } = useGetServices(user?.id || 0);
	const { register, handleSubmit } = useForm<ServiceForm>();
	const navigate = useNavigate();

	const handleAddService = async (data: ServiceForm) => {
		if (!user) {
			alert('Tu sesión ha expirado.');
			navigate('/login');
			return;
		}
		try {
			const newService = await addMyService(
				data.serviceType,
				data.name,
				data.description,
				data.price,
				data.durationInMinutes,
				user.id
			);
			return newService;
		} catch (err) {
			console.error(err);
			alert('Error al registrar el servicio.');
		}
	};

	if (isLoading) {
		return <p className="p-8">Cargando datos del cuidador...</p>;
	}

	return (
		<div className="p-8 bg-gray-50 min-h-screen">
			<h1 className="text-3xl font-bold mb-6">Panel de Cuidador 👩‍⚕️</h1>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				{/* Columna Izquierda: Gestión de Servicios */}
				<div className="p-6 bg-white rounded-xl shadow">
					<h2 className="text-xl font-semibold mb-4">
						🛠️ Mis Servicios
					</h2>

					<form
						onSubmit={handleSubmit(handleAddService)}
						className="flex flex-col gap-4 mb-6"
					>
						<input
							type="text"
							placeholder="Tipo de servicio (Paseo, Guardería...)"
							className="p-2 border rounded-md w-full"
							{...register('serviceType', { required: true })}
						/>
						<input
							type="text"
							placeholder="Nombre del servicio (Ej: Paseo de 30 minutos)"
							className="p-2 border rounded-md w-full"
							{...register('name', { required: true })}
						/>
						<input
							type="text"
							placeholder="Descripción (Ej: Paseo en parque, cuidado de perros pequeños)"
							className="p-2 border rounded-md w-full"
							{...register('description', { required: true })}
						/>
						<input
							type="number"
							placeholder="Precio"
							className="p-2 border rounded-md w-full"
							{...register('price', { required: true, min: 0 })}
						/>
						<input
							type="text"
							placeholder="Duración en minutos (Ej: 30)"
							className="p-2 border rounded-md w-full"
							{...register('durationInMinutes', {
								required: true,
							})}
						/>
						<button
							type="submit"
							className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition-colors"
						>
							Añadir Servicio
						</button>
					</form>

					{services.length > 0 ? (
						<ul className="space-y-2">
							{services.map((service) => (
								<li
									key={service.id}
									className="p-3 bg-gray-100 rounded-md flex justify-between items-center"
								>
									<span>{service.serviceType}</span>
									<span className="font-bold">
										${service.price}
									</span>
								</li>
							))}
						</ul>
					) : (
						<p>Aún no has registrado ningún servicio.</p>
					)}
				</div>

				{/* Columna Derecha: Gestión de Disponibilidad */}
				<div className="p-6 bg-white rounded-xl shadow">
					<h2 className="text-xl font-semibold mb-4">
						📅 Mi Disponibilidad
					</h2>
					<Calendar
						onChange={(date) => setSelectedDate(date as Date)}
						value={selectedDate}
						className="border-0"
					/>
					<p className="mt-4 text-center">
						Fecha seleccionada:{' '}
						<strong className="text-blue-600">
							{selectedDate
								? selectedDate.toLocaleDateString()
								: 'Ninguna'}
						</strong>
					</p>
				</div>
			</div>
		</div>
	);
}
