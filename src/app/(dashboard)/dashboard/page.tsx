import { getSession } from '@/lib/session';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent
} from '@byteflow-ui/card';
import { Badge } from '@byteflow-ui/badge';
import '@byteflow-ui/card/index.css';
import '@byteflow-ui/badge/index.css';

export default async function DashboardPage() {
    const session = await getSession();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Bienvenido, {session?.email.split('@')[0]}</h2>
                    <p className="text-slate-500">Aquí tienes un resumen de lo que está pasando hoy.</p>
                </div>
                <Badge variant="primary">v1.0.0 Stable</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Usuarios Activos</CardTitle>
                        <CardDescription>Total de usuarios con sesión hoy</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold text-primary">1,284</div>
                        <p className="text-xs text-success mt-1 font-medium">+12% desde ayer</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Ventas Mensuales</CardTitle>
                        <CardDescription>Ingresos brutos este mes</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold text-slate-900">$45,200</div>
                        <p className="text-xs text-success mt-1 font-medium">+8% desde el mes anterior</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Estado del Sistema</CardTitle>
                        <CardDescription>Salud de la infraestructura</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-success animate-pulse"></div>
                            <div className="text-4xl font-bold text-slate-900">100%</div>
                        </div>
                        <p className="text-xs text-slate-500 mt-1 font-medium">Todos los servicios operativos</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Próximos pasos</CardTitle>
                    <CardDescription>Configuración de tu cuenta y equipo</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <p className="text-slate-600">
                            Has iniciado sesión exitosamente como <code className="bg-slate-100 px-1 rounded text-primary font-bold">{session?.role}</code>.
                            Este panel utiliza **Next.js 16**, **React 19** y componentes premium de **@byteflow-ui**.
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-slate-600">
                            <li>Configura tu perfil de usuario</li>
                            <li>Invita a colaboradores a tu equipo</li>
                            <li>Revisa la documentación en <code className="bg-slate-100 px-1 rounded">DOC-COMPONENT.md</code></li>
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
