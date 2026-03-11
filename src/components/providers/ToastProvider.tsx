'use client';

import { useState, useEffect } from 'react';
import { ToastProvider as BaseToastProvider } from '@byteflow-ui/toast';
import { ToastListener } from './ToastListener';
import '@byteflow-ui/toast/index.css';

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <>{children}</>;
    }

    return (
        <BaseToastProvider>
            <ToastListener />
            {children}
        </BaseToastProvider>
    );
}
