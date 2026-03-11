'use client';

import { useEffect } from 'react';
import { useToast } from '@byteflow-ui/toast';
import { toastBus } from '@/lib/toast-bus';

/**
 * ToastListener es el Suscriptor global del sistema Pub/Sub.
 * Escucha los eventos del toastBus y dispara las notificaciones reales.
 */
export function ToastListener() {
    const { toast } = useToast();

    useEffect(() => {
        // Suscribirse al bus de eventos
        const unsubscribe = toastBus.subscribe((detail) => {
            console.log('ToastListener: Received event, showing toast...', detail);
            toast(detail);
        });

        // Limpieza al desmontar para evitar duplicación de suscriptores
        return () => {
            unsubscribe();
        };
    }, [toast]);

    return null; // Este componente no renderiza nada visual, solo lógica
}
