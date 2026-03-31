import { useForm, type FieldError, type SubmitHandler, type UseFormRegister } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import {
	PawPrint,
	Dog,
	Cat,
	Syringe,
	Pill,
	Weight,
	Palette,
} from 'lucide-react';
import { useAuthStore } from '@/store/AuthStore';
import { usePetsActions } from '../hooks/usePetsActions';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { Button } from '@/components/ui/Button';
import type { FC, ReactElement } from 'react';

// Esquema simplificado que funciona correctamente con TypeScript
const petSchema = z.object({
	name: z.string().min(1, 'El nombre es obligatorio.'),
	species: z.string().min(1, 'La especie es obligatoria.'),
	breed: z.string().min(1, 'La raza es obligatoria.'),
	color: z.string().min(1, 'El color es obligatorio.'),
	age: z.number().min(0, 'La edad debe ser un número positivo.'),
	weight: z
		.number()
		.min(0, 'El peso debe ser un número positivo.')
		.optional(),
	medications: z.string().optional(),
	allergies: z.string().optional(),
	specialNotes: z.string().optional(),
});

type PetFormData = z.infer<typeof petSchema>;

// Componente FormInput simplificado
interface FormInputProps {
	icon: ReactElement;
	name: keyof PetFormData;
	label: string;
	error?: FieldError;
	type?: string;
	step?: string;
	placeholder?: string;
}

const FormInput: FC<FormInputProps & { register: UseFormRegister<PetFormData> }> = ({
	icon,
	name,
	label,
	register,
	error,
	type = 'text',
	step,
	placeholder,
}) => (
	<div>
		<label
			htmlFor={String(name)}
			className="block text-sm font-semibold text-gray-700 mb-1"
		>
			{label}
		</label>
		<div className="relative group">
			<span className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-pet-orange transition-colors">
				{icon}
			</span>
			<input
				id={String(name)}
				type={type}
				step={step}
				placeholder={placeholder}
				className={`w-full pl-12 pr-4 py-3 bg-white border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-pet-orange/20 transition-all duration-200 text-gray-900 placeholder-gray-400 ${
					error
						? 'border-red-500 focus:border-red-500'
						: 'border-gray-200 focus:border-pet-orange'
				}`}
				{...register(
					name,
					type === 'number' ? { valueAsNumber: true } : {}
				)}
			/>
		</div>
		{error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
	</div>
);

export const AddPetView = () => {
	const navigate = useNavigate();
	const { addPet } = usePetsActions();
	const user = useAuthStore((state) => state.profile);

	const methods = useForm<PetFormData>({
		resolver: zodResolver(petSchema),
		defaultValues: {
			name: '',
			species: '',
			breed: '',
			color: '',
			age: 0,
			medications: '',
			allergies: '',
			specialNotes: '',
		},
	});

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = methods;

	const onSubmit: SubmitHandler<PetFormData> = async (data) => {
		if (!user?.accountId) {
			toast.error('Error de autenticación.');
			return;
		}

		const petDataWithAccount = { ...data, accountId: user.accountId };

		await toast.promise(addPet(petDataWithAccount), {
			loading: 'Guardando los datos de tu nuevo amigo...',
			success: () => {
				navigate('/dashboard/pets');
				return `¡Se añadió a ${data.name} a tu familia!`;
			},
			error: (err) => `No se pudo registrar la mascota: ${err.message}`,
		});
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-100 to-teal-50 p-4 sm:p-6 lg:p-8">
			<motion.div
				className="max-w-4xl mx-auto"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<div className="text-center mb-8">
					<PawPrint className="w-12 h-12 mx-auto text-pet-orange" />
					<h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mt-2">
						Añade un nuevo miembro a la familia
					</h1>
					<p className="text-gray-600 mt-2 text-lg">
						Completa la información para cuidar mejor de tu
						compañero.
					</p>
				</div>

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
					<div className="bg-white/70 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-lg border border-white/20">
						<h2 className="text-xl font-bold text-gray-800 mb-6">
							Información Básica
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<FormInput
								name="name"
								label="Nombre de la Mascota"
								register={register}
								error={errors.name}
								icon={<PawPrint />}
								placeholder="Ej: Rocky"
							/>
							<FormInput
								name="species"
								label="Especie"
								register={register}
								error={errors.species}
								icon={<Dog />}
								placeholder="Ej: Perro"
							/>
							<FormInput
								name="breed"
								label="Raza"
								register={register}
								error={errors.breed}
								icon={<Cat />}
								placeholder="Ej: Golden Retriever"
							/>
							<FormInput
								name="color"
								label="Color"
								register={register}
								error={errors.color}
								icon={<Palette />}
								placeholder="Ej: Dorado"
							/>
							<FormInput
								name="age"
								label="Edad (años)"
								type="number"
								register={register}
								error={errors.age}
								icon={<PawPrint />}
								placeholder="Ej: 3"
							/>
							<FormInput
								name="weight"
								label="Peso (kg)"
								type="number"
								step="0.1"
								register={register}
								error={errors.weight}
								icon={<Weight />}
								placeholder="Ej: 25.5"
							/>
						</div>
					</div>

					<div className="bg-white/70 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-lg border border-white/20">
						<h2 className="text-xl font-bold text-gray-800 mb-6">
							Historial de Salud (Opcional)
						</h2>
						<div className="space-y-6">
							<FormInput
								name="medications"
								label="Medicamentos Actuales"
								register={register}
								error={errors.medications}
								icon={<Pill />}
								placeholder="Ninguno"
							/>
							<FormInput
								name="allergies"
								label="Alergias Conocidas"
								register={register}
								error={errors.allergies}
								icon={<Syringe />}
								placeholder="Ninguna"
							/>
							<div>
								<label
									htmlFor="specialNotes"
									className="block text-sm font-semibold text-gray-700 mb-1"
								>
									Notas Especiales
								</label>
								<textarea
									id="specialNotes"
									{...register('specialNotes')}
									placeholder="Comportamiento, comida favorita, etc."
									className="w-full px-4 py-3 bg-white border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-pet-orange/20 transition-all duration-200 text-gray-900 placeholder-gray-400 border-gray-200 focus:border-pet-orange"
									rows={4}
								/>
							</div>
						</div>
					</div>

					<div className="flex justify-end pt-4">
						<Button
							type="submit"
							size="lg"
							isLoading={isSubmitting}
						>
							{isSubmitting ? 'Guardando...' : 'Añadir Mascota'}
						</Button>
					</div>
				</form>
			</motion.div>
		</div>
	);
};
