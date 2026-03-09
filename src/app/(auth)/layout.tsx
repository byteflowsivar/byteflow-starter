import { ThemeToggle } from '@/components/ThemeToggle';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-slate-950 relative">
            {/* Theme Toggle in Top Left */}
            <div className="absolute top-6 left-6 z-50">
                <ThemeToggle />
            </div>
            {/* Brand Section - Visible on Desktop */}
            <div className="hidden lg:flex flex-col justify-between p-12 bg-primary relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary-dark/90 z-0" />

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl animate-pulse" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full -ml-48 -mb-48 blur-3xl animate-pulse" />

                <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white text-primary font-bold text-2xl mb-6 shadow-lg shadow-black/10">
                        B
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
                        Transforma tu flujo <br />con Byteflow
                    </h1>
                    <p className="text-primary-foreground/80 text-lg max-w-md font-medium">
                        La plataforma definitiva para gestionar tus operaciones con velocidad y precisión quirúrgica.
                    </p>
                </div>

                <div className="relative z-10 flex items-center gap-4 text-white/60 text-sm">
                    <span>© 2026 Byteflow Solutions</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <Link href="/privacy" className="hover:text-white transition-colors">Privacidad</Link>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <Link href="/terms" className="hover:text-white transition-colors">Términos</Link>
                </div>
            </div>

            {/* Form Section */}
            <div className="flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-slate-950 relative">
                {/* Mobile Logo */}
                <div className="lg:hidden absolute top-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-2xl shadow-lg shadow-primary/20">
                        B
                    </div>
                    <span className="font-bold text-slate-900 dark:text-slate-100 uppercase tracking-widest text-sm">Byteflow</span>
                </div>

                <div className="w-full max-w-md space-y-8">
                    {children}
                </div>
            </div>
        </div>
    );
}

import Link from 'next/link';
