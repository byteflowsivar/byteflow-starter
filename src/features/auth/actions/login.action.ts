'use server';

import { loginSchema } from '../schemas/auth.schema';
import { authService } from '../services/auth.service';
import { createSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { ActionResult } from '../types';

export async function loginAction(prevState: any, formData: FormData): Promise<ActionResult> {
    const data = Object.fromEntries(formData.entries());
    const validatedFields = loginSchema.safeParse(data);

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Datos inválidos',
        };
    }

    const { email, password } = validatedFields.data;
    const user = await authService.validateUserCredentials(email, password);

    if (!user) {
        return {
            success: false,
            message: 'Credenciales inválidas',
        };
    }

    await createSession(user.id, user.email, user.role);

    return {
        success: true,
        message: 'Bienvenido nuevamente al panel administrativo',
    };
}
