export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
            <div className="w-full max-w-sm mb-8 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-white font-bold text-2xl mb-4">
                    B
                </div>
                <h2 className="text-xl font-bold text-slate-900">Byteflow Panel</h2>
            </div>
            {children}
        </div>
    );
}
