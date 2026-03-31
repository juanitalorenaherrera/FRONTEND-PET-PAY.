// src/features/profile/components/ProfileForm.tsx

import * as z from 'zod';

import type { UpdateUserPayload, UserProfile } from '@/features/profile/types';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface ProfileFormProps {
  profile: UserProfile;
  onSave: (data: UpdateUserPayload) => Promise<void>;
}

const profileSchema = z.object({
  firstName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres.'),
  lastName: z.string().min(2, 'El apellido debe tener al menos 2 caracteres.'),
  phoneNumber: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
});

export const ProfileForm: React.FC<ProfileFormProps> = ({ profile, onSave }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting, isDirty } } = useForm<UpdateUserPayload>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: profile.firstName,
      lastName: profile.lastName,
      // CORRECCIÓN: Usamos '??' para dar un valor por defecto si es undefined
      phoneNumber: profile.phoneNumber ?? '', 
      address: profile.address ?? '',
    },
  });

  const onSubmit = async (data: UpdateUserPayload) => {
    await onSave(data);
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/30 dark:border-gray-700 p-8 rounded-2xl shadow-lg space-y-6 transition-colors duration-300"
    >
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-white mb-4">Tu Información Personal</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-neutral-600 dark:text-gray-300">Nombre</label>
                <Input id="firstName" {...register('firstName')} disabled={isSubmitting} />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
            </div>
            <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-neutral-600 dark:text-gray-300">Apellido</label>
                <Input id="lastName" {...register('lastName')} disabled={isSubmitting} />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
            </div>
        </div>
        <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-neutral-600 dark:text-gray-300">Teléfono</label>
            <Input id="phoneNumber" {...register('phoneNumber')} disabled={isSubmitting} placeholder="Añade tu teléfono" />
        </div>
        <div>
            <label htmlFor="address" className="block text-sm font-medium text-neutral-600 dark:text-gray-300">Dirección</label>
            <Input id="address" {...register('address')} disabled={isSubmitting} placeholder="Añade tu dirección" />
        </div>
        <div className="flex justify-end">
            <Button type="submit" variant="primary" disabled={isSubmitting || !isDirty}>
                {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
        </div>
    </motion.form>
  );
};
