import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarFooter,
    SidebarItem,
    SidebarGroup,
    SidebarToggle
} from '@byteflow-ui/sidebar';
import { logoutAction } from '@/features/auth/actions/logout.action';
import { Button } from '@byteflow-ui/button';
import '@byteflow-ui/sidebar/dist/index.css';
import '@byteflow-ui/button/dist/index.css';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getSession();

    if (!session) {
        redirect('/login');
    }

    return (
        <div className="flex min-h-screen bg-slate-50">
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
                            <p className="text-sm font-medium text-slate-700 truncate">{session.email}</p>
                        </div>
                        <form action={logoutAction}>
                            <Button type="submit" variant="ghost" className="w-full justify-start text-error">
                                Cerrar sesión
                            </Button>
                        </form>
                    </div>
                </SidebarFooter>
            </Sidebar>
            <main className="flex-1 flex flex-col min-w-0">
                <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <SidebarToggle />
                        <h1 className="text-lg font-semibold text-slate-900">Panel de Administración</h1>
                    </div>
                </header>
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
