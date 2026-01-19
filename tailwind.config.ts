import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Tema profesional: verdes naturales y frescos
        primary: {
          50: '#f0fdf4',   // Muy claro
          100: '#d8f3dc',  // Verde muy claro (proporcionado)
          200: '#c8e6d0',  // Verde claro intermedio
          300: '#b7e4c7',  // Verde claro (proporcionado)
          400: '#81c995',  // Verde medio-claro
          500: '#52b788',  // Verde medio
          600: '#40916c',  // Verde principal (proporcionado)
          700: '#2d6a4f',  // Verde oscuro
          800: '#1b4332',  // Verde muy oscuro
          900: '#081c15',  // Verde casi negro
          950: '#040f0a',  // Verde negro
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        accent: {
          50: '#ecfdf5',   // Verde menta muy claro
          100: '#d1fae5',  // Verde menta claro
          200: '#a7f3d0',  // Verde menta
          300: '#6ee7b7',  // Verde menta medio
          400: '#34d399',  // Verde esmeralda claro
          500: '#10b981',  // Verde esmeralda
          600: '#059669',  // Verde esmeralda oscuro
          700: '#047857',  // Verde esmeralda muy oscuro
          800: '#065f46',  // Verde esmeralda casi negro
          900: '#064e3b',  // Verde esmeralda negro
          950: '#022c22',  // Verde esmeralda negro profundo
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
