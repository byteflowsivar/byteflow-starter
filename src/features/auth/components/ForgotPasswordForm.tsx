'use client';

import { useActionState } from 'react';
import { forgotPasswordAction } from '../actions/forgot-password.action';
import { Button } from '@byteflow-ui/button';
import { Input } from '@byteflow-ui/input';
import { Alert, AlertTitle, AlertDescription } from '@byteflow-ui/alert';
import Link from 'next/link';
import '@byteflow-ui/button/dist/index.css';
import '@byteflow-ui/input/dist/index.css';
import '@byteflow-ui/alert/dist/index.css';

export function ForgotPasswordForm() {
    const [state, action, isPending] = useActionState(forgotPasswordAction, undefined);

    return (
        <form action={action} className="space-y-4 w-full max-w-sm mx-auto p-6 bg-white rounded-xl shadow-lg border border-slate-100">
            <div className="text-center space-y-2 mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Recuperar contraseña</h1>
                <p className="text-slate-500 text-sm">Te enviaremos un enlace para restablecer tu acceso</p>
            </div>

            {state?.message && (
                <Alert variant={state.success ? 'success' : 'error'}>
                    <AlertTitle>{state.success ? 'Correo enviado' : 'Error'}</AlertTitle>
                    <AlertDescription>{state.message}</AlertDescription>
                </Alert>
            )}

            {!state?.success && (
                <>
                    <Input
                        id="forgot-email"
                        name="email"
                        type="email"
                        label="Correo electrónico"
                        placeholder="admin@byteflow.dev"
                        required
                        error={state?.errors?.email?.[0]}
                    />

                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full"
                        isLoading={isPending}
                    >
                        Enviar enlace
                    </Button>
                </>
            )}

            <div className="text-center mt-4">
                <Link
                    href="/login"
                    className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
                >
                    Volver al inicio de sesión
                </Link>
            </div>
        </form>
    );
}
