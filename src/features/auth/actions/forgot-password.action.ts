'use server';

import { forgotPasswordSchema } from '../schemas/auth.schema';
import { authService } from '../services/auth.service';
import { ActionResult } from '../types';

export async function forgotPasswordAction(prevState: any, formData: FormData): Promise<ActionResult> {
    const data = Object.fromEntries(formData.entries());
    const validatedFields = forgotPasswordSchema.safeParse(data);

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Datos inválidos',
        };
    }

    const { email } = validatedFields.data;
    const token = await authService.createResetToken(email);

    if (!token) {
        // We return success even if email not found to avoid user enumeration
        return {
            success: true,
            message: 'Si el correo existe, se ha enviado un enlace de recuperación.',
        };
    }

    // TODO: Implement actual email sending with nodemailer
    console.log(`Reset Token for ${email}: ${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`);

    return {
        success: true,
        message: 'Si el correo existe, se ha enviado un enlace de recuperación.',
    };
}
