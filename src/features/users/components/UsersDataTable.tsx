'use client';

import { DataTable, DataTableColumn } from '@byteflow-ui/data-table';
import { Badge } from '@byteflow-ui/badge';
import { Button } from '@byteflow-ui/button';
import { UserListItem } from '../types';
import { DeleteUserDialog } from './DeleteUserDialog';
import { Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import '@byteflow-ui/data-table/dist/index.css';
import '@byteflow-ui/badge/dist/index.css';
import '@byteflow-ui/button/dist/index.css';

interface UsersDataTableProps {
    users: UserListItem[];
}

export function UsersDataTable({ users }: UsersDataTableProps) {
    const columns: DataTableColumn<UserListItem>[] = [
        {
            header: 'Usuario',
            accessorKey: 'name',
            cell: (_value, user) => (
                <div className="flex flex-col">
                    <span className="font-bold text-slate-900 dark:text-white">{user.name}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium tracking-tight truncate max-w-[180px]">
                        {user.email}
                    </span>
                </div>
            )
        },
        {
            header: 'Rol',
            accessorKey: 'role',
            cell: (value) => (
                <Badge variant={value === 'admin' ? 'primary' : 'secondary'} size="sm" className="font-bold uppercase tracking-wider px-2">
                    {value === 'admin' ? 'Administrador' : 'Usuario'}
                </Badge>
            )
        },
        {
            header: 'Estado',
            accessorKey: 'isActive',
            cell: (value) => (
                <Badge variant={value ? 'success' : 'error'} size="sm" className="font-bold uppercase tracking-wider px-2">
                    {value ? 'Activo' : 'Inactivo'}
                </Badge>
            )
        },
        {
            header: 'Acciones',
            accessorKey: 'id',
            cell: (_value, user) => (
                <div className="flex items-center gap-2">
                    <Link href={`/admin/users/${user.id}/edit`}>
                        <Button variant="ghost" className="h-9 w-9 p-0 hover:bg-primary/10 transition-colors" title="Editar">
                            <Edit size={16} className="text-primary" />
                        </Button>
                    </Link>
                    <DeleteUserDialog
                        userId={user.id}
                        userName={user.name}
                        trigger={
                            <Button variant="ghost" className="h-9 w-9 p-0 hover:bg-error/10 transition-colors" title="Eliminar">
                                <Trash2 size={16} className="text-error" />
                            </Button>
                        }
                    />
                </div>
            )
        }
    ];

    return (
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm transition-all duration-300">
            <DataTable
                data={users as any}
                columns={columns as any}
                pageSize={10}
                searchKey="name"
                className="p-4"
            />
        </div>
    );
}
