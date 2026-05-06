import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,js,jsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f1f8ee',
          100: '#dcecd4',
          200: '#b9d8aa',
          300: '#8fbe78',
          400: '#69a352',
          500: '#4f8a3b',
          600: '#3d6e2d',
          700: '#325826',
          800: '#2a4720',
          900: '#1f3418',
        },
        earth: {
          50: '#faf7f2',
          100: '#efe7d8',
          200: '#dcc9a8',
          300: '#c2a472',
          400: '#a78551',
          500: '#8a6a3e',
          600: '#6e5331',
          700: '#564028',
          800: '#3f2f1e',
          900: '#2a1f14',
        },
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Inter', 'sans-serif'],
      },
      container: {
        center: true,
        padding: { DEFAULT: '1rem', md: '2rem' },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
