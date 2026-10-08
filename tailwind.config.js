/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#f8fafc',
        surface: '#ffffff',
        border: '#e5e7eb',
        primary: {
          DEFAULT: '#2563eb', // blue-600
          hover: '#1d4ed8', // blue-700
        },
        text: {
          main: '#111827', // gray-900
          muted: '#4b5563', // gray-600
        }
      },
      boxShadow: {
        'soft': '0 10px 30px rgba(0, 0, 0, 0.08)',
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}