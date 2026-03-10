'use server';

import { userService } from '../services/user.service';
import { updateUserSchema } from '../schemas/user.schema';
import { ActionResult } from '../types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function updateUserAction(
    userId: string,
    prevState: ActionResult | undefined,
    formData: FormData
): Promise<ActionResult> {
    const rawData = Object.fromEntries(formData.entries());

    // Convert checkbox/radio to boolean for isActive
    const isActive = formData.get('isActive') === 'on' || formData.get('isActive') === 'true';

    const validatedFields = updateUserSchema.safeParse({
        ...rawData,
        isActive,
    });

    if (!validatedFields.success) {
        return {
            success: false,
            message: 'Error de validación',
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    try {
        await userService.updateUser(userId, {
            name: validatedFields.data.name,
            role: validatedFields.data.role as 'admin' | 'user',
            isActive: validatedFields.data.isActive,
            password: validatedFields.data.password,
        });
    } catch (error: any) {
        console.error('Error updating user:', error);
        return {
            success: false,
            message: error.message || 'Error al actualizar el usuario',
        };
    }

    revalidatePath('/admin/users');
    redirect('/admin/users');
}
