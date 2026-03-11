'use client';

type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info';

interface ToastEventDetail {
    title?: string;
    description?: string;
    variant?: ToastVariant;
    duration?: number;
}

const TOAST_EVENT_NAME = 'bf-toast-event';

export const toastBus = {
    /**
     * Publica una nueva notificación al bus global
     */
    publish(detail: ToastEventDetail) {
        if (typeof window === 'undefined') return;

        const event = new CustomEvent(TOAST_EVENT_NAME, { detail });
        window.dispatchEvent(event);
    },

    /**
     * Se suscribe a los eventos de notificación
     */
    subscribe(callback: (detail: ToastEventDetail) => void) {
        if (typeof window === 'undefined') return () => { };

        const handler = (event: Event) => {
            const customEvent = event as CustomEvent<ToastEventDetail>;
            callback(customEvent.detail);
        };

        window.addEventListener(TOAST_EVENT_NAME, handler);
        return () => window.removeEventListener(TOAST_EVENT_NAME, handler);
    }
};
