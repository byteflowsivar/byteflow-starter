import { getUsersAction } from '@/features/users/actions/get-users.action';
import { UsersDataTable } from '@/features/users/components/UsersDataTable';
import { Button } from '@byteflow-ui/button';
import Link from 'next/link';
import { UserPlus } from 'lucide-react';

export const metadata = {
    title: 'Gestión de Usuarios | Byteflow Admin',
    description: 'Administra las cuentas de acceso a la plataforma.',
};

export default async function UsersPage() {
    const users = await getUsersAction();

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Usuarios</h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">
                        Gestiona los accesos y permisos de todos los administradores y operadores comerciales.
                    </p>
                </div>
                <Link href="/admin/users/new">
                    <Button
                        variant="primary"
                        size="md"
                        className="h-11 px-6 font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-95 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                        <UserPlus size={18} strokeWidth={2.5} className="flex-shrink-0" />
                        <span>Crear nuevo usuario</span>
                    </Button>
                </Link>
            </div>

            <UsersDataTable users={users} />
        </div>
    );
}
