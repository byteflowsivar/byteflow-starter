'use client';

import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loginAction } from '../actions/login.action';
import { Button } from '@byteflow-ui/button';
import { Input } from '@byteflow-ui/input';
import { Alert, AlertTitle, AlertDescription } from '@byteflow-ui/alert';
import { toastBus } from '@/lib/toast-bus';
import Link from 'next/link';
import '@byteflow-ui/button/index.css';
import '@byteflow-ui/input/index.css';
import '@byteflow-ui/alert/index.css';

import { LogIn } from 'lucide-react';

export function LoginForm() {
    const router = useRouter();
    const [state, action, isPending] = useActionState(loginAction, undefined);

    useEffect(() => {
        if (state) {
            if (state.success) {
                toastBus.publish({
                    title: 'Sesión iniciada',
                    description: state.message,
                    variant: 'success'
                });
                router.push('/admin/dashboard');
            } else if (state.message) {
                toastBus.publish({
                    title: 'Error de acceso',
                    description: state.message,
                    variant: 'error'
                });
            }
        }
    }, [state, router]);

    return (
        <form action={action} className="space-y-6 w-full max-w-sm mx-auto p-4 lg:p-0">
            <div className="space-y-2 text-left lg:text-left">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                    Acceder
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                    Ingresa tus credenciales para continuar al panel administrativo
                </p>
            </div>

            {state?.message && !state.success && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                    <Alert variant="error">
                        <AlertTitle>Error de acceso</AlertTitle>
                        <AlertDescription>{state.message}</AlertDescription>
                    </Alert>
                </div>
            )}

            <div className="space-y-4">
                <Input
                    id="login-email"
                    name="email"
                    type="email"
                    label="Correo electrónico"
                    placeholder="ejemplo@byteflow.dev"
                    required
                    error={state?.errors?.email?.[0]}
                    className="dark:bg-slate-900 dark:border-slate-800 dark:text-white"
                />

                <div className="space-y-1">
                    <Input
                        id="login-password"
                        name="password"
                        type="password"
                        label="Contraseña"
                        placeholder="••••••••"
                        required
                        error={state?.errors?.password?.[0]}
                        className="dark:bg-slate-900 dark:border-slate-800 dark:text-white"
                    />
                    <div className="flex justify-end">
                        <Link
                            href="/admin/forgot-password"
                            className="text-xs font-semibold text-primary hover:text-primary-dark transition-colors"
                        >
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </div>
                </div>
            </div>

            <Button
                type="submit"
                variant="primary"
                className="w-full h-11 text-base font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all"
                isLoading={isPending}
                startIcon={<LogIn size={18} />}
            >
                Iniciar sesión
            </Button>

            <p className="text-center text-xs text-slate-400 dark:text-slate-500 pt-4">
                Al continuar, aceptas nuestros <Link href="/terms" className="underline hover:text-slate-600 dark:hover:text-slate-300">Términos de Servicio</Link> y <Link href="/privacy" className="underline hover:text-slate-600 dark:hover:text-slate-300">Política de Privacidad</Link>.
            </p>
        </form>
    );
}
