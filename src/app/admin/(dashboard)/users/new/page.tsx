'use client';

import { UserForm } from '@/features/users/components/UserForm';
import { createUserAction } from '@/features/users/actions/create-user.action';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewUserPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-left-2 duration-500">
            <div className="space-y-4">
                <Link href="/admin/users" className="group flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-semibold text-sm">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Volver a la lista
                </Link>
                <div className="space-y-1">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Nuevo usuario</h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium max-w-xl">
                        Crea una nueva cuenta de acceso. El usuario recibirá sus credenciales por el canal oficial una vez activado.
                    </p>
                </div>
            </div>

            <div className="p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm transition-all duration-300">
                <UserForm action={createUserAction} />
            </div>
        </div>
    );
}
