/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/booking-system/index.html",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F0F6FE',
          100: '#E0EDFE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0B63F6', // Primary Medical Blue
          600: '#0284C7',
          700: '#0369A1',
          800: '#075985',
          900: '#0C4A6E',
          navy: '#0F172A', // Dark Corporate Navy
        },
        medical: {
          blue: '#0B63F6',
          teal: '#14BBA6',
          navy: '#0F172A',
          slate: '#334155',
          gray: '#64748B',
          light: '#E2E8F0',
          canvas: '#F8FAFC',
          pale: '#F0F6FE',
          green: '#22C55E',
          orange: '#F59E0B',
          purple: '#A855F7',
          indigo: '#6366F1',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0B63F6 0%, #14BBA6 100%)',
        'hero-wash': 'linear-gradient(180deg, #EBF3FE 0%, #F8FAFC 100%)',
        'soft-medical': 'linear-gradient(180deg, #F0F6FE 0%, #FFFFFF 100%)',
        'cta-gradient': 'linear-gradient(135deg, #14BBA6 0%, #0B63F6 100%)',
        'cta-gradient-hover': 'linear-gradient(135deg, #0D9488 0%, #0284C7 100%)',
        'stats-band': 'linear-gradient(90deg, #EFF6FF 0%, #F0FDFA 100%)',
        'card-gradient': 'linear-gradient(180deg, #FFFFFF 0%, #F0F6FF 100%)',
        'dark-footer': '#0F172A',
      }
    },
  },
  plugins: [],
}