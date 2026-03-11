'use server';

import { deleteSession } from '@/lib/session';
import { redirect } from 'next/navigation';

export async function logoutAction() {
    await deleteSession();
    return {
        success: true,
        message: 'Has cerrado sesión correctamente. ¡Hasta pronto!',
    };
}
