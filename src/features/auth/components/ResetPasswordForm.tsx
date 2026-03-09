'use client';

import { useActionState, useEffect } from 'react';
import { resetPasswordAction } from '../actions/reset-password.action';
import { Button } from '@byteflow-ui/button';
import { Input } from '@byteflow-ui/input';
import { Alert, AlertTitle, AlertDescription } from '@byteflow-ui/alert';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import '@byteflow-ui/button/index.css';
import '@byteflow-ui/input/index.css';
import '@byteflow-ui/alert/index.css';

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
            <div className="space-y-6 w-full max-w-sm mx-auto p-4 lg:p-0">
                <div className="space-y-2 text-left">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                        Token inválido
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                        El enlace de recuperación no es válido o ya ha expirado.
                    </p>
                </div>

                <Alert variant="error">
                    <AlertTitle>Error de recuperación</AlertTitle>
                    <AlertDescription>El enlace de recuperación no es válido.</AlertDescription>
                </Alert>

                <div className="text-center pt-2">
                    <Link
                        href="/login"
                        className="text-xs font-semibold text-primary hover:text-primary-dark transition-colors"
                    >
                        Volver al inicio de sesión
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <form action={action} className="space-y-6 w-full max-w-sm mx-auto p-4 lg:p-0">
            <div className="space-y-2 text-left">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                    Nueva contraseña
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                    Ingresa tu nueva contraseña para recuperar el acceso a tu cuenta
                </p>
            </div>

            {state?.message && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                    <Alert variant={state.success ? 'success' : 'error'}>
                        <AlertTitle>{state.success ? 'Éxito' : 'Error de cambio'}</AlertTitle>
                        <AlertDescription>{state.message}</AlertDescription>
                    </Alert>
                </div>
            )}

            <input type="hidden" name="token" value={token} />

            {!state?.success && (
                <div className="space-y-4">
                    <Input
                        id="reset-password"
                        name="password"
                        type="password"
                        label="Nueva contraseña"
                        placeholder="••••••••"
                        required
                        error={state?.errors?.password?.[0]}
                        className="dark:bg-slate-900 dark:border-slate-800 dark:text-white"
                    />

                    <Input
                        id="reset-confirm-password"
                        name="confirmPassword"
                        type="password"
                        label="Confirmar contraseña"
                        placeholder="••••••••"
                        required
                        error={state?.errors?.confirmPassword?.[0]}
                        className="dark:bg-slate-900 dark:border-slate-800 dark:text-white"
                    />

                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full h-11 text-base font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all"
                        isLoading={isPending}
                    >
                        Actualizar contraseña
                    </Button>
                </div>
            )}

            <div className="text-center pt-2">
                <Link
                    href="/login"
                    className="text-xs font-semibold text-primary hover:text-primary-dark transition-colors"
                >
                    Volver al inicio de sesión
                </Link>
            </div>
        </form>
    );
}
