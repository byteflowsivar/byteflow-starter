'use client';

import { UserForm } from '@/features/users/components/UserForm';
import { createUserAction } from '@/features/users/actions/create-user.action';
import { PageHeader } from '@/components/layout/PageHeader';

export default function NewUserPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-left-2 duration-500">
            <PageHeader
                title="Nuevo usuario"
                description="Crea una nueva cuenta de acceso. El usuario recibirá sus credenciales por el canal oficial una vez activado."
                backLink={{
                    href: "/admin/users",
                    label: "Volver a la lista"
                }}
            />

            <div className="p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm transition-all duration-300">
                <UserForm action={createUserAction} />
            </div>
        </div>
    );
}
