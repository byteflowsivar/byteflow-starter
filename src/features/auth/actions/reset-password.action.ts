'use server';

import { resetPasswordSchema } from '../schemas/auth.schema';
import { authService } from '../services/auth.service';
import { ActionResult } from '../types';
import { redirect } from 'next/navigation';

export async function resetPasswordAction(prevState: any, formData: FormData): Promise<ActionResult> {
    const data = Object.fromEntries(formData.entries());
    const validatedFields = resetPasswordSchema.safeParse(data);

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Datos inválidos',
        };
    }

    const { token, password } = validatedFields.data;
    const success = await authService.resetPassword(token, password);

    if (!success) {
        return {
            success: false,
            message: 'Token inválido o expirado',
        };
    }

    // Not using redirect inside a promise if it's not the last thing.
    // Actually redirect() in Next.js throws an error, so it should be handled carefully.
    // For simplicity here, we'll return success and let the component redirect or just return result.
    return {
        success: true,
        message: 'Contraseña actualizada correctamente. Redirigiendo al login...',
    };
}
