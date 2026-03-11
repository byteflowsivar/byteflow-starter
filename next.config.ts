import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "standalone",
    /* Seguridad: Ocultar que la app corre sobre Next.js */
    poweredByHeader: false,
    /* Estabilidad: Ayuda a capturar errores de renderizado */
    reactStrictMode: true,
    /* Limpieza: Eliminar logs de consola en producción para no saturar el contenedor */
    compiler: {
        removeConsole: process.env.NODE_ENV === "production",
    },
};

export default nextConfig;
