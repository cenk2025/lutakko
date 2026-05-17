import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
    './context/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: {
          DEFAULT: '#05070d',
          50: '#0b0f1a',
          100: '#0e1320',
          200: '#141a2a',
          300: '#1c2438',
          400: '#252f48',
        },
        harbor: {
          mist: '#cfe3ef',
          deep: '#0a1726',
          glow: '#22d3ee',
          amber: '#fbbf24',
          rose:  '#fb7185',
          lime:  '#a3e635',
          violet:'#a78bfa',
        },
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      backgroundImage: {
        'nordic-grid':
          'radial-gradient(circle at 30% 20%, rgba(34,211,238,0.18), transparent 45%), radial-gradient(circle at 70% 80%, rgba(163,230,53,0.12), transparent 50%)',
        'noise':
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.05  0 0 0 0 0.06  0 0 0 0 0.09  0 0 0 0.12 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      },
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 8s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'fade-in': 'fadeIn 1.2s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      transitionTimingFunction: {
        'harbor': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      boxShadow: {
        'glow-cyan': '0 0 60px rgba(34,211,238,0.35)',
        'glow-lime': '0 0 60px rgba(163,230,53,0.32)',
      },
    },
  },
  plugins: [],
};

export default config;
