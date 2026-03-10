import { ThemeToggle } from '@/components/ThemeToggle';
import Link from 'next/link';
import { Button } from '@byteflow-ui/button';
import '@byteflow-ui/button/index.css';
import { LayoutDashboard, Rocket, Play } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/50 dark:bg-slate-950/50 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* ... */}
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
              B
            </div>
            <span className="font-bold text-2xl text-slate-900 dark:text-white tracking-tight">Byteflow</span>
          </div>

          <div className="flex items-center gap-6">
            <ThemeToggle />
            <Link href="/admin/login">
              <Button
                variant="primary"
                className="font-bold px-6 shadow-lg shadow-primary/20"
                startIcon={<LayoutDashboard size={18} />}
              >
                Entrar al Panel
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Decorative Background Elements ... */}
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -mr-64 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] -ml-48" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center space-y-8 py-20">
            {/* ... */}
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
              Domina tus datos con <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-500">Precisión Quirúrgica</span>
            </h1>

            <p className="text-lg lg:text-xl text-slate-500 dark:text-slate-400 max-w-2xl font-medium leading-relaxed">
              La plataforma definitiva diseñada para equipos de alto rendimiento que buscan automatizar, medir y escalar sus operaciones sin fricción.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <Link href="/admin/login">
                <Button
                  variant="primary"
                  className="h-14 px-10 text-lg font-black shadow-xl shadow-primary/30 hover:shadow-primary/40 active:scale-95 transition-all"
                  startIcon={<Rocket size={20} />}
                >
                  Comienza Gratis Ahora
                </Button>
              </Link>
              <Button
                variant="ghost"
                className="h-14 px-8 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
                startIcon={<Play size={20} />}
              >
                Ver demo interactiva
              </Button>
            </div>

            {/* Feature Cards Integration (Visual only) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full pt-24">
              <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-colors group">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Velocidad Extrema</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">Infraestructura optimizada para tiempos de respuesta ultra rápidos en tiempo real.</p>
              </div>

              <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-colors group">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04M12 20.944a11.955 11.955 0 01-8.618-3.04m17.236 0a11.955 11.955 0 01-8.618 3.04" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Seguridad Total</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">Encriptación de grado militar y cumplimiento SSL para la protección de tus activos.</p>
              </div>

              <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-colors group">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Insights IA</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">Reportes inteligentes potenciados por IA para tomar decisiones basadas en evidencia.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold">
              B
            </div>
            <span className="font-bold text-slate-900 dark:text-white tracking-tight">Byteflow</span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm">© 2026 Byteflow Solutions. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6 text-sm font-semibold text-slate-500 dark:text-slate-400">
            <Link href="/terms" className="hover:text-primary transition-colors">Términos</Link>
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacidad</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
