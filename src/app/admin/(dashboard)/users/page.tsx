import { getUsersAction } from '@/features/users/actions/get-users.action';
import { UsersDataTable } from '@/features/users/components/UsersDataTable';

export const metadata = {
    title: 'Gestión de Usuarios | Byteflow Admin',
    description: 'Administra las cuentas de acceso a la plataforma.',
};

export default async function UsersPage() {
    const users = await getUsersAction();

    return (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <UsersDataTable users={users} />
        </div>
    );
}
