'use server';

import { userService } from '../services/user.service';
import { createUserSchema } from '../schemas/user.schema';
import { ActionResult } from '../types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createUserAction(
    prevState: ActionResult | undefined,
    formData: FormData
): Promise<ActionResult> {
    const rawData = Object.fromEntries(formData.entries());

    // Convert role to correct type
    const validatedFields = createUserSchema.safeParse({
        ...rawData,
    });

    if (!validatedFields.success) {
        return {
            success: false,
            message: 'Error de validación',
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    try {
        await userService.createUser({
            name: validatedFields.data.name,
            email: validatedFields.data.email,
            password: validatedFields.data.password,
            role: validatedFields.data.role as 'admin' | 'user',
        });
    } catch (error: any) {
        console.error('Error creating user:', error);
        return {
            success: false,
            message: error.message || 'Error al crear el usuario',
        };
    }

    revalidatePath('/admin/users');
    return {
        success: true,
        message: 'Usuario creado exitosamente',
    };
}
