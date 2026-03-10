import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: {
                    DEFAULT: "var(--bf-accent)",
                    dark: "#1e40af",
                    foreground: "#ffffff",
                },
                error: {
                    DEFAULT: "#ef4444",
                    hover: "#dc2626",
                },
                success: {
                    DEFAULT: "#10b981",
                    hover: "#059669",
                },
                warning: {
                    DEFAULT: "#f59e0b",
                    hover: "#d97706",
                },
            },
        },
    },
    plugins: [],
};

export default config;
