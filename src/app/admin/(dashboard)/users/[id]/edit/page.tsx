import { getUserAction } from '@/features/users/actions/get-user.action';
import { updateUserAction } from '@/features/users/actions/update-user.action';
import { UserForm } from '@/features/users/components/UserForm';
import { UserCog } from 'lucide-react';
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/layout/PageHeader';

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
            <PageHeader
                title="Perfil de Usuario"
                description={`Editando el acceso para ${user.email}`}
                backLink={{
                    href: "/admin/users",
                    label: "Volver a la lista"
                }}
                icon={<UserCog size={28} />}
            />

            <div className="p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm transition-all duration-300">
                <div className="space-y-6">
                    <UserForm user={user} action={updateActionWithId} />
                </div>
            </div>
        </div>
    );
}
