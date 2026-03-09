'use client';

import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarFooter,
    SidebarItem,
    SidebarGroup,
    SidebarToggle,
    useSidebar // Importamos el hook para conocer el estado
} from '@byteflow-ui/sidebar';
import { Button } from '@byteflow-ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { logoutAction } from '@/features/auth/actions/logout.action';
import {
    LayoutDashboard,
    BarChart3,
    Users,
    Settings,
    Shield,
    LogOut
} from 'lucide-react'; // Importamos iconos premium
import '@byteflow-ui/sidebar/index.css';
import '@byteflow-ui/button/index.css';

interface DashboardClientLayoutProps {
    children: React.ReactNode;
    session: {
        email: string;
        role: string;
    };
}

// Subcomponente interno para manejar los items con acceso al contexto del Sidebar
function SidebarNavigation() {
    const { isCollapsed } = useSidebar();

    return (
        <SidebarContent>
            <SidebarGroup label={isCollapsed ? "" : "Principal"} className="dark:text-slate-400">
                <SidebarItem
                    active
                    icon={<LayoutDashboard size={20} />}
                    className="dark:bg-primary/10 dark:text-primary"
                    title={isCollapsed ? "Panel General" : ""}
                >
                    Panel General
                </SidebarItem>
                <SidebarItem
                    icon={<BarChart3 size={20} />}
                    className="dark:text-slate-300 dark:hover:bg-slate-800"
                    title={isCollapsed ? "Estadísticas" : ""}
                >
                    Estadísticas
                </SidebarItem>
                <SidebarItem
                    icon={<Users size={20} />}
                    className="dark:text-slate-300 dark:hover:bg-slate-800"
                    title={isCollapsed ? "Usuarios" : ""}
                >
                    Usuarios
                </SidebarItem>
            </SidebarGroup>

            <SidebarGroup label={isCollapsed ? "" : "Administración"} className="dark:text-slate-400">
                <SidebarItem
                    icon={<Settings size={20} />}
                    className="dark:text-slate-300 dark:hover:bg-slate-800"
                    title={isCollapsed ? "Configuración" : ""}
                >
                    Configuración
                </SidebarItem>
                <SidebarItem
                    icon={<Shield size={20} />}
                    className="dark:text-slate-300 dark:hover:bg-slate-800"
                    title={isCollapsed ? "Seguridad" : ""}
                >
                    Seguridad
                </SidebarItem>
            </SidebarGroup>
        </SidebarContent>
    );
}

export function DashboardClientLayout({ children, session }: DashboardClientLayoutProps) {
    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            {/* Sidebar con soporte dark */}
            <Sidebar className="dark:bg-slate-900 dark:border-slate-800">
                <SidebarHeader className="h-16 flex items-center px-4 border-b border-slate-100 dark:border-slate-800 justify-between">
                    <div className="flex items-center gap-2 overflow-hidden">
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold">
                            B
                        </div>
                        <span className="font-bold text-slate-900 dark:text-white whitespace-nowrap">Byteflow</span>
                    </div>
                    <SidebarToggle />
                </SidebarHeader>

                <SidebarNavigation />

                <SidebarFooter className="p-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="space-y-4">
                        <div className="px-2 overflow-hidden">
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">Sesión</p>
                            <p className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">{session.email}</p>
                        </div>
                        <form action={logoutAction}>
                            <Button
                                type="submit"
                                variant="ghost"
                                className="w-full justify-start text-error hover:bg-error/10 px-2"
                                title="Cerrar sesión"
                            >
                                <LogOut size={20} className="mr-2 flex-shrink-0" />
                                <span className="truncate">Cerrar sesión</span>
                            </Button>
                        </form>
                    </div>
                </SidebarFooter>
            </Sidebar>

            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between px-6 sticky top-0 z-10 transition-colors">
                    <div className="flex items-center gap-4">
                        <h1 className="text-lg font-semibold text-slate-900 dark:text-white">Panel de Administración</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                    </div>
                </header>
                <div className="p-8 flex-1 overflow-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
