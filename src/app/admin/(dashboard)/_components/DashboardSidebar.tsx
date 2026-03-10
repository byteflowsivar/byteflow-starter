'use client';

import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarFooter,
    SidebarItem,
    SidebarGroup,
    SidebarToggle
} from '@byteflow-ui/sidebar';
import { Button } from '@byteflow-ui/button';
import { logoutAction } from '@/features/auth/actions/logout.action';
import '@byteflow-ui/sidebar/index.css';
import '@byteflow-ui/button/index.css';

interface DashboardSidebarProps {
    email?: string;
    role?: string;
}

export function DashboardSidebar({ email, role }: DashboardSidebarProps) {
    return (
        <Sidebar>
            <SidebarHeader className="h-16 flex items-center px-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold">
                        B
                    </div>
                    <span className="font-bold text-slate-900">Byteflow</span>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup label="Principal">
                    <SidebarItem active>Panel General</SidebarItem>
                    <SidebarItem>Estadísticas</SidebarItem>
                    <SidebarItem>Usuarios</SidebarItem>
                </SidebarGroup>
                <SidebarGroup label="Administración">
                    <SidebarItem>Configuración</SidebarItem>
                    <SidebarItem>Seguridad</SidebarItem>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="p-4 border-t border-slate-100">
                <div className="space-y-4">
                    <div className="px-2">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Sesión</p>
                        <p className="text-sm font-medium text-slate-700 truncate">{email}</p>
                    </div>
                    <form action={logoutAction}>
                        <Button type="submit" variant="ghost" className="w-full justify-start text-error">
                            Cerrar sesión
                        </Button>
                    </form>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}

// Re-export specifically the Toggle to use it in the header
export { SidebarToggle };
