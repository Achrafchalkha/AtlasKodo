import type { Config } from "tailwindcss"

const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display, sans-serif)'],
        body: ['var(--font-body, sans-serif)'],
      },
      colors: {
        'dark': {
          '950': '#03050f',
          '900': '#080d1a',
          '800': '#0f1629',
          '700': '#1a2332',
        },
        'emerald': {
          'accent': '#00ff9d',
        },
        'indigo': {
          'accent': '#4f46e5',
        },
        'light': {
          '100': '#f5f5f5',
          '200': '#e5e5e5',
          '300': '#d4d4d4',
          '400': '#a3a3a3',
        },
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
      },
    },
  },
  plugins: [],
} satisfies Config

export default config
