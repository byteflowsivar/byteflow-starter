import { z } from 'zod';

export const createUserSchema = z.object({
    name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
    email: z.string().email('Ingresa un correo electrónico válido'),
    password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
    role: z.enum(['admin', 'user'], {
        error: 'Selecciona un rol válido'
    }),
});

export const updateUserSchema = z.object({
    name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
    role: z.enum(['admin', 'user'], {
        error: 'Selecciona un rol válido'
    }),
    isActive: z.boolean(),
    password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres').optional().or(z.literal('')),
});

export type CreateUserForm = z.infer<typeof createUserSchema>;
export type UpdateUserForm = z.infer<typeof updateUserSchema>;
