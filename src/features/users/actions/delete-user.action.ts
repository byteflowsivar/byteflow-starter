'use server';

import { userService } from '../services/user.service';
import { ActionResult } from '../types';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/session';

export async function deleteUserAction(id: string): Promise<ActionResult> {
    const session = await getSession();

    if (!session) {
        return {
            success: false,
            message: 'No autorizado',
        };
    }

    try {
        await userService.deleteUser(id, session.userId);
        revalidatePath('/admin/users');
        return {
            success: true,
            message: 'Usuario eliminado correctamente',
        };
    } catch (error: any) {
        console.error('Error deleting user:', error);
        return {
            success: false,
            message: error.message || 'Error al eliminar el usuario',
        };
    }
}
