import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        sans: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      colors: {
        ink: {
          950: '#090909',
          900: '#0d0d0f',
          850: '#111115',
          800: '#17171c'
        },
        brand: {
          DEFAULT: '#6366f1',
          400: '#818cf8',
          500: '#6366f1',
          600: '#5458e8'
        },
        pulse: {
          DEFAULT: '#22d3ee',
          400: '#67e8f9'
        }
      },
      backgroundImage: {
        'hero-bloom':
          'radial-gradient(circle at 50% 40%, rgba(99,102,241,0.3), rgba(99,102,241,0.08) 32%, rgba(9,9,9,0) 62%)'
      },
      boxShadow: {
        soft: '0 10px 30px -15px rgba(15, 23, 42, 0.2)',
        glow: '0 0 0 1px rgba(129, 140, 248, 0.18), 0 24px 80px -40px rgba(99, 102, 241, 0.85)'
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-130%) skewX(-18deg)' },
          '100%': { transform: 'translateX(220%) skewX(-18deg)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        'dash-flow': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 40px' }
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.08)' }
        }
      },
      animation: {
        shimmer: 'shimmer 1.9s linear infinite',
        float: 'float 7s ease-in-out infinite',
        marquee: 'marquee 32s linear infinite',
        'dash-flow': 'dash-flow 2.4s linear infinite',
        'pulse-glow': 'pulseGlow 2.8s ease-in-out infinite'
      }
    }
  },
  plugins: []
} satisfies Config;
