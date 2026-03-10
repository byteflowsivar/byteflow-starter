'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ReactNode } from 'react';

interface PageHeaderProps {
    title: string;
    description?: string;
    backLink?: {
        href: string;
        label: string;
    };
    icon: ReactNode;
    actions?: ReactNode;
}

export function PageHeader({ title, description, backLink, icon, actions }: PageHeaderProps) {
    return (
        <div className="flex flex-col gap-4 mb-8">
            {/* Top area reserved for back button to maintain consistent title height */}
            <div className="min-h-[24px]">
                {backLink ? (
                    <Link
                        href={backLink.href}
                        className="group flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-semibold text-sm w-fit"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        {backLink.label}
                    </Link>
                ) : null}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                    {icon && (
                        <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner flex-shrink-0">
                            {icon}
                        </div>
                    )}
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                            {title}
                        </h1>
                        {description && (
                            <p className="text-slate-500 dark:text-slate-400 font-medium max-w-xl">
                                {description}
                            </p>
                        )}
                    </div>
                </div>
                {actions && (
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        {actions}
                    </div>
                )}
            </div>
        </div>
    );
}
