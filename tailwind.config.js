/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#eef4ff',
          100: '#d9e6ff',
          200: '#b3ccff',
          300: '#82a8ff',
          400: '#5579ff',
          500: '#3351f5',
          600: '#1f36d4',
          700: '#1a2aa8',
          800: '#16247f',
          900: '#0c1733',
          950: '#060d1f',
        },
        accent: {
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Sora', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'radial-glow':
          'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(85,121,255,0.35), transparent 70%)',
        'grid-faint':
          'linear-gradient(rgba(85,121,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(85,121,255,0.06) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '44px 44px',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(85,121,255,0.25), 0 8px 40px -8px rgba(85,121,255,0.45)',
        'glow-sm': '0 0 24px -6px rgba(85,121,255,0.5)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.7)' },
          '60%': { opacity: '1', transform: 'scale(1.06)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 24px -6px rgba(85,121,255,0.5)' },
          '50%': { boxShadow: '0 0 40px -4px rgba(85,121,255,0.85)' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        burst: {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(6)', opacity: '0' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 1.2s ease forwards',
        'fade-out': 'fadeOut 0.9s ease forwards',
        'scale-in': 'scaleIn 1s cubic-bezier(0.22,1,0.36,1) forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.22,1,0.36,1) forwards',
        'slide-down': 'slideDown 0.5s ease forwards',
        'slide-left': 'slideLeft 0.5s ease forwards',
        'glow-pulse': 'glowPulse 2.6s ease-in-out infinite',
        floaty: 'floaty 5s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        'spin-slow': 'spinSlow 18s linear infinite',
        burst: 'burst 0.7s ease-out forwards',
      },
    },
  },
  plugins: [],
};
