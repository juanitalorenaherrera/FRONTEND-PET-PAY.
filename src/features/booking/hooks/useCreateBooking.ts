import { useState, useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import {
	bookingSchema,
	type BookingFormData,
	type BookingCreationData,
} from '@/features/booking/types/bookingTypes';
import { getActiveSitters } from '@/services/sitterService';
import { getAllPets } from '@/services/petService';
import { createBooking } from '@/services/bookingService';
import { useAuthStore } from '@/store/AuthStore';

export const useCreateBooking = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const preselectedSitterId = location.state?.sitterId;
	const user = useAuthStore((state) => state.profile);

	const [loading, setLoading] = useState(true);
	const [creationData, setCreationData] =
		useState<BookingCreationData | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	// ✨ CORRECCIÓN: Usar el esquema importado y valores por defecto null
	const form = useForm<BookingFormData>({
		resolver: zodResolver(bookingSchema),
		defaultValues: {
			petId: null,
			sitterId: preselectedSitterId ?? null,
			serviceId: null,
			startDate: null,
			endDate: null,
			additionalNotes: '',
		},
	});

	useEffect(() => {
		if (!user?.accountId) return;

		const loadInitialData = async () => {
			try {
				setLoading(true);
				const [sitters, pets] = await Promise.all([
					getActiveSitters(),
					getAllPets(),
				]);

				setCreationData({ sitters, pets, services: [] });

				if (preselectedSitterId) {
					form.setValue('sitterId', preselectedSitterId);
				}
			} catch (error) {
				toast.error('Error al cargar los datos iniciales.');
			} finally {
				setLoading(false);
			}
		};
		loadInitialData();
	}, [preselectedSitterId, form, user?.accountId]);

	const onSubmit: SubmitHandler<BookingFormData> = async (data) => {
		setIsSubmitting(true);
		try {
			await createBooking(
				data.petId!,
				data.sitterId!,
				data.serviceId!,
				data.startDate!.toISOString(),
				data.additionalNotes
			);
			toast.success('¡Reserva creada con éxito! 🐾');
			navigate('/dashboard/bookings');
		} catch {
			toast.error('Hubo un error al crear la reserva.');
		} finally {
			setIsSubmitting(false);
		}
	};

	return {
		form,
		loading,
		creationData,
		isSubmitting,
		actions: {
			onSubmit: form.handleSubmit(onSubmit),
		},
	};
};
