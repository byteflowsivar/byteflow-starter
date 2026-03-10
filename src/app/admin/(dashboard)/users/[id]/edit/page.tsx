import { getUserAction } from '@/features/users/actions/get-user.action';
import { updateUserAction } from '@/features/users/actions/update-user.action';
import { UserForm } from '@/features/users/components/UserForm';
import { ArrowLeft, UserCog } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const metadata = {
    title: 'Editar Usuario | Byteflow Admin',
    description: 'Modifica los permisos y accesos de una cuenta de usuario.',
};

interface EditUserPageProps {
    params: Promise<{ id: string }>;
}

export default async function EditUserPage({ params }: EditUserPageProps) {
    const { id } = await params;
    const user = await getUserAction(id);

    if (!user) {
        notFound();
    }

    // Bind the userId to the action for security and ease of use in the form action
    const updateActionWithId = updateUserAction.bind(null, id);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-2 duration-500">
            <div className="space-y-4">
                <Link href="/admin/users" className="group flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-semibold text-sm">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Volver a la lista
                </Link>
                <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                        <UserCog size={28} />
                    </div>
                    <div className="space-y-1">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Perfil de Usuario</h2>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">
                            Editando el acceso para <span className="text-primary font-bold">{user.email}</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm transition-all duration-300">
                <div className="space-y-6">
                    <UserForm user={user} action={updateActionWithId} />
                </div>
            </div>
        </div>
    );
}
