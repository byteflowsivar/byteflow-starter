import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { DashboardClientLayout } from './_components/DashboardClientLayout';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getSession();

    if (!session) {
        redirect('/admin/login');
    }

    return (
        <DashboardClientLayout session={{ email: session.email, role: session.role }}>
            {children}
        </DashboardClientLayout>
    );
}
