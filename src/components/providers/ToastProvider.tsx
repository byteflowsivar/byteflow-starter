'use client';

import { ToastProvider as BaseToastProvider } from '@byteflow-ui/toast';
import '@byteflow-ui/toast/index.css';

export function ToastProvider({ children }: { children: React.ReactNode }) {
    return (
        <BaseToastProvider>
            {children}
        </BaseToastProvider>
    );
}
