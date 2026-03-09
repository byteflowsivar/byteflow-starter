'use client';

import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        // Al montar, verificamos si hay un tema guardado o preferencia del sistema
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        const initialTheme = savedTheme || systemTheme;

        setTheme(initialTheme);
        document.documentElement.classList.toggle('dark', initialTheme === 'dark');
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
        localStorage.setItem('theme', newTheme);
    };

    return (
        <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 dark:bg-slate-900/50 dark:hover:bg-slate-900/80 border border-white/20 dark:border-slate-800 transition-all group"
            aria-label="Cambiar tema"
        >
            {theme === 'light' ? (
                <>
                    <Moon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Tema</span>
                </>
            ) : (
                <>
                    <Sun className="w-5 h-5 text-yellow-400 group-hover:rotate-45 transition-transform" />
                    <span className="text-sm font-semibold text-white">Tema</span>
                </>
            )}
        </button>
    );
}
