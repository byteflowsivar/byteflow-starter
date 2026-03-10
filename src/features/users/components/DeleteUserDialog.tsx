'use client';

import { useState } from 'react';
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@byteflow-ui/dialog';
import { Button } from '@byteflow-ui/button';
import { deleteUserAction } from '../actions/delete-user.action';
import '@byteflow-ui/dialog/index.css';
import '@byteflow-ui/button/index.css';

interface DeleteUserDialogProps {
    userId: string;
    userName: string;
    trigger: React.ReactNode;
}

export function DeleteUserDialog({ userId, userName, trigger }: DeleteUserDialogProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDelete = async () => {
        setIsPending(true);
        setError(null);
        try {
            const result = await deleteUserAction(userId);
            if (result.success) {
                setIsOpen(false);
            } else {
                setError(result.message || 'Error al eliminar el usuario');
            }
        } catch (err: any) {
            setError(err.message || 'Error inesperado');
        } finally {
            setIsPending(false);
        }
    };

    return (
        <>
            <div onClick={() => setIsOpen(true)} className="inline-block">
                {trigger}
            </div>

            <Dialog isOpen={isOpen} onClose={() => !isPending && setIsOpen(false)}>
                <DialogHeader>
                    <DialogTitle>¿Eliminar usuario?</DialogTitle>
                    <DialogDescription>
                        Estás a punto de eliminar a <span className="font-bold text-slate-900 dark:text-white">{userName}</span>.
                        Esta acción no se puede deshacer.
                    </DialogDescription>
                </DialogHeader>

                {error && (
                    <div className="p-4 bg-error/10 text-error text-sm rounded-lg border border-error/20 my-2">
                        {error}
                    </div>
                )}

                <DialogFooter>
                    <Button
                        variant="ghost"
                        onClick={() => setIsOpen(false)}
                        disabled={isPending}
                        className="dark:text-slate-300"
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleDelete}
                        isLoading={isPending}
                        className="!bg-error !text-white hover:!bg-error/90 border-none shadow-lg shadow-error/20"
                    >
                        Confirmar eliminación
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
