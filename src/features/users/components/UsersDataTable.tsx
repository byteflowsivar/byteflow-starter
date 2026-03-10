'use client';

import { DataTable, DataTableColumn } from '@byteflow-ui/data-table';
import { Badge } from '@byteflow-ui/badge';
import { Button } from '@byteflow-ui/button';
import { UserListItem } from '../types';
import { DeleteUserDialog } from './DeleteUserDialog';
import { Edit, Trash2, UserPlus, Copy, Check, Users } from 'lucide-react';
import Link from 'next/link';

// Import CSS and dependencies as required by v1.0.2
import '@byteflow-ui/data-table/index.css';
import '@byteflow-ui/table/index.css';
import '@byteflow-ui/pagination/index.css';
import '@byteflow-ui/badge/index.css';
import '@byteflow-ui/button/index.css';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';

interface UsersDataTableProps {
    users: UserListItem[];
}

export function UsersDataTable({ users }: UsersDataTableProps) {
    const [isMounted, setIsMounted] = useState(false);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleCopyId = (id: string) => {
        navigator.clipboard.writeText(id).then(() => {
            setCopiedId(id);
            setTimeout(() => setCopiedId(null), 2000);
        });
    };

    const DataTableAny = DataTable as any;
    const columns: DataTableColumn<UserListItem>[] = [
        {
            header: 'Usuario',
            accessorKey: 'name',
            cell: (value) => <span className="font-semibold text-slate-700 dark:text-white capitalize">{String(value)}</span>
        },
        {
            header: 'Email',
            accessorKey: 'email',
            cell: (value) => <span className="text-slate-600 dark:text-slate-400 font-medium">{String(value)}</span>
        },
        {
            header: 'Rol',
            accessorKey: 'role',
            cell: (value) => (
                <span className="text-slate-700 dark:text-slate-300 font-medium capitalize">
                    {value === 'admin' ? 'Manager' : 'Developer'}
                </span>
            )
        },
        {
            header: 'Estado',
            accessorKey: 'isActive',
            width: '120px',
            align: 'center',
            cell: (value) => (
                <Badge
                    variant={value ? 'success' : 'error'}
                    className={`rounded-full px-3 py-0.5 text-[11px] font-bold uppercase tracking-wide border-none ${value
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        }`}
                >
                    {value ? 'Activo' : 'Inactivo'}
                </Badge>
            )
        },
        {
            header: 'Acciones',
            accessorKey: 'id',
            width: '120px',
            align: 'center',
            cell: (_value, user) => (
                <div className="flex items-center justify-center gap-1.5">
                    <Button
                        variant="ghost"
                        className="h-8 w-8 p-0 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center font-bold"
                        title="Copiar ID"
                        onClick={() => handleCopyId(user.id)}
                        startIcon={copiedId === user.id ? (
                            <Check size={14} className="text-success" />
                        ) : (
                            <Copy size={14} className="text-slate-500" />
                        )}
                    />
                    <Link href={`/admin/users/${user.id}/edit`}>
                        <Button
                            variant="ghost"
                            className="h-8 w-8 p-0 hover:bg-primary/10 transition-colors flex items-center justify-center"
                            title="Editar"
                            startIcon={<Edit size={14} className="text-primary" />}
                        />
                    </Link>
                    <DeleteUserDialog
                        userId={user.id}
                        userName={user.name}
                        trigger={
                            <Button
                                variant="ghost"
                                className="h-8 w-8 p-0 hover:bg-error/10 transition-colors flex items-center justify-center"
                                title="Eliminar"
                                startIcon={<Trash2 size={14} className="text-error" />}
                            />
                        }
                    />
                </div>
            )
        }
    ];

    return (
        <div className="w-full">
            {/* 
              We use a hydration guard to avoid the 'A tree hydrated but some attributes...' error 
              caused by dynamic IDs being generated differently on server and client.
            */}
            {!isMounted ? (
                <div className="w-full space-y-8">
                    <div className="flex justify-between items-center mb-8">
                        <div className="h-10 w-64 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-lg" />
                        <div className="h-12 w-72 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-xl" />
                    </div>
                    <div className="w-full h-[500px] bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 animate-pulse" />
                </div>
            ) : (
                <DataTableAny
                    data={users}
                    columns={columns}
                    pageSize={10}
                    searchKey="name"
                >
                    {/* Header Section from screenshot */}
                    <PageHeader
                        title="Gestión de Usuarios"
                        description="Administra las cuentas de acceso a la plataforma de forma centralizada."
                        icon={<Users size={28} />}
                        actions={
                            <>
                                <Link href="/admin/users/new">
                                    <Button
                                        variant="primary"
                                        className="h-12 px-6 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all font-bold whitespace-nowrap"
                                        startIcon={<UserPlus size={18} />}
                                    >
                                        Nuevo Usuario
                                    </Button>
                                </Link>
                                <div className="w-full sm:w-[280px]">
                                    <DataTableAny.Toolbar
                                        className="[&_input]:h-12 [&_input]:px-6 [&_input]:rounded-xl [&_input]:border-slate-200 dark:[&_input]:border-slate-800 [&_input]:bg-white dark:[&_input]:bg-slate-900 !p-0"
                                        placeholder="Buscar por name..."
                                        id="search-input-users"
                                    />
                                </div>
                            </>
                        }
                    />

                    {/* Table implementation */}
                    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
                        <DataTableAny.Table className="w-full" />
                    </div>

                    {/* Pagination Section */}
                    <div className="flex justify-end mt-8">
                        <DataTableAny.Pagination className="[&_.bf-pagination-item]:rounded-lg [&_.bf-pagination-item--active]:bg-primary [&_.bf-pagination-item--active]:text-white shadow-sm" />
                    </div>
                </DataTableAny>
            )}
        </div>
    );
}
