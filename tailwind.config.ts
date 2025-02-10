import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f6ff',
          100: '#e0edff',
          200: '#c7ddff',
          300: '#a3c7ff',
          400: '#75a6ff',
          500: '#4d7fff',
          600: '#2d7ff9', // Main blue
          700: '#1a5fc7',
          800: '#1e4694',
          900: '#1e3a76',
        },
        background: {
          light: '#f8fafc',
          dark: '#0f172a',
        },
        card: {
          light: '#ffffff',
          dark: '#1e293b',
        },
        success: {
          light: '#10b981',
          dark: '#059669',
        },
        warning: {
          light: '#f43f5e',
          dark: '#e11d48',
        }
      },
      boxShadow: {
        'blue-sm': '0 2px 8px -1px rgba(45, 127, 249, 0.1)',
        'blue-md': '0 4px 12px -1px rgba(45, 127, 249, 0.15)',
        'blue-lg': '0 8px 16px -2px rgba(45, 127, 249, 0.2)',
      }
    },
  },
  plugins: [],
}

export default config;
