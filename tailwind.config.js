/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050505',
        surface: '#121212',
        charcoal: '#1A1A1A',
        border: '#262626',
        primary: {
          DEFAULT: '#8B5CF6', // Purple/Violet
          hover: '#7C3AED',
          glow: 'rgba(139, 92, 246, 0.2)',
        },
        text: {
          main: '#F3F4F6',
          muted: '#9CA3AF',
          dim: '#6B7280',
        }
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'neon': '0 0 20px rgba(139, 92, 246, 0.35)',
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