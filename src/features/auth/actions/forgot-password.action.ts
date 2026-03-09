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

    if (token) {
        const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;
        const { emailService } = await import('@/lib/email');
        const html = emailService.generateResetPasswordTemplate(resetUrl);

        await emailService.sendEmail({
            to: email,
            subject: 'Recuperar acceso - Byteflow',
            html,
        });
    }

    return {
        success: true,
        message: 'Si el correo existe, se ha enviado un enlace de recuperación.',
    };
}
