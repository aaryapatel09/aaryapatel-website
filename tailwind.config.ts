import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'f1-red': '#E10600',
        'f1-dark': '#15151E',
        'f1-gray': '#38383F',
        'f1-light': '#F4F4F4',
        'dashboard-bg': '#0A0A0F',
        'dashboard-text': '#00FF88',
      },
      fontFamily: {
        'racing': ['var(--font-racing)', 'monospace'],
        'mono': ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'race-line': 'raceLine 2s ease-in-out infinite',
        'telemetry': 'telemetry 1.5s ease-in-out infinite',
      },
      keyframes: {
        raceLine: {
          '0%, 100%': { transform: 'translateX(0) scaleX(1)' },
          '50%': { transform: 'translateX(10px) scaleX(1.1)' },
        },
        telemetry: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
export default config

