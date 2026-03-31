import { useState, useEffect, type BaseSyntheticEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';
import { toast } from 'sonner';

import { useCreateBooking } from '../hooks/useCreateBooking';
import { LoadingPaws } from '@/components/ui/LoadingPaws';
import { CreateBookingStep1 } from '../components/CreateBookingStep1';
import { CreateBookingStep2 } from '../components/CreateBookingStep2';
import { BookingSummaryCard } from '../components/BookingSummaryCard';
import { Button } from '@/components/ui/Button';
import { getMyServices as getServicesBySitter } from '@/services/sitterService';
import type { ServiceOffering } from '../types/bookingTypes';

export const CreateBookingView = () => {
	const { form, loading, creationData, isSubmitting, actions } =
		useCreateBooking();
	const [step, setStep] = useState(1);
	const [sitterServices, setSitterServices] = useState<ServiceOffering[]>([]);
	const [isLoadingServices, setIsLoadingServices] = useState(false);

	const selectedSitterId = form.watch('sitterId');

	// ✨ CORRECCIÓN: Función para manejar el cambio de cuidador
	const handleSitterChange = async (sitterId: number) => {
		if (!sitterId) {
			setSitterServices([]);
			form.setValue('serviceId', null);
			return;
		}

		setIsLoadingServices(true);
		try {
			const services = await getServicesBySitter(sitterId);
			setSitterServices(Array.isArray(services) ? services : [services]);
			form.setValue('serviceId', null);
		} catch (error) {
			toast.error('No se pudieron cargar los servicios.');
			setSitterServices([]);
		} finally {
			setIsLoadingServices(false);
		}
	};

	useEffect(() => {
		if (selectedSitterId) {
			handleSitterChange(selectedSitterId);
		} else {
			setSitterServices([]);
		}
	}, [selectedSitterId]);

	const handleNext = () => setStep((s) => s + 1);
	const handleBack = () => setStep((s) => s - 1);

	if (loading) {
		return <LoadingPaws message="Preparando todo para tu reserva..." />;
	}

	return (
		<motion.div
			className="max-w-4xl mx-auto p-4 md:p-8 space-y-8"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
		>
			<header className="text-center">
				<h1 className="text-3xl font-bold text-pet-orange">
					Crear una Nueva Reserva
				</h1>
				<p className="text-neutral-500 mt-2">
					Sigue los pasos para encontrar el cuidado perfecto.
				</p>
			</header>
			<form onSubmit={(e: BaseSyntheticEvent) => e.preventDefault()}>
				<AnimatePresence mode="wait">
					{/* ✨ CORRECCIÓN: Pasar la función handleSitterChange */}
					{step === 1 && (
						<CreateBookingStep1
							form={form}
							creationData={creationData}
							onSitterChange={handleSitterChange}
						/>
					)}
					{step === 2 && (
						<CreateBookingStep2
							form={form}
							services={sitterServices}
							isLoading={isLoadingServices}
						/>
					)}
					{step === 3 && (
						<BookingSummaryCard
							formData={form.watch()}
							creationData={creationData}
							services={sitterServices}
						/>
					)}
				</AnimatePresence>
				<div className="flex justify-between items-center pt-8 mt-8 border-t border-neutral-200">
					<div>
						{step > 1 && (
							<Button
								type="button"
								variant="outline"
								onClick={handleBack}
							>
								Anterior
							</Button>
						)}
					</div>
					<div>
						{step < 3 ? (
							<Button type="button" onClick={handleNext}>
								Siguiente
							</Button>
						) : (
							<Button
								type="button"
								onClick={actions.onSubmit}
								disabled={isSubmitting}
								variant="primary"
							>
								<Send className="w-4 h-4 mr-2" />
								{isSubmitting
									? 'Confirmando...'
									: 'Confirmar Reserva'}
							</Button>
						)}
					</div>
				</div>
			</form>
		</motion.div>
	);
};
