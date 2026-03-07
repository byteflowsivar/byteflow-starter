'use client';

import { useActionState, useEffect } from 'react';
import { resetPasswordAction } from '../actions/reset-password.action';
import { Button } from '@byteflow-ui/button';
import { Input } from '@byteflow-ui/input';
import { Alert, AlertTitle, AlertDescription } from '@byteflow-ui/alert';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import '@byteflow-ui/button/dist/index.css';
import '@byteflow-ui/input/dist/index.css';
import '@byteflow-ui/alert/dist/index.css';

export function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token') || '';
    const router = useRouter();
    const [state, action, isPending] = useActionState(resetPasswordAction, undefined);

    useEffect(() => {
        if (state?.success) {
            const timer = setTimeout(() => {
                router.push('/login');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [state, router]);

    if (!token && !state?.success) {
        return (
            <div className="w-full max-w-sm mx-auto p-6 bg-white rounded-xl shadow-lg border border-slate-100 text-center">
                <Alert variant="error">
                    <AlertTitle>Token faltante</AlertTitle>
                    <AlertDescription>El enlace de recuperación no es válido.</AlertDescription>
                </Alert>
                <Link href="/login" className="mt-4 block text-sm font-medium text-primary hover:underline">
                    Volver al login
                </Link>
            </div>
        );
    }

    return (
        <form action={action} className="space-y-4 w-full max-w-sm mx-auto p-6 bg-white rounded-xl shadow-lg border border-slate-100">
            <div className="text-center space-y-2 mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Nueva contraseña</h1>
                <p className="text-slate-500 text-sm">Ingresa tu nueva contraseña para recuperar el acceso</p>
            </div>

            {state?.message && (
                <Alert variant={state.success ? 'success' : 'error'}>
                    <AlertTitle>{state.success ? 'Éxito' : 'Error'}</AlertTitle>
                    <AlertDescription>{state.message}</AlertDescription>
                </Alert>
            )}

            <input type="hidden" name="token" value={token} />

            {!state?.success && (
                <>
                    <Input
                        id="reset-password"
                        name="password"
                        type="password"
                        label="Nueva contraseña"
                        placeholder="••••••••"
                        required
                        error={state?.errors?.password?.[0]}
                    />

                    <Input
                        id="reset-confirm-password"
                        name="confirmPassword"
                        type="password"
                        label="Confirmar contraseña"
                        placeholder="••••••••"
                        required
                        error={state?.errors?.confirmPassword?.[0]}
                    />

                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full"
                        isLoading={isPending}
                    >
                        Actualizar contraseña
                    </Button>
                </>
            )}
        </form>
    );
}
