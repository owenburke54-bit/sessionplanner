import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        pitch: {
          950: '#04080f',
          900: '#080c18',
          800: '#0d1224',
          700: '#111827',
          600: '#1a2340',
          500: '#252f48',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 24px rgba(59,130,246,0.18)',
        'glow-green': '0 0 24px rgba(16,185,129,0.18)',
        'glow-sm': '0 0 12px rgba(59,130,246,0.12)',
      },
      animation: {
        'slide-up': 'slideUp 0.28s cubic-bezier(0.32,0.72,0,1)',
        'fade-in': 'fadeIn 0.2s ease',
        'pulse-slow': 'pulse 2.5s cubic-bezier(0.4,0,0.6,1) infinite',
      },
      keyframes: {
        slideUp: {
          from: { transform: 'translateY(100%)' },
          to: { transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
