import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email('Ingresa un email válido'),
  password: z.string().min(1, 'La contraseña es requerida')
});

export type LoginFormData = z.infer<typeof loginSchema>;
