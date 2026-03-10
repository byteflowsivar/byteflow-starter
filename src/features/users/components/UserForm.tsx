'use client';

import { useActionState, useState } from 'react';
import { Button } from '@byteflow-ui/button';
import { Input } from '@byteflow-ui/input';
import { Label } from '@byteflow-ui/label';
import { Alert, AlertTitle, AlertDescription } from '@byteflow-ui/alert';
import { Combobox, ComboboxOption } from '@byteflow-ui/combobox';
import { UserListItem, ActionResult } from '../types';
import Link from 'next/link';
import { Save, X } from 'lucide-react';
import '@byteflow-ui/button/index.css';
import '@byteflow-ui/input/index.css';
import '@byteflow-ui/label/index.css';
import '@byteflow-ui/alert/index.css';
import '@byteflow-ui/popover/index.css';
import '@byteflow-ui/command/index.css';
import '@byteflow-ui/combobox/index.css';
// Note: Combobox depends internally on Popover and Command for its operation and look.

interface UserFormProps {
    user?: UserListItem | null;
    action: (prevState: ActionResult | undefined, formData: FormData) => Promise<ActionResult>;
}

const roleOptions: ComboboxOption[] = [
    { value: 'user', label: 'Usuario' },
    { value: 'admin', label: 'Administrador' },
];

export function UserForm({ user, action }: UserFormProps) {
    const [state, formAction, isPending] = useActionState(action, undefined);
    const [selectedRole, setSelectedRole] = useState(user?.role || 'user');
    const [isActive, setIsActive] = useState(user ? user.isActive : true);

    return (
        <form action={formAction} className="space-y-8 max-w-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="user-name">Nombre completo</Label>
                        <Input
                            id="user-name"
                            name="name"
                            defaultValue={user?.name}
                            placeholder="Ej: Juan Pérez"
                            required
                            error={state?.errors?.name?.[0]}
                            className="dark:bg-slate-900 dark:border-slate-800 dark:text-white"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="user-email">Correo electrónico</Label>
                        <Input
                            id="user-email"
                            name="email"
                            type="email"
                            defaultValue={user?.email}
                            placeholder="usuario@byteflow.dev"
                            required
                            disabled={!!user} // Email usually shouldn't be changed after creation
                            error={state?.errors?.email?.[0]}
                            className="dark:bg-slate-900 dark:border-slate-800 dark:text-white"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Rol en la plataforma</Label>
                        <Combobox
                            options={roleOptions}
                            value={selectedRole}
                            onValueChange={(val) => setSelectedRole(val as 'user' | 'admin')}
                            placeholder="Selecciona un rol"
                            className="w-full h-11 dark:bg-slate-900 dark:border-slate-800 dark:text-white"
                        />
                        <input type="hidden" name="role" value={selectedRole} />
                        {state?.errors?.role && (
                            <p className="text-xs text-error font-medium">{state.errors.role[0]}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="user-password">
                            {user ? 'Nueva contraseña (opcional)' : 'Contraseña'}
                        </Label>
                        <Input
                            id="user-password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            required={!user}
                            error={state?.errors?.password?.[0]}
                            className="dark:bg-slate-900 dark:border-slate-800 dark:text-white"
                        />
                        {user && (
                            <p className="text-[10px] text-slate-400 font-medium">
                                Deja en blanco si no deseas cambiarla.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {user && (
                <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800 transition-all">
                    <input
                        type="checkbox"
                        id="user-active"
                        name="isActive"
                        checked={isActive}
                        onChange={(e) => setIsActive(e.target.checked)}
                        className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary dark:bg-slate-950 dark:border-slate-800"
                    />
                    <Label htmlFor="user-active" className="cursor-pointer font-bold text-slate-700 dark:text-slate-300">
                        Usuario activo
                    </Label>
                    <p className="text-xs text-slate-400 ml-auto hidden sm:block">
                        Los usuarios inactivos no pueden iniciar sesión.
                    </p>
                </div>
            )}

            {state?.message && !state.success && (
                <Alert variant="error" className="animate-in fade-in slide-in-from-top-1 duration-300">
                    <AlertTitle>Error en el formulario</AlertTitle>
                    <AlertDescription>{state.message}</AlertDescription>
                </Alert>
            )}

            <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <Button
                    type="submit"
                    variant="primary"
                    className="h-11 px-8 font-bold shadow-lg shadow-primary/20 active:scale-95 transition-all"
                    isLoading={isPending}
                    startIcon={<Save size={18} />}
                >
                    {user ? 'Guardar cambios' : 'Crear usuario'}
                </Button>
                <Link href="/admin/users">
                    <Button
                        variant="ghost"
                        className="h-11 px-6 font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400"
                        startIcon={<X size={18} />}
                    >
                        Cancelar
                    </Button>
                </Link>
            </div>
        </form>
    );
}
