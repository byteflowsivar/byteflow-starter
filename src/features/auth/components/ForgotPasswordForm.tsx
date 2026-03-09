'use client';

import { useActionState } from 'react';
import { forgotPasswordAction } from '../actions/forgot-password.action';
import { Button } from '@byteflow-ui/button';
import { Input } from '@byteflow-ui/input';
import { Alert, AlertTitle, AlertDescription } from '@byteflow-ui/alert';
import Link from 'next/link';
import '@byteflow-ui/button/index.css';
import '@byteflow-ui/input/index.css';
import '@byteflow-ui/alert/index.css';

export function ForgotPasswordForm() {
    const [state, action, isPending] = useActionState(forgotPasswordAction, undefined);

    return (
        <form action={action} className="space-y-6 w-full max-w-sm mx-auto p-4 lg:p-0">
            <div className="space-y-2 text-left">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                    Recuperar contraseña
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                    Te enviaremos un enlace para restablecer tu acceso a la plataforma
                </p>
            </div>

            {state?.message && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                    <Alert variant={state.success ? 'success' : 'error'}>
                        <AlertTitle>{state.success ? 'Correo enviado' : 'Error de recuperación'}</AlertTitle>
                        <AlertDescription>{state.message}</AlertDescription>
                    </Alert>
                </div>
            )}

            {!state?.success && (
                <div className="space-y-4">
                    <Input
                        id="forgot-email"
                        name="email"
                        type="email"
                        label="Correo electrónico"
                        placeholder="admin@byteflow.dev"
                        required
                        error={state?.errors?.email?.[0]}
                        className="dark:bg-slate-900 dark:border-slate-800 dark:text-white"
                    />

                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full h-11 text-base font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all"
                        isLoading={isPending}
                    >
                        Enviar enlace
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
