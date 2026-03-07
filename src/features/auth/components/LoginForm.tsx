'use client';

import { useActionState } from 'react';
import { loginAction } from '../actions/login.action';
import { Button } from '@byteflow-ui/button';
import { Input } from '@byteflow-ui/input';
import { Alert, AlertTitle, AlertDescription } from '@byteflow-ui/alert';
import Link from 'next/link';
import '@byteflow-ui/button/dist/index.css';
import '@byteflow-ui/input/dist/index.css';
import '@byteflow-ui/alert/dist/index.css';

export function LoginForm() {
    const [state, action, isPending] = useActionState(loginAction, undefined);

    return (
        <form action={action} className="space-y-4 w-full max-w-sm mx-auto p-6 bg-white rounded-xl shadow-lg border border-slate-100">
            <div className="text-center space-y-2 mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Bienvenido de nuevo</h1>
                <p className="text-slate-500 text-sm">Ingresa tus credenciales para acceder al panel</p>
            </div>

            {state?.message && !state.success && (
                <Alert variant="error">
                    <AlertTitle>Error de autenticación</AlertTitle>
                    <AlertDescription>{state.message}</AlertDescription>
                </Alert>
            )}

            <Input
                name="email"
                type="email"
                label="Correo electrónico"
                placeholder="admin@byteflow.dev"
                required
                error={state?.errors?.email?.[0]}
            />

            <Input
                name="password"
                type="password"
                label="Contraseña"
                placeholder="••••••••"
                required
                error={state?.errors?.password?.[0]}
            />

            <div className="flex items-center justify-end">
                <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-primary hover:underline"
                >
                    ¿Olvidaste tu contraseña?
                </Link>
            </div>

            <Button
                type="submit"
                variant="primary"
                className="w-full"
                isLoading={isPending}
            >
                Iniciar sesión
            </Button>
        </form>
    );
}
